"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.skz_prng = function (runtime) {
	this.runtime = runtime;
};

(function () {
	var pluginProto = cr.plugins_.skz_prng.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function (plugin) {
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function () { };

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function (type) {
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function () {
		this.seed = this.properties[0] ? this.properties[0] : new Date().getTime();
		this.prng = new ParkMillerPrng(this.seed);
	};

	instanceProto.saveToJSON = function () {
		return {
			"seed": this.seed,
			"prng": this.prng.saveToJSON()
		};
	};

	instanceProto.loadFromJSON = function (o) {
		this.seed = o["seed"];
		this.prng.loadFromJSON(o["prng"]);
	};

	function Cnds() { };
	pluginProto.cnds = new Cnds();

	function Acts() { };
	pluginProto.acts = new Acts();

	Acts.prototype.SetSeed = function (seed) {
		this.seed = seed;
		this.prng = new ParkMillerPrng(this.seed);
	};

	function Exps() { };
	pluginProto.exps = new Exps();

	Exps.prototype.Seed = function (ret) {
		ret.set_float(this.seed || 0);
	};

	Exps.prototype.Integer = function (ret) {
		ret.set_int(this.prng.integer());
	};

	Exps.prototype.Float = function (ret) {
		ret.set_float(this.prng.float());
	};

	var ParkMillerPrng = function (seed) {
		this.MAX_INT32 = 2147483647;
		this.MINSTD = 48271;

		if (!Number.isInteger(seed)) {
			throw new TypeError('Expected `seed` to be a `integer`');
		}

		this.current = seed % this.MAX_INT32;

		if (this.current <= 0) {
			this.current += (this.MAX_INT32 - 1);
		}
	}

	ParkMillerPrng.prototype.integer = function () {
		this.current *= this.MINSTD;
		this.current %= this.MAX_INT32;
		return this.current;
	}

	ParkMillerPrng.prototype.integerInRange = function (min, max) {
		return Math.round(this.floatInRange(min, max));
	}

	ParkMillerPrng.prototype.float = function () {
		return (this.integer() - 1) / (this.MAX_INT32 - 1);
	}

	ParkMillerPrng.prototype.floatInRange = function (min, max) {
		return min + ((max - min) * this.float());
	}

	ParkMillerPrng.prototype.boolean = function () {
		return this.integer() % 2 === 0;
	}

	ParkMillerPrng.prototype.saveToJSON = function () {
		return {
			"current": this.current
		};
	}

	ParkMillerPrng.prototype.loadFromJSON = function (o) {
		this.current = o["current"];
	}

}());

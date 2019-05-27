function GetPluginSettings() {
	return {
		"name": "PRNG",
		"id": "skz_prng",
		"version": "1.0",
		"description": "Random number generator with a seed",
		"author": "https://github.com/skz169 \
Construct 2 plugin reference implementation by Rex https://github.com/rexrainbow/C2Plugins \
JavaScript implementation of Park-Miller PRNG by Sindre Sorhus https://github.com/sindresorhus/park-miller",
		"help url": "http://www.scirra.com",
		"category": "Random",
		"type": "object",
		"rotatable": false,
		"flags": 0
	};
};

AddNumberParam("Seed", "Seed.", 0);
AddAction(0, 0, "Set seed", "Seed", "Set seed to <i>{0}</i>", "Set seed.", "SetSeed");

AddExpression(0, ef_return_number,
	"Get seed", "Seed", "Seed", "Get seed.");
AddExpression(1, ef_return_number,
	"Get random float value", "Float", "Float", "Get float value from random generator.");
AddExpression(2, ef_return_number,
	"Get random integer value", "Integer", "Integer", "Get integer value from random generator.");

ACESDone();

var property_list = [
	new cr.Property(ept_integer, "Seed", 0, "Initial seed value.")
];

function CreateIDEObjectType() {
	return new IDEObjectType();
}

function IDEObjectType() {
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

IDEObjectType.prototype.CreateInstance = function (instance) {
	return new IDEInstance(instance, this);
}

function IDEInstance(instance, type) {
	assert2(this instanceof arguments.callee, "Constructor called as a function");

	this.instance = instance;
	this.type = type;

	this.properties = {};
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

IDEInstance.prototype.OnCreate = function () {
}

IDEInstance.prototype.OnPropertyChanged = function (property_name) {
}

IDEInstance.prototype.Draw = function (renderer) {
}

IDEInstance.prototype.OnRendererReleased = function () {
}

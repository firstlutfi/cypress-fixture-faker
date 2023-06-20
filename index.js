const { faker } = require("@faker-js/faker");

function transform(jsonObj) {
	const regex = /\s(?![^}}]*({{|$))/g;

	if (typeof jsonObj === "object") {
		if (Array.isArray(jsonObj)) {
			return jsonObj.map(item => transform(item));
		} else {
			const generatedObj = {};
			for (let key in jsonObj) {
				if (typeof jsonObj[key] === "string") {
					generatedObj[key] = faker.helpers.fake(jsonObj[key].replaceAll(regex, ""));
				} else {
					generatedObj[key] = transform(jsonObj[key]);
				}
			}
			return generatedObj;
		}
	} else if (typeof jsonObj === "string" && jsonObj.startsWith("{{") && jsonObj.endsWith("}}")) {
		return faker.helpers.fake(jsonObj.replaceAll(regex, ""));
	} else {
		return jsonObj;
	}
}

module.exports = {
	cff: {
		transform: transform
	}
};
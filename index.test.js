const { cff } = require("./index");

describe("cff.transform", () => {
	test("should generate data from a JSON object", () => {
		const json = {
			email: "{{ internet.email }}",
			firstName: "{{ person.firstName }}",
			lastName: "{{ person.lastName }}",
			age: "{{ number.int({ \"min\": 10, \"max\": 100 }) }}"
		};

		const generatedData = cff.transform(json);

		// Assert that the generatedData is an object
		expect(typeof generatedData).toBe("object");

		// Assert that the generatedData contains the expected properties
		expect(generatedData).toHaveProperty("email");
		expect(generatedData).toHaveProperty("firstName");
		expect(generatedData).toHaveProperty("lastName");
		expect(generatedData).toHaveProperty("age");

		// Check if the generated email is a valid email format
		expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(generatedData.email)).toBe(true);

		// Assert that the 'age' property is greater than or equal to 10
		expect(parseInt(generatedData.age)).toBeGreaterThanOrEqual(10);

		// Assert that the 'age' property is less than or equal to 100
		expect(parseInt(generatedData.age)).toBeLessThanOrEqual(100);

	});
});
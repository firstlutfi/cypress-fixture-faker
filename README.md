# Cypress Fixture Faker

Use a [faker.js](https://github.com/faker-js/faker) method right from your Cypress fixture file.

## Background Context

When writing Cypress tests, the framework provide you with a fixture folder where you can store your data in a JSON format. However, since it is a JSON file, you can't put a JS function directly. The common way is to create a helper function that receives a JSON object and then transform any attributes that you want using a faker.js method.

This package aims to remove the hassle by enabling you to write a faker.js method as the value of your fixture file.
## Installation

Install with npm

```bash
  npm install @firstlutfi/cypress-fixture-faker
```

Or if you use Yarn

```bash
  yarn add @firstlutfi/cypress-fixture-faker
```
    
## Usage/Examples

See the following JSON example:
```json
{
    "normal_text": "This will be a normal text",
    "email": "{{ internet.email }}",
    "full_name": "Mr. {{ person.firstName }} {{ person.lastName }}",
    "with_depth": {
        "age": "{{ number.int({ \"min\": 10, \"max\": 100 }) }}"
    },
    "with_array": [
        "{{ color.human }}",
        "{{ color.human }}",
        "{{ color.human }}"
    ]
}
```
Use it in your Cypress spec file
```javascript
import example from '../fixtures/example.json';
import { cff } from '@firstlutfi/cypress-fixture-faker'

describe('Cypress Fixture Faker Test Suite', () => {
    it('Should be able to parse data from fixture', () => {
        const generatedData = cff.transform(example);
    });
});

```
If you try to log the output, the data would become:
```json
{
    "normal_text": "This will be a normal text",
    "email": "Dangelo_Shields96@gmail.com",
    "full_name": "Mr. Jaylon Kuhn",
    "with_depth": {
        "age": "90"
    },
    "with_array": [
        "olive",
        "pink",
        "gold"
    ]
}
```


## Notes

- In order to read the faker.js method, the value of the attributes needs to be a string. Therefore, currently, all returned values will also be a string.
- All values inside the double curly braces `{{ }}` have to be a valid faker.js method. You need to ensure that your test data do not require any literal double curly braces.
- If you need named parameters for the faker.js method, you need to escape the doublequotes using backslash (see the example above for the "age" attribute).
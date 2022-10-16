const { deterministicPartitionKey } = require('./dpk');
const crypto = require('crypto');

describe('deterministicPartitionKey', () => {
	it("Returns the literal '0' when given no input", () => {
		const trivialKey = deterministicPartitionKey();
		expect(trivialKey).toBe('0');
	});

	it('Returns the defined partitionKey if it is a string and its length does not exceed 256.', () => {
		const testEvent = {
			foo: 'bar',
			partitionKey: 'foobar',
		};
		const trivialKey = deterministicPartitionKey(testEvent);

		expect(trivialKey).toEqual(testEvent.partitionKey);
	});

	it("Stringifies and returns the hash of of the input object if it doesn't have a partitionKey defined.", () => {
		const testEvent = {
			foo: 'bar',
		};
		const ExpectedKey = crypto
			.createHash('sha3-512')
			.update(JSON.stringify(testEvent))
			.digest('hex');
		const trivialKey = deterministicPartitionKey(testEvent);

		expect(trivialKey).toEqual(ExpectedKey);
	});

	it('Stringifies and returns the the defined partitionKey if it is an object and if the length does not exceed 256.', () => {
		const testEvent = {
			foo: 'bar',
			partitionKey: {
				bar: 'bar',
			},
		};
		const ExpectedKey = JSON.stringify(testEvent.partitionKey);
		const trivialKey = deterministicPartitionKey(testEvent);

		expect(trivialKey).toEqual(ExpectedKey);
	});

	it('Stringifies and returns the hash of the defined partitionKey if it is an object and length exceeds 256.', () => {
		const testEvent = {
			foo: 'bar',
			partitionKey: {
				bar: 'barrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrr',
				foo: 'barrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrr',
				baz: 'barrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrrbarrrrrrrrrrrr',
			},
		};
		const ExpectedKey = crypto
			.createHash('sha3-512')
			.update(JSON.stringify(testEvent.partitionKey))
			.digest('hex');
		const trivialKey = deterministicPartitionKey(testEvent);

		expect(trivialKey).toEqual(ExpectedKey);
	});
});

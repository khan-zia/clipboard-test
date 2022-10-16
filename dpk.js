const crypto = require('crypto');

exports.deterministicPartitionKey = (event) => {
	const TRIVIAL_PARTITION_KEY = '0';
	const MAX_PARTITION_KEY_LENGTH = 256;
	const hash = crypto.createHash('sha3-512');

	// If no event, return a trivial key as "0"
	if (!event) {
		return TRIVIAL_PARTITION_KEY;
	}

	// Extract "partitionKey" from the event.
	let { partitionKey } = event;

	// If no partition key was defined then, stringify, hash and return Hex digest of the
	// entire event object.
	if (!partitionKey) {
		return hash.update(JSON.stringify(event)).digest('hex');
	}

	// If the defined partition key is an object then, stringify it.
	if (typeof partitionKey !== 'string') {
		partitionKey = JSON.stringify(partitionKey);
	}

	// If length of the defined partition key is greater than MAX_PARTITION_KEY_LENGTH then,
	// hash it and return Hex digest.
	if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
		return hash.update(partitionKey).digest('hex');
	}

	// Finally, return the defined partition key as is.
	return partitionKey;
};



function compressHash(hash, tableSize) {
	return hash % tableSize;
}

module.exports = function hashTable(tableSize) {
	const table = [];

	return {
		/**
		* Add a value to the hash table. Returns true if a collision occures.
		* Uses simple modulo division and chaining to resolve collisions
		*/
		add: function add(hash, value) {
			let collision = false;
			if(hash >= tableSize) {
				hash = compressHash(hash, tableSize);
			}
			if(table[hash] == undefined) {
				table[hash] = [];
			}
			else if(table[hash].length > 0) {
				collision = true;
			}

			table[hash].push(value);
			return collision;
		},
		size: function size() {
			return tableSize;
		}
	}

}

const words = require('an-array-of-english-words');
const shuffle = require('shuffle-array');
const polyHash = require('./polyhash');
const hashTable = require('./hashTable');

const tableSize = 5000000;
const wordsToHash = words.length; // can also be words.length
const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];

const hashTablesInfo = [];
const verboseLogging = false;

// randomize the order of the words array
shuffle(words);

// create an array of hashTableInfo objects to store a hash table, its prime number, and its collisions
primes.forEach(function(primeNumber){
	hashTablesInfo.push({
		table: hashTable(tableSize),
		primeNumber: primeNumber,
		collisions: 0
	});
});

if(verboseLogging === true) {
console.log(`Hashing a total of ${wordsToHash} words across ${hashTablesInfo.length} hashTables of size ${tableSize}, each using a different prime number as a constant for the hashing function\n`);
}
else {
	console.log(`Words to hash: ${wordsToHash} Table size: ${tableSize} Total tables: ${hashTablesInfo.length}`)
}

hashTablesInfo.forEach(function(tableInfo){
	for(let i = 0; i < wordsToHash; i++) {
		const word = words[i];
		const wordHash = polyHash(word, tableInfo.primeNumber);
		const isCollision = tableInfo.table.add(wordHash, word);
		if(isCollision === true) {
			tableInfo.collisions += 1;
		}
	}
	let collisionPercent = (tableInfo.collisions * 100) / wordsToHash;
	collisionPercent = Math.round(collisionPercent * 100) /100; // round to 2 decimal places

	if(verboseLogging === true) {
		console.log(`Hash table of size ${tableSize}, with prime number ${tableInfo.primeNumber}, contains ${tableInfo.collisions} collisions, and has a collision percentage of ${collisionPercent}%`);
	}
	else {
		console.log(`Prime number: ${tableInfo.primeNumber}   Collisions: ${tableInfo.collisions}   Collision Percent: ${collisionPercent}`);
	}
});



/**
* Polynomial hashing of a string, using horners method to evaluate the polynomial.
* Currently no protections against integer overflow (int greater than max safe int)
*/
module.exports = function polyhash(str, constant=31) {
	let hash = 0;

	for(let i = str.length-1; i >= 0; i--) {
		let charCode = str.charCodeAt(i);
		hash = (hash * constant) + charCode;
	}

	return hash;
}

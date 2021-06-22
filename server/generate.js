var faker = require('faker');
var crypto = require("crypto");

var database = { output: [] };
var firstYear = 1960;

for (var i = 0; i < 50; i++) {

	var tmp = [];

	for (var j = 0; j < 25; j++) {
		tmp.push({
			song_id: crypto.randomBytes(11).toString('hex'),
			song_name: faker.commerce.productName(),
			artist: faker.commerce.productName(),
			danceability: Math.random().toFixed(3),
			energy: Math.random().toFixed(3),
			key_center: getRandomInt(12).toString(),
			loudness: (-getRandomInt(20)).toString(),
			mode: (getRandomInt(2)).toString(),
			speechiness: Math.random().toFixed(3),
			acousticness: Math.random().toFixed(3),
			instrumentalness: Math.random().toFixed(3),
			liveness: Math.random().toFixed(3),
			valence: Math.random().toFixed(3),
			tempo: (getRandomInt(200) + 20).toString(),
			duration_ms: (1000 * (getRandomInt(300) + 100)).toString(),
			time_signature: (getRandomInt(7) + 1).toString(),
			popularity: getRandomInt(100).toString()
		});

	}

	var currentYear = (firstYear + i).toString();
	database.output.push({ year: currentYear, data: tmp });

}

console.log(JSON.stringify(database));

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
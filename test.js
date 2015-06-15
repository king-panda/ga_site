var json = require('./data.json');



for(var i in json) {
for(var j in json[i]) {

console.log(j + " -> " + json[i][j] + ", ");
}

}

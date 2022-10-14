const fs = require("fs/promises");

module.exports = function fetchEndpoints() {
    return fs.readFile('./endpoints.json', { encoding: 'utf8' })  
        .then((endpoints) => { 
            return JSON.parse(endpoints)
        })
};

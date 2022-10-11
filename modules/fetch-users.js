const db = require(`../db/connection`);

module.exports = function fetchUsers()  {
    return db.query(`SELECT * FROM users;`)
        .then(({ rows: users }) => { return users });
};
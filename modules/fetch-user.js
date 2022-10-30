const db = require(`../db/connection`);

module.exports = async (username) => {
    const checkDbUsernames = await db.query(`SELECT * FROM users`);
    const validUsernames = await checkDbUsernames.rows.map((user) => user.username)
    const response = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);
    const data = await response;
    const { rows: [userData] } = data;
    if(!validUsernames.includes(username)) {return Promise.reject({code: 404})}
    return userData;
}

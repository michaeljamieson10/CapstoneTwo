const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");

 class Avatar {
 static async findOne() {
    const avatarRes = await db.query(
        `SELECT * 
            FROM avatar 
            `);
        // `SELECT * 
        //     FROM avatar 
        //     WHERE username = $1`,
        // [username]);

    const avatar = avatarRes.rows[0];

    // if (!user) {
    //   const error = new Error(`There exists no user '${username}'`);
    //   error.status = 404;   // 404 NOT FOUND
    //   throw error;
    // }

    // const userJobsRes = await db.query(
    //     `SELECT j.id, j.title, j.company_handle, a.state 
    //        FROM applications AS a
    //          JOIN jobs AS j ON j.id = a.job_id
    //        WHERE a.username = $1`,
    //     [username]);

    // user.jobs = userJobsRes.rows;
    return avatar;
  }
}
module.exports = Avatar;
const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");
const changeBodyPart = require("../helpers/changeBodyPart") 
 class Avatar {
 static async getUserAvatar(username) {
    const avatarRes = await db.query(
      `SELECT * 
      FROM avatar 
      WHERE username = $1`,
      [username]);

    const avatar = avatarRes.rows[0];

    if (!avatar) {
      const error = new Error(`There exists no avatar '${username}'`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }

    return avatar;
  }
  static async update(username, data) {
   
    const bodyPart = changeBodyPart(data)

    let {query, values} = partialUpdate(
        "avatar",
        bodyPart,
        "username",
        username
    );

    const result = await db.query(query, values);


    if (!result) {
      let notFound = new Error(`There exists no avatar '${username}`);
      notFound.status = 404;
      throw notFound;
    }

    return result.rows[0];
  }
  // This is called when user is registered in order to provide a default avatar.

  static async create(username){  
  
    const result = await db.query(
    `INSERT INTO avatar
          (left_arm, right_arm, head, legs, torso, username)
        VALUES ('avatar/left_arm/la-default_blab4s',
    'avatar/right_arm/ra-default_dfesuh',
    'avatar/head/h-male_ejacic',
    'avatar/legs/l-default_qt5klj',
    'avatar/torso/torso-male_c1mw30',
     $1);`,
    [
      username
    ]);

}
// This is called when User is deleted and removes avatar also.
static async remove(username) {
  let result = await db.query(
          `DELETE FROM avatar 
            WHERE username = $1
            RETURNING username`,
          [username]);

if (result.rows.length === 0) {
  let notFound = new Error(`There exists no avatar for user '${username}'`);
  notFound.status = 404;
  throw notFound;
}
}

}
module.exports = Avatar;
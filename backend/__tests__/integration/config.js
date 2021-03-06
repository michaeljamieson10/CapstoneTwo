// npm packages
const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// app imports
const app = require("../../app");
const db = require("../../db");

// Database DDL (for tests)
const DB_TABLES = {
  users: `
  CREATE TABLE users(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    photo_url TEXT,
    is_admin BOOLEAN default FALSE
  )`,
  avatar:`
  CREATE TABLE avatar(
    left_arm text,
    right_arm text,
    head text, 
    legs text,
    torso text,
    username text REFERENCES users (username)
  )`
};

// global auth variable to store things for all the tests
const TEST_DATA = {};

async function beforeAllHook() {
  try {
    await db.query(DB_TABLES["users"]);
    await db.query(DB_TABLES["avatar"]);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Hooks to insert a user, company, and job, and to authenticate
 *  the user and the company for respective tokens that are stored
 *  in the input `testData` parameter.
 * @param {Object} TEST_DATA - build the TEST_DATA object
 */
async function beforeEachHook(TEST_DATA) {
  try {
    // login a user, get a token, store the user ID and token
    const hashedPassword = await bcrypt.hash("secret", 1);
    await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, is_admin)
                  VALUES ('test', $1, 'tester', 'mctest', 'test@rithmschool.com', true)`,
      [hashedPassword]
    );

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        username: "test",
        password: "secret",
      });
      console.log(response.body.token,'token')
    TEST_DATA.userToken = response.body._token || response.body.token;
    TEST_DATA.currentUsername = jwt.decode(TEST_DATA.userToken).username;
    console.log(TEST_DATA.currentUsername);
  } catch (error) {
    console.error(error);
  }
  console.log('before inserting into db avatar')
  const result = await db.query(
    `INSERT INTO avatar
    (left_arm, right_arm, head, legs, torso, username)
    VALUES ('avatar/left_arm/la-default_blab4s',
    'avatar/right_arm/ra-default_dfesuh',
    'avatar/head/h-male_ejacic',
    'avatar/legs/l-default_qt5klj',
    'avatar/torso/torso-male_c1mw30',
    $1) RETURNING *;`,
    [
      TEST_DATA.currentUsername
    ]);
  console.log('after inserting into db avatar')

  }
    
async function afterEachHook() {
  try {
    await db.query("DELETE FROM avatar");
    await db.query("DELETE FROM users");
  } catch (error) {
    console.error(error);
  }
}

async function afterAllHook() {
  try {
    await db.query("DROP TABLE IF EXISTS avatar");
    await db.query("DROP TABLE IF EXISTS users");
    await db.end();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  afterAllHook,
  afterEachHook,
  TEST_DATA,
  beforeAllHook,
  beforeEachHook,
};

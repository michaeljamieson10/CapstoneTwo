// npm packages
const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// app imports
const app = require("../../app");
const db = require("../../db");

// Database DDL (for tests)
const DB_TABLES = {
//   companies: `
//   CREATE TABLE companies(
//     handle TEXT PRIMARY KEY,
//     name TEXT UNIQUE NOT NULL,
//     num_employees INTEGER,
//     description TEXT,
//     logo_url TEXT
//   )`,
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
//   jobs: `
//   CREATE TABLE jobs(
//     id SERIAL PRIMARY KEY,
//     title TEXT,
//     salary FLOAT,
//     equity FLOAT CHECK(equity <= 1.0),
//     company_handle TEXT NOT NULL REFERENCES companies(handle) ON DELETE CASCADE
//   )`,
//   applications: `
//   CREATE TABLE applications(
//     username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
//     job_id INTEGER  REFERENCES jobs(id) ON DELETE CASCADE,
//     state TEXT,
//     created_at TIMESTAMP DEFAULT NOW(),
//     PRIMARY KEY(username, job_id)
//   )`
};

// global auth variable to store things for all the tests
const TEST_DATA = {};

async function beforeAllHook() {
  try {
  //   await db.query(DB_TABLES["companies"]);
    await db.query(DB_TABLES["users"]);
    await db.query(DB_TABLES["avatar"]);
  //   await db.query(DB_TABLES["jobs"]);
  //   await db.query(DB_TABLES["applications"]);
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
    // do the same for company "companies"
    // const result = await db.query(
      // "INSERT INTO companies (handle, name, num_employees) VALUES ($1, $2, $3) RETURNING *",
      // ["rithm", "rithm inc", 1000]
    // );

    // TEST_DATA.currentCompany = result.rows[0];

    // const newJob = await db.query(
      // "INSERT INTO jobs (title, salary, company_handle) VALUES ('Software Engineer', 100000, $1) RETURNING *",
      // [TEST_DATA.currentCompany.handle]
    // );
    // TEST_DATA.jobId = newJob.rows[0].id;

    // const newJobApp = await db.query(
      // "INSERT INTO applications (job_id, username) VALUES ($1, $2) RETURNING *",
      // [TEST_DATA.jobId, TEST_DATA.currentUsername]
    // );
    // TEST_DATA.jobApp = newJobApp.rows[0];
  // } catch (error) {
    // console.error(error);
  // }
// }

async function afterEachHook() {
  try {
    // await db.query("DELETE FROM applications");
    // await db.query("DELETE FROM jobs");
    await db.query("DELETE FROM avatar");
    await db.query("DELETE FROM users");
    // await db.query("DELETE FROM companies");
  } catch (error) {
    console.error(error);
  }
}

async function afterAllHook() {
  try {
    // await db.query("DROP TABLE IF EXISTS applications");
    // await db.query("DROP TABLE IF EXISTS jobs");
    await db.query("DROP TABLE IF EXISTS avatar");
    await db.query("DROP TABLE IF EXISTS users");
    // await db.query("DROP TABLE IF EXISTS companies");
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

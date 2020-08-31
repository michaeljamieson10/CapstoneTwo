// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

// model imports
const User = require("../../models/user");
const Avatar = require("../../models/avatar");

// 
// const changeBodyPart = require("../helpers/partialUpdate");
const {
  TEST_DATA,
  afterEachHook,
  afterAllHook,
  beforeAllHook,
  beforeEachHook
} = require("./config");


beforeAll(async function () {
  await beforeAllHook();
});


beforeEach(async function () {
  await beforeEachHook(TEST_DATA);
});


afterEach(async function () {
  await afterEachHook();
});


afterAll(async function () {
  await afterAllHook();
});


describe("GET /api/avatar/dress", async function () {
  test("Gets a list of 1 user", async function () {
    const response = await request(app)
        .get("/api/avatar/dress")
        .send({_token: `${TEST_DATA.userToken}`});
        console.log(response.body,'this is response body from avatar/dress')
    expect(response.body.success).toBe(true);
  });
});


describe("GET /users/:username", async function () {
  test("Gets a single a user", async function () {
    const response = await request(app)
        .get(`/api/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.body.user).toHaveProperty("username");
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user.username).toBe("test");
  });

  test("Responds with a 404 if it cannot find the user in question", async function () {
    const response = await request(app)
        .get(`/api/users/yaaasss`)
        .send({
          _token: `${TEST_DATA.userToken}`
        });
    expect(response.statusCode).toBe(404);
  });
});


describe("PATCH /users/:username", async () => {
  test("Updates a single a user's first_name with a selective update, need password to update", async function () {
    console.log(TEST_DATA.currentUsername);
    const response = await request(app)
        .patch(`/api/avatar/${TEST_DATA.currentUsername}`)
        .send({data: "avatar/left_arm/la-bent_efaup8", _token: `${TEST_DATA.userToken}`});
    console.log(response.body,'resposne body of patch')
    expect(response.body).toMatchObject({
        "left_arm": "avatar/left_arm/la-bent_efaup8",
        "right_arm": "avatar/right_arm/ra-default_dfesuh",
        "head": "avatar/head/h-male_ejacic",
        "legs": "avatar/legs/l-default_qt5klj",
        "torso": "avatar/torso/torso-male_c1mw30",
        "username": "test"
      });
    // expect(user.username).not.toBe(null);
  });

  // test("Updates a single a user's password", async function () {
    // const response = await request(app)
        // .patch(`/users/${TEST_DATA.currentUsername}`)
        // .send({_token: `${TEST_DATA.userToken}`, password: "foo12345"});
    // const user = response.body.user;
    // expect(user).toHaveProperty("username");
    // expect(user).not.toHaveProperty("password");
  // });

//   test("Prevents a bad user update, need password to update", async function () {
//     const response = await request(app)
//         .patch(`/api/users/${TEST_DATA.currentUsername}`)
//         .send({cactus: false, _token: `${TEST_DATA.userToken}`,"password": "secret"});
//     expect(response.statusCode).toBe(400);
//   });

//   test("Forbids a user from editing another user", async function () {
//     const response = await request(app)
//         .patch(`/api/users/notme`)
//         .send({password: "secret", _token: `${TEST_DATA.userToken}`});
//     expect(response.statusCode).toBe(401);
//   });

  // test("Responds with a 404 if it cannot find the user in question", async function () {
  //   // delete user first
  //   await request(app)
  //       .delete(`/api/users/${TEST_DATA.currentUsername}`)
  //       .send({_token: `${TEST_DATA.userToken}`});
  //   const response = await request(app)
  //       .patch(`/api/users/${TEST_DATA.currentUsername}`)
  //       .send({"password": "secret", _token: `${TEST_DATA.userToken}`});
  //   expect(response.statusCode).toBe(404);
  // });
});


describe("DELETE /users/:username", async function () {
  test("Deletes a single a user", async function () {
      // delete avatar first
    await request(app)
    .delete(`/api/avatar/${TEST_DATA.currentUsername}`)
    .send({_token: `${TEST_DATA.userToken}`});

    const response = await request(app)
        .delete(`/api/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.body).toEqual({message: "User deleted"});
  });

  test("Forbids a user from deleting another user", async function () {
    const response = await request(app)
        .delete(`/api/users/notme`)
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.statusCode).toBe(401);
  });

  test("Responds with a 404 if it cannot find the user in question", async function () {
    // delete avatar first
    await request(app)
        .delete(`/api/avatar/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});

    // delete user then
    await request(app)
        .delete(`/api/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});

    // check if 404 not exist
    const response = await request(app)
        .delete(`/api/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.statusCode).toBe(404);
  });
});

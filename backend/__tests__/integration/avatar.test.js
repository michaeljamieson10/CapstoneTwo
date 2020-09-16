// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

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


describe("PATCH /avatar/:username", async () => {
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
  });
});


describe("DELETE /avatar/:username", async function () {
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

  test("Forbids a user from deleting another user avatar", async function () {
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

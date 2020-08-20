/** Routes for users. */

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Avatar = require("../models/avatar");
const { ensureCorrectUser, adminRequired,authRequired } = require("../middleware/auth");
const { userNewSchema, userUpdateSchema } = require("../schemas");
const { validate } = require("jsonschema");
const createToken = require("../helpers/createToken");

/** PATCH /[handle] {userData} => {user: updatedUser} */

router.patch("/:username", ensureCorrectUser, async function(req, res, next) {
  try {
    // if ("username" in req.body || "is_admin" in req.body) {
    //   return next({ status: 400, message: "Not allowed" });
    // }
    // await User.authenticate({
    //   username: req.params.username,
    //   password: req.body.password
    // });
    // delete req.body.password;
    // const validation = validate(req.body, userUpdateSchema);
    // if (!validation.valid) {
      // return next({
        // status: 400,
        // message: validation.errors.map(e => e.stack)
      // });
    // }
    const user = await User.becomeAdmin(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  {message: "User deleted"}  */

router.delete("/:username", adminRequired, async function(req, res, next) {
  try {
    await Avatar.remove(req.params.username);
    await User.remove(req.params.username);
    return res.json({ message: "User deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
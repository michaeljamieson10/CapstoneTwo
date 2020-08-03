/** Routes for avatars. */

const express = require("express");
const router = express.Router();
const Avatar = require("../models/avatar");
const { ensureCorrectUser, authRequired } = require("../middleware/auth");
const { userNewSchema, userUpdateSchema } = require("../schemas");
const { validate } = require("jsonschema");
const createToken = require("../helpers/createToken");
const axios = require("axios");

const cloudinary = require('cloudinary').v2

// router.get("/:username", authRequired, async function(req, res, next) {
router.get("/dress", async function(req, res, next) {
    try {
        // req.body
    //   const user = await Avatar.findOne(req.params.username);
    //   const user = await Avatar.findOne();
        // const user = await axios.get('/')
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });

/** POST / {userdata}  => {token: token} */

// router.post("/:username/avatar/dress", async function(req, res, next) {
//     try {
//       delete req.body._token;
//     //   const validation = validate(req.body, userNewSchema);
  
//       if (!validation.valid) {
//         return next({
//           status: 400,
//           message: validation.errors.map(e => e.stack)
//         });
//       }
  
//     //   const newUser = await User.register(req.body);
//       const token = createToken(newUser);
//       return res.status(201).json({ avatar });
//     } catch (e) {
//       return next(e);
//     }
//   });
  module.exports = router;
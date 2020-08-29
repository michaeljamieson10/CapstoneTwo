/** Routes for avatars. */

const express = require("express");
const router = express.Router();
const Avatar = require("../models/avatar");
const { ensureCorrectUser, authRequired } = require("../middleware/auth");
const { userNewSchema, avatarUpdateSchema } = require("../schemas");
const { validate } = require("jsonschema");
const createToken = require("../helpers/createToken");
const axios = require("axios");

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'dreamsprawl',
    api_key: "887567873184119",
    api_secret:"ZNShJ5uwWHvs3LQAeAyXGd2GHNc"
})

// router.get("/:username", authRequired, async function(req, res, next) {
router.get("/dress", authRequired, async function(req, res, next) {
    try {
        cloudinary.api.resources(
            { type: 'upload', 
            prefix: 'avatar' }, 
        function(error, result) {
            return res.json({
                success: true,
                result
            })
        });
    } catch (err) {
      return next(err);
    }
  });
/** PATCH /[handle] {userData} => {user: updatedUser} */

// router.patch("/:username", ensureCorrectUser, async function(req, res, next) {
router.patch("/:username", ensureCorrectUser,  async function(req, res, next) {
    try {
        const username = req.params.username;
        const validation = validate(req.body, avatarUpdateSchema);
        if (!validation.valid) {
          return next({
            status: 400,
            message: validation.errors.map(e => e.stack)
          });
        }
        delete req.body._token;
        const bodyPart = req.body.data
        
        console.log(bodyPart,'this is data passed to the patch route')
        const avatar =  await Avatar.update(username,bodyPart)
        return res.json(avatar)
    //   if ("username" in req.body || "is_admin" in req.body) {
    //     return next({ status: 400, message: "Not allowed" });
    //   }
    //   await User.authenticate({
    //     username: req.params.username,
    //     password: req.body.password
    //   });
    //   delete req.body.password;
    //   const validation = validate(req.body, userUpdateSchema);
    //   if (!validation.valid) {
    //     return next({
    //       status: 400,
    //       message: validation.errors.map(e => e.stack)
    //     });

// }
// return res.json( avatar );
  
    //   const user = await User.update(req.params.username, req.body);
    //   return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });

// router.get("/:username", ensureCorrectUser, async function(req, res, next) {
router.get("/:username",  async function(req, res, next) {
    try {
        const username = req.params.username;
        const avatar = await Avatar.getUserAvatar(username);
        console.log(avatar);
    //   if ("username" in req.body || "is_admin" in req.body) {
    //     return next({ status: 400, message: "Not allowed" });
    //   }
    //   await User.authenticate({
    //     username: req.params.username,
    //     password: req.body.password
    //   });
    //   delete req.body.password;
    //   const validation = validate(req.body, userUpdateSchema);
    //   if (!validation.valid) {
    //     return next({
    //       status: 400,
    //       message: validation.errors.map(e => e.stack)
    //     });

    // return res.json( {username});
    return res.json( {avatar});
// }

    //   const user = await User.update(req.params.username, req.body);
    //   return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });



/** POST / {userdata}  => {token: token} */

router.post("/:username", async function(req, res, next) {
    console.log('this is the avatar post route to create avatar')
    try {
      delete req.body._token;
      const username = req.params.username;
      console.log(username)
    //   const validation = validate(req.body, userNewSchema);
  
    //   if (!validation.valid) {
    //     return next({
    //       status: 400,
    //       message: validation.errors.map(e => e.stack)
    //     });
    //   }
    await Avatar.create(username)
  
    //   const newUser = await User.register(req.body);
      return res.status(201).json({ username });
    //   return res.status(201).json({ avatar });
    } catch (e) {
      return next(e);
    }
  });
  /** DELETE /[handle]  =>  {message: "User deleted"}  */

router.delete("/:username", ensureCorrectUser, async function(req, res, next) {
  try {
    // Make sure to put this avatar into something else
    // maybe call on the front end twice during delete?
    await Avatar.remove(req.params.username);
    // await User.remove(req.params.username);
    return res.json({  message: "User deleted" });
  } catch (err) {
    return next(err);
  }
});
  module.exports = router;
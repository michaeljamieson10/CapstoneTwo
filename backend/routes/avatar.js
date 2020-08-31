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

/**
 * calls the api and gets all of the avatar body parts
 */

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
        
        const avatar =  await Avatar.update(username,bodyPart)
        return res.json(avatar)
    } catch (err) {
      return next(err);
    }
  });

/**
 * get user avatar from database
 * database just holds /folder/bodypart/position-of-bodypart
 * then the api cloudinary holds the images
 **/  

router.get("/:username",ensureCorrectUser,  async function(req, res, next) {
    try {
        const username = req.params.username;
        const avatar = await Avatar.getUserAvatar(username);
        console.log(avatar);

    return res.json( {avatar});

    } catch (err) {
      return next(err);
    }
  });



/** POST This is the avatar post route */

router.post("/:username", async function(req, res, next) {
    try {
      delete req.body._token;
      const username = req.params.username;
  
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
    await Avatar.remove(req.params.username);
    return res.json({  message: "User deleted" });
  } catch (err) {
    return next(err);
  }
});
  module.exports = router;
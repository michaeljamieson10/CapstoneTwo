/** Convenience middleware to handle common auth cases in routes. */


const jwt = require("jsonwebtoken");
const {SECRET} = require("../config");


/** Middleware to use when they must provide a valid token.
 *
 * Add username onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */

function authRequired(req, res, next) {
  // console.log(req.body, req.query)
  // console.log(req.body, 'inside reqbodyy')
  try {
    const tokenStr = req.body._token || req.query._token;
    let token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;
    return next();
  }

  catch (err) {
    let unauthorized = new Error("You must authenticate first.");
    unauthorized.status = 401;  // 401 Unauthorized
    return next(unauthorized);
  }
}


/** Middleware to use when they must provide a valid token that is an admin token.
 *
 * Add username onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */

function adminRequired(req, res, next) {
  try {
    console.log(req.body,'what is going on here', req.query, 'staying alive')
    const tokenStr = req.body._token || req.query._token;
    // console.log(req.query._token,' what what')
    
    let token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;

    if (token.is_admin) {
      return next();
    }

    // throw an error, so we catch it in our catch, below
    throw new Error();
  }

  catch (err) {
    const unauthorized = new Error("You must be an admin to access.");
    unauthorized.status = 401;

    return next(unauthorized);
  }
}


/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 * Add username onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */

function ensureCorrectUser(req, res, next) {
  try {
    console.log(req.body._token,'wow you got thhis far', req.query._token)
    const tokenStr = req.body._token || req.query._token;
    
    let token = jwt.verify(tokenStr, SECRET);
    console.log(token,'this username is so cool')
    // console.log(token.username,'wow you got thhis far')
    req.username = token.username;

    if (token.username === req.params.username) {
      return next();
    }

    // throw an error, so we catch it in our catch, below
    throw new Error();
  }

  catch (e) {
    const unauthorized = new Error("You are not authorized.");
    unauthorized.status = 401;

    return next(unauthorized);
  }
}


module.exports = {
  authRequired,
  adminRequired,
  ensureCorrectUser,
};

const { validateTokenForUser } = require("../services/auth");

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
     return next();
    }
    try {
      const userPayload = validateTokenForUser(tokenCookieValue);
     req.user = userPayload;
    } catch (err) {}
   return next();
  };
}

module.exports = { checkForAuthCookie };

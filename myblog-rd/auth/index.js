let jwt = require("jsonwebtoken");
//token密钥
let secretKey = "**aabbcc$$";
//token设置
module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: "3h" });
  },
  verifyToken: async (ctx, next) => {
    if (ctx.header.authorization) {
      let parts = ctx.header.authorization.split(" ");
      let bearer = parts[0];
      let token = parts[1];
      if (/^Bearer$/.test(bearer)) {
        try {
          jwt.verify(token, secretKey);
          await next();
        } catch (err) {
          ctx.status = 401;
          ctx.body = {
            state: "aaaa-fail",
          };
        }
      }
    }
  },
};

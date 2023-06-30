import jwt from "jsonwebtoken";

class Jwt {
  static secretKey = "CGTEWFVOBOEWLIHTEST";
  static createJWT(datos) {
    const timer = Date.now() + 60 * 1000 * 3;
    return jwt.sign({ datos, exp: timer }, Jwt.secretKey);
  }

  static verifyAuthJWT(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, Jwt.secretKey);
      if (Date.now() > payload.exp) {
        return res.error("Token expirado");
      }
      next();
    } catch (error) {
      return res.error("No existe token", error);
    }
  }
}

export default Jwt;

// como utilizar createJWT
// const token = JWT.createJWT({ userId: 1, username: "santiago" });
// ------------------------------------------------
// import JWT from "../helpers/Jwt.js";

// como utilizar verifyAuthJWT
// router.use(JWT.verifyAuthJWT);

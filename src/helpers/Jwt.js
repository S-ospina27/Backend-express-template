import jwt from "jsonwebtoken";
import "dotenv/config";
  class Jwt {
    static createJWT(datos) {
      const timer = Date.now() + 60 * 1000 * 3;
      return jwt.sign({ datos, exp: timer }, process.env.SECRET_KEY);
    }

    static verifyAuthJWT(req, res, next) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        if (Date.now() > payload.exp) {
          return res.error("Token expirado");
        }
       return next();
      } catch (error) {
        return res.error("No existe token", error);
      }
    }
  };

export default Jwt;

// como utilizar createJWT
// const token = JWT.createJWT({ userId: 1, username: "santiago" });
// ------------------------------------------------
// import JWT from "../helpers/Jwt.js";

// como utilizar verifyAuthJWT
// router.use(JWT.verifyAuthJWT);

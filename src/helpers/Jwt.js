import jwt from "jsonwebtoken";
import "dotenv/config";
class Jwt {
  static createJWT(datos) {
    return jwt.sign({ datos }, process.env.SECRET_KEY, { expiresIn:process.env.EXPIRE_TOKEN });
  }

  static verifyAuthJWT(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY);
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.error("Token expirado");
      }
      return res.error("No existe token o token inválido", error);
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

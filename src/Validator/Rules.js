import Joi from "joi";
class Rules {}

export default Rules;

/*ejemplo de como utilizar las Rules
 
  static VerifyUser(req, res, next) {
    try {
      const User = Joi.object({
        nombre: Joi.string().required(),
        edad: Joi.number().integer().min(18).required(),
        correo: Joi.string().email().required().max(5),
      });
      const { error } = User.validate(req.body);

      if (!error) {
        return next();
      }
      return res.error("Error Reglas ", error.details[0].message);
    } catch (e) {
      return res.error("Fallaron las Reglas", e);
    }
  }
  
 */

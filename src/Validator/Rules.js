import * as Yup from "yup";
// import Joi from "joi";

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
//utilizando yup 

// import * as Yup from "yup";

// static VerifyCreateTicket(req, res, next) {
//   try {
//     const Ticket = Yup.object().shape({
//       freation_date: Yup.string().required("La fecha es requerida"),
//       affair: Yup.string().required("El asunto es requerido"),
//       observation: Yup.string().required("La observación es requerida"),
//       state: Yup.string().required("El estado es requerido"),
//       priority: Yup.string()
//         .oneOf(["1", "2", "3"], "La prioridad es inválida")
//         .required("La prioridad es requerida"),
//       responsible: Yup.string().required("El responsable es requerido"),
//       cell_phone_number: Yup.string().required("El numero es requerido"),
//       state_notification: Yup.string().required(
//         "La notificación es requerida"
//       ),
//     });

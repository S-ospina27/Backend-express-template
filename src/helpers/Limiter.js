import { rateLimit } from "express-rate-limit";

class Limiter {
  constructor(config) {
    this.limiter = rateLimit(config);
  }

  limiterMiddlewareHttp() {
    return this.limiter;
  }
}

export default Limiter;


// forma de utilizar  en el router para una matriz de rutas o una ruta 

// import Limiter from "../helpers/Limiter.js";

// const limiter = new Limiter({
//     windowMs: 15 * 60 * 1000,
//     max: 2,
//     message: (req_, res) => {
//       res.json({
//           error:
//             "Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.",
//         });
//     },
//   });
  
//   router.use(limiter.limiterMiddlewareHttp());
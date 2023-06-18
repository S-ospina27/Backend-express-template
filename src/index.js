import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

//IMPORTAR RUTAS
import router from "./routes/index.routes.js";

const app = express();

// MIDDELWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// RUTAS
app.use("/api/", router);

// ROUTER INDEX
app.use("/", ( req, res )=>{
    res.json({message : "Welcome to index"});
});

// PUERTO DEL SERVIDOR LOCAL
app.set("port", process.env.PORT || 3000);

// INICIAR EL SERVIDOR http://
app.listen(app.get("port"), () => {
    console.log(`Server started at http://${process.env.URL_LOCAL}:${app.get("port")}`);
});
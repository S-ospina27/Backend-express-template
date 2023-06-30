import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
//funciones globales 
import {globalFuncMiddleware} from "./helpers/Response.js";

//IMPORTAR RUTAS
import router from "./routes/index.routes.js";

//configuracion para peticiones multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();

// MIDDELWARES
app.use(morgan("dev"));
app.use(upload.any());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(globalFuncMiddleware);

// RUTAS
app.use("/api/", router);

app.get("/archivos1/:archivo", (req, res)=>{
  const { archivo } = req.params
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirectory = path.dirname(currentFilePath);
  res.sendFile(path.join(currentDirectory, `./storage/${archivo}`));
});

// ROUTER INDEX


app.use("/", (req, res) => {
  res.json({ message: "Welcome to index" });
});


// PUERTO DEL SERVIDOR LOCAL
app.set("port", process.env.PORT || 3000);

// INICIAR EL SERVIDOR http://
app.listen(app.get("port"), () => {
  console.log(
    `Server started at http://${process.env.URL_LOCAL}:${app.get("port")}`
  );
});

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Obtén la ruta del archivo actual
const currentFilePath = fileURLToPath(import.meta.url);

// Obtén el directorio actual
const currentDirectory = path.dirname(currentFilePath);

// Carpeta de destino predeterminada
const defaultFolder = "../src/controller";

// Obtén el nombre de la clase del argumento de línea de comandos
const className = process.argv[2];

// Verifica si se proporcionó un nombre de clase
if (!className) {
  console.log("Por favor, proporciona un nombre de clase");
  process.exit(1);
}

// Ruta absoluta del archivo a crear
const filePath = path.join(currentDirectory, defaultFolder, `${className}.js`);

// Contenido de la clase
const classContent = `
//import nombre from "../model/nombre.js";
class ${className} {
 
  constructor() {
    //this.nombre = new nombre();
  }

  get${className} = async (req, res) => {
    try {

      return res.status(200).json({ message: "success"});
    } catch (error) {
      console.log(error);
       return res.json({message:"Ocurrrio un error " + error});
    }
  };

  post${className} = async (req, res) => {
    try {
      const data = await this.model.MethodModel(req.body);
      if (data) {
        return res.status(200).json({ message: "success", data });
      }
      return res.status(200).json({ message: "error" });
    } catch (error) {
      console.log(error);
       return res.json({message:"Ocurrrio un error " + error});
    }
  };

  put${className} = async (req, res) => {
    try {
      const data = await this.model.MethodModel(req.body);
      if (data) {
        return res.status(200).json({ message: "success", data });
      }
      return res.status(200).json({ message: "error" });
    } catch (error) {
      console.log(error);
       return res.json({message:"Ocurrrio un error " + error});
    }
  };

  delete${className} = async (req, res) => {
    try {

      const data = await this.model.MethodModel(req.body);
      if (data) {
        return res.status(200).json({ message: "success", data });
      }
      return res.status(200).json({ message: "error" });  
    } catch (error) {
      console.log(error);
       return res.json({message:"Ocurrrio un error " + error});
    }
  };

}


export default ${className};
`;

// Crea el archivo con el contenido de la clase
fs.writeFileSync(filePath, classContent);

console.log(`Se ha creado la clase ${className}.js en ${filePath}`);

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Obtén la ruta del archivo actual
const currentFilePath = fileURLToPath(import.meta.url);

// Obtén el directorio actual
const currentDirectory = path.dirname(currentFilePath);

// Carpeta de destino predeterminada
const defaultFolder = "../src/model";

// Obtén el nombre de la clase del argumento de línea de comandos
const className = process.argv[2];

// Verifica si se proporcionó un nombre de clase
if (!className) {
  console.log("Por favor, proporciona un nombre de clase");
  process.exit(1);
}

// Ruta absoluta del directorio (carpeta) a crear
const folderPath = path.join(currentDirectory, defaultFolder);

// Verifica si la carpeta existe, y si no, créala
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Ruta absoluta del archivo a crear
const filePath = path.join(folderPath, `${className}.js`);

// Contenido de la clase
const classContent = `
import { connection } from "../configs/mySQL.js";

class ${className} {
  
    get${className} = async () => {
        const [query] = await connection.query("");
        return query;
    };

    post${className} = async () => {
        try {
          const [query] = await connection.execute("CALL nombre (?,?,?,?)", [
           
          ]);
    
          return query;
        } catch (error) {
          console.log(error);
        }
    };

    put${className} = async () => {
        try {
          const [query] = await connection.execute("CALL nombre (?,?,?,?)", [
           
          ]);
    
          return query;
        } catch (error) {
          console.log(error);
        }
    };

    delete${className} = async () => {
        const [query] = await connection.query("");
        return query;
    };

}

export default ${className};
`;

// Crea el archivo con el contenido de la clase
fs.writeFileSync(filePath, classContent);

console.log(`Se ha creado la clase ${className}.js en ${filePath}`);

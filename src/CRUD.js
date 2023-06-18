import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

class CRUD {
  createController = (entity) => {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(currentFilePath);
    const defaultFolder = "../src/controller";
    const fullClasName = `${entity}Controller`;
    const filePath = path.join(
      currentDirectory,
      defaultFolder,
      `${fullClasName}.js`
    );
    const controllerClass = `
    import ${entity}Model from "../model/${entity}Model.js";
    class ${fullClasName} {
     
      constructor() {
        this.${entity}Model = new ${entity}Model();
      }
    
      get${fullClasName} = async (req, res) => {
        try {
          const data = await this.${entity}Model.get${entity}Model();
          return res.status(200).json({ message: "success", data });
    
        } catch (error) {
          console.log(error);
           return res.json({message:"Ocurrrio un error " + error});
        }
      };
    
      post${fullClasName} = async (req, res) => {
        try {
          const data = await this.${entity}Model.post${entity}Model(req.body);
          if (data) {
            return res.status(200).json({ message: "success", data });
          }
          return res.status(200).json({ message: "error" });
        } catch (error) {
          console.log(error);
           return res.json({message:"Ocurrrio un error " + error});
        }
      };
    
      put${fullClasName} = async (req, res) => {
        try {
          const data = await this.${entity}Model.put${entity}Model(req.body);
          if (data) {
            return res.status(200).json({ message: "success", data });
          }
          return res.status(200).json({ message: "error" });
        } catch (error) {
          console.log(error);
           return res.json({message:"Ocurrrio un error " + error});
        }
      };
    
      delete${fullClasName} = async (req, res) => {
        try {
          const data = await this.${entity}Model.delete${entity}Model(req.body);
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
    
    export default ${fullClasName};
    `;

    fs.writeFileSync(filePath, controllerClass);
  };

  createModel = (entity) => {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(currentFilePath);
    const defaultFolder = "../src/Model";
    const fullClasName = `${entity}Model`;
    const filePath = path.join(
      currentDirectory,
      defaultFolder,
      `${fullClasName}.js`
    );

    const ModelClass = `
import { connection } from "../configs/mySQL.js";

class ${fullClasName} {
  
    get${fullClasName} = async () => {
        const [query] = await connection.query("");
        return query;
    };

    post${fullClasName} = async (${entity}) => {
        try {
          const [query] = await connection.execute("CALL nombre (?,?,?,?)", [
           
          ]);
    
          return query;
        } catch (error) {
          console.log(error);
        }
    };

    put${fullClasName} = async (${entity}) => {
        try {
          const [query] = await connection.execute("CALL nombre (?,?,?,?)", [
           
          ]);
    
          return query;
        } catch (error) {
          console.log(error);
        }
    };

    delete${fullClasName} = async () => {
        const [query] = await connection.query("");
        return query;
    };

}


export default ${fullClasName};
`;
    fs.writeFileSync(filePath, ModelClass);
  };
}

const className = process.argv[2];

if (!className) {
  console.log("Por favor, proporciona un nombre de clase");
  process.exit(1);
}
const Crud = new CRUD();
let remove_hyphens_spaces = className.replace(/[_-]/g, "");
let words = remove_hyphens_spaces.split(" ");
let wordscapitalized = words.map(
  (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
);
let namePascalCase = wordscapitalized.join("");
Crud.createController(namePascalCase);
Crud.createModel(namePascalCase);
console.log(`Se ha creado el crud completo de ${namePascalCase}`);
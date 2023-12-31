import mySQL from "mysql2/promise";
import "dotenv/config";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

class CrudDatabase {
  createClass(datos, nameClass) {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(currentFilePath);
    const defaultFolder = "../src/class";
    const fullClasName = `${nameClass}`;
    const filePath = path.join(
      currentDirectory,
      defaultFolder,
      `${fullClasName}.js`
    );

    const methods = datos.map(
      (attribute) => `
    set${attribute.charAt(0).toUpperCase() + attribute.slice(1)}(${attribute}){
        this.${attribute} = ${attribute};
    }

    get${attribute.charAt(0).toUpperCase() + attribute.slice(1)}(){
        return this.${attribute};
    }
`
    );

    const fullclasMinuscula =
      fullClasName.charAt(0).toLowerCase() + fullClasName.slice(1);
    const FormFieldsMethod = `
  static FormFields(datos){
    const ${fullclasMinuscula} = new ${fullClasName}();
    ${datos
      .map(
        (attribute) =>
          `${fullclasMinuscula}.set${
            attribute.charAt(0).toUpperCase() + attribute.slice(1)
          }([null,undefined].includes(datos.${attribute}) ? null : datos.${attribute});`
      )
      .join("\n")}
    return ${fullclasMinuscula};
  }
`;

    const CreationClass = `
     class ${fullClasName}{
        constructor(){
          ${datos.map((attribute) => `this.${attribute} = null;`).join("\n")}
        }
      
        ${methods.join("\n")}
        ${FormFieldsMethod}
       
     }
     export default ${fullClasName}
     `;

    fs.writeFileSync(filePath, CreationClass);
  }
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

  getFullNameTable = () => {
    const connections = [
      {
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        database: process.env.DATABASE_NAME,
        password: process.env.PASSWORD_DB,
      },
      // {
      //   host: process.env.HOST_DB_PRISMA,
      //   user: process.env.USER_DB_PRISMA,
      //   database: process.env.DATABASE_NAME_PRISMA,
      //   password: process.env.PASSWORD_DB_PRISMA,
      // },
    ];

    connections.forEach(async (conn) => {
      const connection = mySQL.createPool(conn);
      const sql = `SHOW FULL TABLES WHERE Table_Type = 'BASE TABLE'`;

      try {
        const [query] = await connection.query(sql);

        for (const entity of query) {
          const table = `Tables_in_${conn.database}`;
          let remove_hyphens_spaces = entity[table].replace(/[_-]/g, "");
          let words = remove_hyphens_spaces.split(" ");
          let wordscapitalized = words.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          );
          let namePascalCase = wordscapitalized.join("");
          const describeSql = `DESCRIBE ${entity[table]}`;
          const [tableDescription] = await connection.query(describeSql);
          const columnNames = tableDescription.map((column) => column.Field);
          this.createClass(columnNames, namePascalCase);
          this.createController(namePascalCase);
          this.createModel(namePascalCase);
        }
        console.log(`Se ha creado la clase crud completo`);
      } catch (error) {
        console.log(error);
      }

      console.log("\n");
    });
  };
}

const crudDatabase = new CrudDatabase();
crudDatabase.getFullNameTable();

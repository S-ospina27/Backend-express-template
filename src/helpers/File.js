import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import ExcelJS from "exceljs";

class File {

  static upFile(files) {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(currentFilePath);
    const storageFolder = path.join(currentDirectory, "../storage/");
    if (!fs.existsSync(storageFolder)) {
      fs.mkdirSync(storageFolder);
    }
    const name = Date.now() + files[0].originalname.replace(/ /g, "_");
    const filePath = path.join(storageFolder, name);
    fs.writeFileSync(filePath, files[0].buffer);
    return name;
  }

  static ExportExcel(datos,headers,name) {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(currentFilePath);
    const storageFolder = path.join(currentDirectory, "../storage/");
    const fullname =`${name}.xlsx`;
    const filePath = path.join(storageFolder,fullname);
    const workbook = new ExcelJS.Workbook();
    // Crear una nueva hoja de cálculo
    const worksheet = workbook.addWorksheet("Hoja1");
 
    // Agregar los encabezados a la hoja de cálculo
    worksheet.addRow(headers);

    // Aplicar formato a la fila de encabezados
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF0000" },
    };
    // Agregar los datos a la hoja de cálculo
    datos.forEach((fila) => {
      worksheet.addRow(fila);
    });

    workbook.xlsx.writeFile(filePath);
    return  `http://127.0.0.1:8000/archivos1/${fullname}`;
  }
}

export default File;

// como utilizar metodo upFile 
// import File from "../helpers/File.js";
// File.upFile(req.files);
// ----------------------------------
// como utilizar metodo ExportExcel
// const resultados = [
//   { nombre: "Santiago", apellido: "Ospina" },
//   { nombre: "Daniel", apellido: "Josefin" },
// ];
// const datos = resultados.map((resultado) => Object.values(resultado));

  // pide como parametros los datos,los cabezeros y el nombre del archivo
// const link= File.ExportExcel(datos,["Nombre", "Apellido"],"emily");
//   res.json("../storage/" +link);
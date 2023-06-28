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

  static ExportExcel(datos, headers, name) {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(currentFilePath);
    const storageFolder = path.join(currentDirectory, "../storage/");
    if (!fs.existsSync(storageFolder)) {
      fs.mkdirSync(storageFolder);
    }
    const fullname = `${name}.xlsx`;
    const filePath = path.join(storageFolder, fullname);
    const workbook = new ExcelJS.Workbook();
    // Crear una nueva hoja de cálculo
    const worksheet = workbook.addWorksheet("Hoja1");
    // Agregar los encabezados a la hoja de cálculo
    const headerRow = worksheet.addRow(headers);

    worksheet.autoFilter =
      worksheet.getColumn(1).letter +
      "1:" +
      worksheet.getColumn(headers.length).letter +
      (datos.length + 1);

    // Agregar los datos a la hoja de cálculo
    datos.forEach((fila, index) => {
      const row = worksheet.addRow(fila);
      let fillColor = index % 2 === 0 ? "FFFF0000" : "FF00FF00";
      for (let column = 1; column < headers.length + 1; column++) {
        const cell = row.getCell(column);
        const cellHeaders = headerRow.getCell(column);
        cellHeaders.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFAEBD7" },
        };
        cellHeaders.font={
          color:{argb:"FFFFFF"},
          bold:true
        };
        
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: fillColor },
        };
      }
    });

    workbook.xlsx.writeFile(filePath);
    return `http://127.0.0.1:8000/archivos1/${fullname}`;
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

//recordar para siempre

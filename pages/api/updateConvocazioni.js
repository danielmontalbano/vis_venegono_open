// pages/api/updateConvocazioni.js
import path from "path";
import exceljs from "exceljs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { numero, convocato } = req.body;
    const filePath = path.join(process.cwd(), "/public/convocazioni.xlsx");

    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && row.values[1] === numero) {
        row.getCell(3).value = convocato;
      }
    });

    await workbook.xlsx.writeFile(filePath);
    res.status(200).json({ message: "Convocazione aggiornata con successo" });
  } else {
    res.status(405).json({ message: "Metodo non consentito" });
  }
}

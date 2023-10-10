import path from "path";
import exceljs from "exceljs";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "/public/convocazioni.xlsx");

  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1);
  const convocazioni = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const [numero, nome, convocato] = row.values;
      convocazioni.push({ numero, nome, convocato });
    }
  });

  res.status(200).json(convocazioni);
}

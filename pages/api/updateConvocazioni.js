import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Load the credentials from your JSON key file
      const auth = new google.auth.GoogleAuth({
        keyFile: "./public/visvenegono-dccb93bdd404.json", // Replace with the path to your JSON key file
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      // Create a client with the loaded credentials
      const client = await auth.getClient();

      // Specify the ID of your Google Sheet
      const spreadsheetId = "1Pc4EUkT3lhLUb02cBjm-DkP38M5m1D158uSy5JaP3Mw"; // Replace with your Google Sheet ID

      // Specify the range where you want to update data
      const range = "Foglio1!A1:C100"; // Replace with your desired range

      // Extract values from the request body
      const { numero, convocato } = req.body;

      // Load the existing data from the Google Sheet
      const sheets = google.sheets("v4");
      const response = await sheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId,
        range,
      });

      if (response.status !== 200) {
        return res.status(response.status).end();
      }

      const values = response.data.values;

      if (!values) {
        return res.status(404).json({ error: "No data found" });
      }

      // Find the row with the matching 'numero' and update 'convocato'
      const updatedValues = values.map((row) => {
        if (row[0] === numero) {
          return [numero, row[1], convocato];
        }
        return row;
      });

      // Write the updated data back to the Google Sheet
      const updateResponse = await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: { values: updatedValues },
      });

      if (updateResponse.status === 200) {
        res.status(200).json({ message: "Convocazione updated successfully" });
      } else {
        res.status(updateResponse.status).end();
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error updating convocazione" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

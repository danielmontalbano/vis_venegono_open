import { google } from 'googleapis';
const sheets = google.sheets('v4');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Load the credentials from your JSON key file
      const auth = new google.auth.GoogleAuth({
        keyFile: "./public/visvenegono-dccb93bdd404.json", // Replace with the path to your JSON key file
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });

      // Create a client with the loaded credentials
      const client = await auth.getClient();

      // Specify the ID of your Google Sheet
      const spreadsheetId = '1Pc4EUkT3lhLUb02cBjm-DkP38M5m1D158uSy5JaP3Mw'; // Replace with your Google Sheet ID

      // Specify the range from which you want to read data (e.g., A1:C100 for the first 100 rows)
      const range = 'Foglio1!A1:C100'; // Replace with your desired range

      // Read data from the Google Sheet
      const response = await sheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId,
        range,
      });

      const values = response.data.values;

      if (!values) {
        return res.status(404).json({ error: 'No data found' });
      }

      // Convert the data to the desired format
      const convocazioni = values.slice(1).map((row) => ({
        numero: row[0],
        nome: row[1],
        convocato: row[2],
      }));

      res.status(200).json(convocazioni);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error fetching convocazioni' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

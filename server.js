import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
import data from "./data.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send('Cicci testar!');
});

app.get('/nominations', (req, res) => {
  res.json(data);
});

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showMon = req.query.won
  let nominationsFromYear = data.filter((item) => 
    item.year_award === +year)

    
    if (showMon) {
      nominationsFromYear = nominationsFromYear.filter((item) => item.win)
    }

    res.json(nominationsFromYear)


  })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {

    const teamEntered = req.query.q

    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("91c5436ea5b5576335cf2cc35e27b5c23f03f1b8972220f1d0113f9bd7ce03bb");

    const params = {
        q: teamEntered,
        location: "austin, texas, united states"
    };

    const callback = function (response) {
        res.send(response['sports_results']);
    };

    search.json(params, callback);

  });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
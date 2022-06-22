const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get("/api", (req, res) => {
    const teamEntered = req.query.q
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("private key here");
    const params = {
        q: teamEntered,
        location: "austin, texas, united states"
    };
    const callback = function (response) {
        res.send(response['sports_results']);
    };
    search.json(params, callback);
          const { MongoClient } = require('mongodb');
          async function main() {
            const uri = process.env.MONGODB_URI;
            const client = new MongoClient(uri);
            var months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            now = new Date(),
            timeAndDateSearched = now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + 
                now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + 
                now.getSeconds() + ' ' + "GMT";
            try {
              await client.connect();
              await newDocument(client, {
                teamEntered: teamEntered,
                timeAndDateSearched: timeAndDateSearched
              })
            } catch (e) {
              console.error(e);
            } finally {
              await client.close();
            }
          }
          main().catch(console.error);        
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

async function newDocument(client, newUser) {
  const result = await client.db("ttDB").collection("TeamsSearched").insertOne(newUser);
}

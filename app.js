const express = require("express");
const app = express();
const path = require("path");

app.use(express.static('./public'));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    res.sendFile(filePath);
});

//Avvio del server
app.listen(3000, () => {
    console.log('Server attivo sulla porta http://localhost:3000.');
});
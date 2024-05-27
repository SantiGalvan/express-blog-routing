const express = require("express");
const app = express();
const path = require("path");
const postsRouter = require("./routers/posts.js");

app.use(express.static('./public'));

// Routes
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    res.sendFile(filePath);
});

app.use('/posts', postsRouter);

//Avvio del server
app.listen(3000, () => {
    console.log('Server attivo sulla porta http://localhost:3000.');
});
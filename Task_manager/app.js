const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const routesHandler = require('./routes/tasks');
const authentication = require('./routes/authenticate');
const db = require('./controllers/database');

const initialization = async () => {
    try {
        await db.connect();
        console.log("DB connected.");
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (err) {
        console.error(err);
    }
};

initialization();

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'starter/public')));
app.use('/', routesHandler);


// Error handling middleware
app.use((req, res) => {
    const url = req.url;
    console.log("error" + url);
    res.status(404).send('Route does not exist');
});

module.exports = app;


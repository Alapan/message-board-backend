const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Port number can be saved in an uncommitted .env file too,
// done here this way so that someone else can run the code
app.listen(8000, () => {
    console.log(`Listening on port 8000...`);
});

// Allow calling from localhost:3000
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const channelData = [
    {
        id: 1,
        messages: []
    },
    {
        id: 2,
        messages: []
    },
    {
        id: 3,
        messages: []
    }
];

app.get('/messages/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).send(channelData[id-1]);
});

app.post('/:id', (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    channelData[id-1].messages.push(message);
    
    res.status(200).send(channelData[id-1]);
});

// Error handler
app.use((err, req, res, next) => {
    const {statusCode, message} = err;
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
});

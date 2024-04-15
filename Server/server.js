const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const userAccessRoutes = require('../Server/src/routes/userAccessLevelRoutes');

const app = express();
const PORT = 3300;

app.use(express.json());
app.use(bodyParser.json());

app.use(
    cors({
        origin: 'http://localhost:4200',
        credentials: true
    })
);

app.use('/users', userRoutes);
app.use('/useraccess', userAccessRoutes);

app.listen(PORT, () => {
    console.log(`Server is now listening at port ${PORT}`);
});


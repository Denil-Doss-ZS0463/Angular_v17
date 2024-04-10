const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');

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

app.listen(PORT, () => {
    console.log(`Server is now listening at port ${PORT}`);
});


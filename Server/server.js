const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");

const PORT = 3300;

app.use(express.json());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is now listening at port ${PORT}`);
});
app.use(
    cors({
        origin: "http://localhost:4200",
    })
);
// app.post('/users/login', (req, res) => {
//     const { email, password } = req.body;
//     User.getByEmailAndPassword(email, password, (err, user) => {
//         if (err || !user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//         res.json(user);
//     });
// });

app.use("/users", userRoutes);

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import factsRoutes from './routes/facts.js';
import userRoutes from './routes/users.js';


const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/facts', factsRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello There!');
});

const PORT1 = (process.env.PORT || 5000);
const CONNECTION_URL = 'mongodb+srv://jawadbisharat:Nazareth2020@cluster0.wq5f9.mongodb.net/FactsDatabase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT1, () => console.log(`SERVER running on port: ${PORT1}`)))
    .catch((err) => console.log(err));


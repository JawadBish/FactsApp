import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import factsRoutes from './routes/facts.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/facts', factsRoutes);

//mongoDB cloud\atlas
//const CONNECTION_URL = 'mongodb+srv://jawadbisharat:Nazareth2020@cluster0.wq5f9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.log(`SERVER running on port: ${PORT}`)))
    .catch((err) => console.log(err));

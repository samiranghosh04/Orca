import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import router from "./routes/index.js"
import morgan from 'morgan';

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"))
app.use(express.json()); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data into the req body
app.use(cookieParser());

//Routes
app.use("/api", router);

const server = app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close((err) => {
        console.log('Http server closed.');
        process.exit(err ? 1 : 0);
    });
});



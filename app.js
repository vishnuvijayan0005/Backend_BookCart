import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import sellerRouter from './routes/sellerUser.js';
import usersRouter from './routes/users.js';
import adminRouter from './routes/admin.js';
import dotenv from 'dotenv'
// Fix __dirname in ES Modules
import cors from 'cors'
import { fileURLToPath } from 'url';
import dbConnect from './config/db.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const allowedOrigins = [
  "http://localhost:3000",
"https://frontend-book-cart-cvig.vercel.app/"
];

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://frontend-book-cart-cvig.vercel.app/",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(cors())

app.use('/seller', sellerRouter);
app.use('/', usersRouter);
app.use('/admin', adminRouter);
dbConnect();
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;

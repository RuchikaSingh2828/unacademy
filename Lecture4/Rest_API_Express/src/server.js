import express from 'express';
import morgan from 'morgan'; // tis a middleware
import { json, urlencoded } from 'body-parser';

// ! Homework - see how u can use body parser like this as this is throwing error

const app = express();

// establishing that my express appwill be using the morgan middleware
app.use(morgan('dev'));

//defining routes
app.get('/', (req, res) => {
  console.log(req.body);
  res.send({ message: ' from  Get OK' });
});
app.post('/', (req, res) => {
  console.log(req.body);
  res.send({ message: ' from Post OK' });
});

export const start = () => {
  app.listen(3000, () => {
    console.log('Server started at 3000');
  });
};

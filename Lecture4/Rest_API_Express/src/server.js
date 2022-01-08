import express from 'express';
import morgan from 'morgan'; // tis a middleware
import { json, urlencoded } from 'body-parser';

// ! Homework - see how u can use body parser like this as this is throwing error

const app = express();
const router = express.Router();

// establishing that my express appwill be using the morgan middleware
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

const customerLogger = (req, res, next) => {
  console.log(req.body);
  console.log('Logger Incoming ...');
  next();
};

app.use('/api/v1', router);

//defining routes
app.get('/', (req, res) => {
  console.log(req.body);
  res.send({ message: ' from  Get OK' });
});

app.post('/', [customerLogger], (req, res) => {
  console.log(req.body);
  res.send({ message: ' from Post OK' });
});

// router.get('/post', (req, res) => {
//   res.send({ message: 'OK GET ROUTER' });
// });

// router.post('/post', (req, res) => {
//   res.send({ message: 'OK POST ROUTER' });
// });

router
  .route('/post')
  .get((req, res) => {
    res.send({ message: 'Router GET OK' });
  })
  .post((req, res) => {
    res.send({ message: 'Router POST OK' });
  });

router
  .route('/post/:id/:log')
  .put((req, res) => {
    console.log(req.params);
    // to take out the id u need to access the url
    res.send({ message: 'Router PUT OK' });
  })
  .patch((req, res) => {
    res.send({ message: 'Router PATCH OK' });
  })
  .delete((req, res) => {
    res.send({ message: 'Delete DELETE OK' });
  });

export const start = () => {
  app.listen(3000, () => {
    console.log('Server started at 3000');
  });
};

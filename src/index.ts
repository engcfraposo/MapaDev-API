import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();

mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log(
    'Server started on port 3333! Use insomnia or front-end to acess data',
  );
});

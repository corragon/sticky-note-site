import express from 'express';
import bodyParser from 'body-parser';
import nanoid from 'nanoid';
import { store } from './inMemoryStore';
// import { store } from './dynamoStore';

// store.set('1234', { blah: 'yay' });

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/newToken', (req, res) => {
  res.status(200).send({ data: nanoid(8) });
});

app.get('/tokens/:token', async (req, res) => {
  const { since } = req.query;
  const { token } = req.params;

  console.log("Getting token with ", token);
  store.get(token, since)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({});
    })
});

app.post('/tokens/:token', (req, res) => {
  const { data } = req.body;
  const { token } = req.params;

  if (!data) {
    res.status(404).send("Error: Requires data on body!");
  }
  console.log(`POST on /tokens/${token}`, data);
  store.set(token, data);
  res.status(200).send();
});

app.listen(3000, () => console.log('Express app listening on port 3000'));
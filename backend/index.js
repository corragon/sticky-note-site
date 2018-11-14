import express from 'express';
import bodyParser from 'body-parser';
import nanoid from 'nanoid';
import { store } from './inMemoryStore';

store.set('1234', { blah: 'yay' });

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/newToken', (req, res) => {
  res.status(200);
  res.send({ data: nanoid(8) });
});

app.get('/tokens/:token', (req, res) => {
  let { since } = req.query;
  console.log("Getting token with ", req.params.token);
  res.status(200);
  res.send(store.get(req.params.token, since));
});

app.post('/tokens/:token', (req, res) => {
  if (!req.body.data) {
    res.status(404);
    res.send("Error: Requires data on body!");
  }
  console.log(`POST on /tokens/${req.params.token}`, req.body.data);
  store.set(req.params.token, req.body.data);
  res.status(200);
  res.send();
});

app.listen(3000, () => console.log('Express app listening on port 3000'));
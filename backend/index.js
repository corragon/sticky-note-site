import express from 'express';
import bodyParser from 'body-parser';
import { generateToken } from './utils';
import { store } from './inMemoryStore';

store.set('1234', { blah: 'yay' });

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/newToken', (req, res) => {
  res.status(200);
  res.send({
    data: generateToken(8)
  });
});

app.get('/tokens/:token', (req, res) => {
  console.log("Getting token with ", req.params.token);
  res.status(200);
  res.send(store.get(req.params.token));
});

app.get('/tokens/:token/changed', (req, res) => {
  console.log(`Checking if data on token ${req.params.token} has changed`);
  res.status(501);
  res.send();
});

app.post('/tokens/:token', (req, res) => {
  if (!req.body.data) {
    res.status(404);
    res.send("Error: Requires data on body!");
  }
  console.log(req.params.token, req.body.data);
  store.set(req.params.token, req.body.data);
  res.status(200);
  res.send();
});

app.listen(3000, () => console.log('Express app listening on port 3000'));
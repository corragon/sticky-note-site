const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

store = (function(){
  tokens = {};
  return {
    get: function(token) {
      return tokens[token] || [];
    },
    set: function(token, data) {
      tokens[token] = data;
    }
  }
})();
store.set('1234', {blah:'yay'});

app.get('/:token', (req, res) => {
  console.log("Getting token with ", req.params.token);
  res.status(200);
  res.send(store.get(req.params.token));
});

app.post('/:token', (req, res) => {
  if (!req.body.data) {
    res.status(404);
    res.send("Error: Requires data on body!");
  }
  console.log(req.params.token, req.body.data);
  res.send(store.set(req.params.token, req.body.data));
});

app.listen(3000, () => console.log('Express app listening on port 3000'));
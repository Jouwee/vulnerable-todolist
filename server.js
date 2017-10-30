var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

app.use('/', express.static('public'));
app.use('/', express.static('node_modules'));

let inMemoryTasks = [{"text": "Tarefa"}, {"text": "Eu vim do web service"}];

app.get('/tasks', (req, res) => {
  res.json(inMemoryTasks);
})

app.post('/tasks', (req, res) => {
  console.log(req.body)
})

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);


app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});

console.log('todo list RESTful API server started on: ' + port);

app.use('/', express.static('public'));
app.use('/', express.static('node_modules'));

let inMemoryTasks = [];

app.get('/tasks', (req, res) => {
  res.json(inMemoryTasks);
})

app.post('/tasks', (req, res, wat) => {
  inMemoryTasks.push(req.body);
  res.json(inMemoryTasks);
})

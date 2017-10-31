var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var showdown  = require('showdown');

app.listen(port);


app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});

console.log('todo list RESTful API server started on: ' + port);

app.use('/', express.static('public'));
app.use('/', express.static('node_modules'));

let inMemoryTasks = [];
let nextTaskId = 0;

let pushTask = (task) => {
  task.id = nextTaskId++;
  inMemoryTasks.push(task);
}

let getTasks = () => {
  return inMemoryTasks.map((task) => {
    converter = new showdown.converter(),
    task.text = converter.makeHtml(task.text);
    return task;
  })
}

pushTask({text: 'Criar minha primeira tarefa'});
pushTask({text: 'Apagar estas tarefas'});

app.get('/tasks', (req, res) => {
  res.json(getTasks());
})

app.post('/tasks', (req, res) => {
  pushTask(req.body);
  res.json(getTasks());
})

app.get('/tasks/:taskId/delete', (req, res) => {
  console.log('delete ', req.params.taskId);
  for (let i = 0; i < inMemoryTasks.length; i++) {
    if (inMemoryTasks[i].id == req.params.taskId) {
      inMemoryTasks.splice(i, 1);
      break;
    }
  }
  res.json(getTasks());
})

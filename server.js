var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var marked = require('marked');
var ms = require('ms');
var hms = require('humanize-ms');
var st = require('st');

marked.setOptions({
  sanitize: true
});

app.listen(port);


app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});

console.log('todo list RESTful API server started on: ' + port);

app.use('/', express.static('page'));
//app.use('/', express.static('node_modules'));
app.use(st({path: './public', url: '/public'}));
app.use(st({path: './node_modules', url: '/modules'}));
//app.use(st({path: './page', url: '/'}));

let inMemoryTasks = [];
let nextTaskId = 0;

let pushTask = (task) => {
  task.id = nextTaskId++;

  var remindToken = ' in ';
  let text = task.text;
  var reminder = text.toString().indexOf(remindToken);
  if (reminder > 0) {
    var time = text.slice(reminder + remindToken.length);
    time = time.replace(/\n$/, '');

    var period = hms(time);

    // remove it
    text = text.slice(0, reminder);
    if (typeof period != 'undefined') {
      task.reminder = ms(period);
    }
    task.text = text;
  }

  inMemoryTasks.push(task);
}

let getTasks = () => {
  return inMemoryTasks.map((task) => {
    return {
      id: task.id,
      text: marked(task.text),
      reminder: task.reminder
    }
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

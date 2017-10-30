let Controller = function() {

  this.loadTasks = () => {
    $.get("/tasks", (res) => {
      this.updateTaskList(res);
    });
  }

  this.updateTaskList = (tasks) => {
    $('#taskList').html('');
    tasks.forEach(task => {
      $('#taskList').append('<li class="list-group-item">' + task.text + '</li>');
    })
  }

  this.addTarefa = () => {
    $.ajax({
      type: "POST",
      url: '/tasks',
      data: {text: 'nova tarefa'},
      success: res => {
        this.loadTasks();
      },
      dataType: 'text'
    });
  }

}

let controller = new Controller();

$().ready(() => {
  controller.loadTasks();
});

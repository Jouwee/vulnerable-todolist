let Controller = function() {

  $('#newTask').keypress((e) => {
    if (e.which == 13) {
      this.addTarefa();
    }
  });

  this.loadTasks = () => {
    $.get("/tasks", (res) => {
      this.updateTaskList(res);
    });
  }

  this.updateTaskList = (tasks) => {
    $('#taskList').html('');
    tasks.forEach(task => {
      let button = `<button class="btn btn-info" type="button" onclick="controller.apagaTarefa(${task.id})"><span class="glyphicon glyphicon-check"></span></button>`;
      let lembrete = '';
      if (task.reminder != undefined) {
        lembrete = '<small class="note">Com lembrete</small>';
      }
      $('#taskList').append(`<li class="list-group-item task">${button} <div class="body">${task.text}</div>${lembrete}</li>`);
    })
  }

  this.apagaTarefa = (taskId) => {
    $.get(`/tasks/${taskId}/delete`, (res) => {
      this.updateTaskList(res);
    });
  }

  this.addTarefa = () => {
    let valueInput = document.querySelector('#newTask');
    let value = valueInput.value;
    if (value.trim().length == 0) {
      return;
    }
    $.ajax({
      type: "POST",
      url: '/tasks',
      data: {text: value},
      success: res => {
        this.updateTaskList(res);
        valueInput.value = "";
      },
    })
  }

}

let controller = new Controller();

$().ready(() => {
  controller.loadTasks();
});

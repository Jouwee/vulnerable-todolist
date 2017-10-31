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

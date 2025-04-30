// Load tasks from localStorage
window.onload = function() {
    loadTasks();
  };
  
  function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
  
    if (taskText === '') return;
  
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
  
    li.innerHTML = `<span>${taskText}</span>
                    <button class="delete-btn" onclick="deleteTask(this)">✖</button>`;
  
    taskList.appendChild(li);
    saveTasks();
    input.value = '';
  }
  
  function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
  }
  
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li span').forEach(task => {
      tasks.push(task.textContent);
    });
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    const taskList = document.getElementById('taskList');
  
    tasks.forEach(taskText => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${taskText}</span>
                      <button class="delete-btn" onclick="deleteTask(this)">✖</button>`;
      taskList.appendChild(li);
    });
  }
  
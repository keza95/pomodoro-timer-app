// FUNCTION: Timer Countdown

var timerDisplay = document.getElementById('timer');
var toggleButton = document.getElementById('toggle');
var resetButton = document.getElementById('reset');
var timer;
var minutes = 25;
var seconds = 0;
var isRunning = false;

function updateTimer() {
    var minutesStr = minutes.toString().padStart(2, '0');
    var secondsStr = seconds.toString().padStart(2, '0');
    timerDisplay.textContent = minutesStr + ':' + secondsStr;
}

function startTimer() {
  if (isRunning) return;

  timer = setInterval(function () {
    if (minutes === 0 && seconds === 0) {
      clearInterval(timer);
      if (timerDisplay === document.getElementById('timer')) {
        // Swap to 5-minute timer
        minutes = 5;
        seconds = 0;
        timerDisplay = document.getElementById('interval');
        updateTimer();
      } else {
        // Swap to 25-minute timer
        minutes = 25;
        seconds = 0;
        timerDisplay = document.getElementById('timer');
        updateTimer();
      }
      toggleButton.textContent = 'Start';
      toggleButton.className = 'btn btn-success';
      isRunning = false;
    } else if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimer();
  }, 1000);
  toggleButton.textContent = 'Pause';
  toggleButton.className = 'btn btn-primary';
  isRunning = true;
}



function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer);
    toggleButton.textContent = 'Start';
    toggleButton.className = 'btn btn-success';
    isRunning = false;
}

function toggleTimer() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function resetTimer() {
  clearInterval(timer);
  minutes = 25;
  seconds = 0;
  timerDisplay = document.getElementById('timer');
  updateTimer();
  toggleButton.textContent = 'Start';
  toggleButton.className = 'btn btn-success';
  isRunning = false;
}

toggleButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

// FUNCTION: Toggle Fullscreen

var fullscreenIcon = document.querySelector('.fullscreen-icon');

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// FUNCTION: Toggle Menu Popover

fullscreenIcon.addEventListener('click', toggleFullScreen);
      $(document).ready(function () {
        var hamburgerIcon = $('#hamburger-icon');
        var popupMenu = $('#popup-menu');

        // Function to open the menu
        function openMenu() {
          popupMenu.show();
        }

        // Function to close the menu
        function closeMenu() {
          popupMenu.hide();
        }

        // Attach event handler to hamburger icon
        hamburgerIcon.click(openMenu);
        popupMenu.click(function (event) {
          if (event.target === popupMenu[0]) {
            closeMenu();
          }
        });
      });

      // IMPORTANT: Task Management System

      // Add Task
      const taskInput = document.getElementById('task-input');
      const taskList = document.getElementById('task-list');
      const currentTask = document.getElementById('current-task');

      document.getElementById('add-task').addEventListener('click', function () {
        addTask();
      });

      taskInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          addTask();
        }
      });

      function addTask() {
        const taskName = taskInput.value;
        if (taskName.trim() !== '') {
          const listItem = createTaskListItem(taskName);
          taskList.appendChild(listItem);
          taskInput.value = '';
        }
      }

      function createTaskListItem(taskName) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        const taskText = document.createElement('span');
        taskText.textContent = taskName;
        listItem.appendChild(taskText);

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-sm', 'btn-outline-primary', 'mr-1');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', function () {
          const newTaskName = prompt('Enter new task name', taskName);
          if (newTaskName && newTaskName.trim() !== '') {
            taskText.textContent = newTaskName;
          }
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener('click', function () {
          listItem.remove();
          updateCurrentTask('Pomodoro Timer');
        });

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
      }

      // Update Current Task
      function updateCurrentTask(taskName) {
        currentTask.textContent = taskName;
      }

      // Add Task
document.getElementById('add-task').addEventListener('click', function () {
  const taskName = taskInput.value;
  if (taskName.trim() !== '') {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    const taskNameContainer = document.createElement('div');
    taskNameContainer.classList.add('task-name');
    taskNameContainer.textContent = taskName;
    listItem.appendChild(taskNameContainer);

    const taskButtonsContainer = document.createElement('div');
    taskButtonsContainer.classList.add('task-buttons');

    const editButton = document.createElement('i');
    editButton.classList.add('fas', 'fa-edit', 'edit-task');
    taskButtonsContainer.appendChild(editButton);

    const deleteButton = document.createElement('i');
    deleteButton.classList.add('fas', 'fa-trash', 'delete-task');
    taskButtonsContainer.appendChild(deleteButton);

    listItem.appendChild(taskButtonsContainer);

    taskList.appendChild(listItem);
    taskInput.value = '';
  }
});





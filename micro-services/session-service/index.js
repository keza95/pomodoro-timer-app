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
            return;
        }
        if (seconds === 0) {
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

fullscreenIcon.addEventListener('click', toggleFullScreen);

// FUNCTION: Toggle Menu Popover
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


const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps-list");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function updateTimeDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  const milliseconds = currentTime % 1000;
  const seconds = Math.floor((currentTime / 1000) % 60);
  const minutes = Math.floor((currentTime / (1000 * 60)) % 60);
  const hours = Math.floor((currentTime / (1000 * 60 * 60)) % 24);

  const timeParts = timeDisplay.querySelectorAll(".time-part");
  timeParts[0].textContent = String(hours).padStart(2, "0");
  timeParts[1].textContent = String(minutes).padStart(2, "0");
  timeParts[2].textContent = String(seconds).padStart(2, "0");
  timeParts[3].textContent = String(milliseconds).padStart(3, "0");
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimeDisplay, 10);
  isRunning = true;
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  lapButton.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;

  // Reset the time display to "00h 00m 00s 000"
  const timeParts = timeDisplay.querySelectorAll(".time-part");
  timeParts[0].textContent = "00"; // Hours
  timeParts[1].textContent = "00"; // Minutes
  timeParts[2].textContent = "00"; // Seconds
  timeParts[3].textContent = "000"; // Milliseconds

  // Clear laps and disable buttons
  lapsList.innerHTML = "";
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
}

function recordLap() {
  const lapTime = document.createElement("li");
  lapTime.textContent = `Lap: ${timeDisplay.textContent}`;
  lapsList.appendChild(lapTime);
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-button");
  const stopButton = document.getElementById("stop-button");
  const dateInput = document.getElementById("date-input");
  const timeInput = document.getElementById("time-input");
  const countdown = document.getElementById("countdown");
  const daysSpan = document.getElementById("days");
  const hoursSpan = document.getElementById("hours");
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");
  const messageDiv = document.getElementById("message");

  let countdownInterval;

  function startCountdown() {
    const dateValue = dateInput.value.split("/");
    const timeValue = timeInput.value.split(":");

    if (dateValue.length !== 3 || timeValue.length !== 2) {
      alert(
        "Please enter a valid date in DD/MM/YYYY format and time in HH:MM format."
      );
      return;
    }

    const targetDate = new Date(
      `${dateValue[2]}-${dateValue[1]}-${dateValue[0]}T${timeValue[0]}:${timeValue[1]}:00`
    );

    if (isNaN(targetDate.getTime())) {
      alert("Please enter a valid date and time.");
      return;
    }

    if (targetDate <= new Date()) {
      messageDiv.classList.remove("hidden");
      alert("Does't fill past time");
      messageDiv.textContent = "The entered time is in the past.";
      stopCountdown();
      return;
    } else {
      messageDiv.classList.add("hidden");
    }

    countdown.classList.remove("hidden");

    countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        alert("Game Over");
        messageDiv.classList.remove("hidden");
        messageDiv.textContent = "The countdown has ended!";
        stopCountdown();
        stopButton.classList.add("hidden");
        startButton.classList.remove("hidden");

        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysSpan.textContent = days < 10 ? "0" + days : days;
      hoursSpan.textContent = hours < 10 ? "0" + hours : hours;
      minutesSpan.textContent = minutes < 10 ? "0" + minutes : minutes;
      secondsSpan.textContent = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);
  }

  function stopCountdown() {
    clearInterval(countdownInterval);
    daysSpan.textContent = "00";
    hoursSpan.textContent = "00";
    minutesSpan.textContent = "00";
    secondsSpan.textContent = "00";
  }

  startButton.addEventListener("click", () => {
    startCountdown();
    startButton.classList.add("hidden");
    stopButton.classList.remove("hidden");
  });

  stopButton.addEventListener("click", () => {
    stopCountdown();
    alert("Game Over");
    stopButton.classList.add("hidden");
    startButton.classList.remove("hidden");
    countdown.classList.add("hidden");
  });
});

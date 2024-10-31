let startTime;
let endTime;
let timerInterval;

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const elapsedTimeDisplay = document.getElementById("elapsedTime");
const exportButton = document.getElementById("exportButton");

startButton.addEventListener("click", () => {
  startTime = new Date();
  startButton.disabled = true;
  stopButton.disabled = false;
  exportButton.disabled = true; // Disable export until stopped

  // Start a timer to show elapsed time in real-time
  timerInterval = setInterval(() => {
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    elapsedTimeDisplay.innerText = `Elapsed Time: ${elapsed} seconds`;
  }, 1000);
});

stopButton.addEventListener("click", () => {
  endTime = new Date();
  clearInterval(timerInterval);

  const elapsedTime = Math.floor((endTime - startTime) / 1000);
  elapsedTimeDisplay.innerText = `Elapsed Time: ${elapsedTime} seconds`;

  startButton.disabled = false;
  stopButton.disabled = true;
  exportButton.disabled = false; // Enable export button
});

exportButton.addEventListener("click", () => {
  // Prepare data for export
  const data = [
    ["Start Time", "End Time", "Elapsed Time (seconds)"],
    [
      startTime.toLocaleString(),
      endTime.toLocaleString(),
      Math.floor((endTime - startTime) / 1000),
    ],
  ];

  // Create a new workbook and a worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Timer Data");

  // Export the workbook to an Excel file
  XLSX.writeFile(workbook, "timer_data.xlsx");
});

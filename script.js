let array = [];

function generateArray(size = 30) {
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 300) + 20);
  }
  renderBars(array);
}

function renderBars(arr) {
  const container = document.getElementById("bars-container");
  container.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${arr[i]}px`;
    bar.style.width = "20px";
    bar.style.margin = "2px";
    bar.style.display = "inline-block";
    bar.style.backgroundColor = "skyblue";
    container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 🟢 Bubble Sort
async function bubbleSort() {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const bars = document.getElementsByClassName("bar");
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";
      await sleep(100);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderBars(array);
      }

      bars[j].style.backgroundColor = "skyblue";
      bars[j + 1].style.backgroundColor = "skyblue";
    }
    document.getElementsByClassName("bar")[n - i - 1].style.backgroundColor = "lightgreen";
  }
  document.getElementsByClassName("bar")[0].style.backgroundColor = "lightgreen";
}

// 🟢 Merge Sort Recursive
async function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(arr, start, mid);
  await mergeSort(arr, mid + 1, end);
  await merge(arr, start, mid, end);
  renderBars(arr);
}

async function merge(arr, start, mid, end) {
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    const bars = document.getElementsByClassName("bar");
    bars[k].style.backgroundColor = "orange";
    await sleep(100);
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
    renderBars(arr);
  }

  while (i < left.length) {
    arr[k++] = left[i++];
    renderBars(arr);
    await sleep(50);
  }

  while (j < right.length) {
    arr[k++] = right[j++];
    renderBars(arr);
    await sleep(50);
  }

  for (let x = start; x <= end; x++) {
    document.getElementsByClassName("bar")[x].style.backgroundColor = "lightgreen";
  }
}

// 🟢 UI Buttons
async function startBubbleSort() {
  disableUI();
  await bubbleSort();
  enableUI();
}

async function startMergeSort() {
  disableUI();
  await mergeSort(array);
  enableUI();
}

// 🛑 Optional UI control functions
function disableUI() {
  document.getElementById("bubble-btn").disabled = true;
  document.getElementById("merge-btn").disabled = true;
  document.getElementById("generate-btn").disabled = true;
}

function enableUI() {
  document.getElementById("bubble-btn").disabled = false;
  document.getElementById("merge-btn").disabled = false;
  document.getElementById("generate-btn").disabled = false;
}

// Initialize
window.onload = () => {
  generateArray();
};

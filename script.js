const barsContainer = document.getElementById("bars-container");
const bars = document.querySelectorAll(".bar");
const checkBtn = document.getElementById("checkBtn");

let dragSrcEl = null;

// Drag & drop behavior
bars.forEach(bar => {
  bar.addEventListener("dragstart", handleDragStart);
  bar.addEventListener("dragover", handleDragOver);
  bar.addEventListener("drop", handleDrop);
  bar.addEventListener("dragend", handleDragEnd);
});

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.outerHTML);
  this.style.opacity = "0.4";
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDrop(e) {
  e.stopPropagation();
  if (dragSrcEl !== this) {
    barsContainer.removeChild(dragSrcEl);
    const dropHTML = e.dataTransfer.getData("text/html");
    this.insertAdjacentHTML("beforebegin", dropHTML);
    const dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
  }
  return false;
}

function handleDragEnd() {
  this.style.opacity = "1";
}

function addDnDHandlers(elem) {
  elem.addEventListener("dragstart", handleDragStart);
  elem.addEventListener("dragover", handleDragOver);
  elem.addEventListener("drop", handleDrop);
  elem.addEventListener("dragend", handleDragEnd);
}

// Check if bars are in correct order
checkBtn.addEventListener("click", () => {
  const bars = document.querySelectorAll(".bar");
  const values = Array.from(bars).map(bar => parseInt(bar.dataset.value));
  const sorted = [...values].sort((a, b) => a - b);

  if (JSON.stringify(values) === JSON.stringify(sorted)) {
    alert("✅ Correct! The bars are sorted in ascending order!");
  } else {
    alert("❌ Not yet sorted! Try again.");
  }
});

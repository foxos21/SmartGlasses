const buttons = document.querySelectorAll(".button");
const totalCostElement = document.getElementById("total-cost");
const exportButton = document.getElementById("export-button");

const fixedCost = 10; // Change this value to your desired fixed cost
let totalCost = fixedCost;
let selectedButtons = {};

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonId = button.id;
    const costElement = button.querySelector(".cost");
    const cost = parseFloat(costElement.textContent);

    if (selectedButtons[buttonId]) {
      totalCost -= cost;
      delete selectedButtons[buttonId];
    } else {
      totalCost += cost;
      selectedButtons[buttonId] = true;
    }

    costElement.classList.toggle("selected");
    totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
  });
});

document.body.addEventListener("click", () => {
  totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
});

exportButton.addEventListener("click", () => {
  const jsonContent = JSON.stringify(selectedButtons, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "selected_buttons.json";
  a.click();
});

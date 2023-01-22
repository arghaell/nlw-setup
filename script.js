const form = document.querySelector("#form-habits");
const nlwSetup = new NLWSetup(form);
const button = document.querySelector("header button");

button.addEventListener("click", add);
form.addEventListener("change", save);

function add() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5);
  const dayExists = nlwSetup.dayExists(today);

  if (dayExists) {
    alert("Day already logged");
    return;
  }
  alert("Day logged sucesfully");

  nlwSetup.addDay(today);
}
function save() {
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data));
}

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {};

//const data = {
//run: ["01-01", "01-02", "01-06"],
//  water: ["01-01", "01-03", "01-05", "01-08", "01-10"],
//  food: ["01-01", "01-03", "01-05", "01-08", "01-10"],
//  study: ["01-01", "01-05", "01-07"],
//  shower: ["01-01", "01-02", "01-03", "01-04", "01-05", "01-06", "01-07"],

nlwSetup.setData(data);
nlwSetup.load();

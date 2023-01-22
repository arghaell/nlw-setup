const form = document.querySelector("#form-habits");
const nlwSetup = new NLWSetup(form);
const button = document.querySelector("header button");

button.addEventListener("click", add);
form.addEventListener("change", save);

function add() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5);
  const dayExists = nlwSetup.dayExists(today);

  if (dayExists) {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (localStorage.getItem("lastDay")) {
      let i =
        new Date(localStorage.getItem("lastDay")).getTime() -
        new Date().getTime();
      let diferenceInDays = Math.ceil(i / (1000 * 3600 * 24));
      let newDay = new Date();
      newDay.setDate(newDay.getDate() + diferenceInDays + 1);

      nlwSetup.addDay(newDay.toLocaleDateString("pt-br").slice(0, -5));
      localStorage.setItem("lastDay", newDay);
      alert("Day logged sucesfully");
      return;
    }
    localStorage.setItem("lastDay", tomorrow);
    nlwSetup.addDay(tomorrow.toLocaleDateString("pt-br").slice(0, -5));
    alert("Day logged sucesfully");
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

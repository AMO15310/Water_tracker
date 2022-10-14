const switchMode = document.querySelector(".mode");
const elem = document.querySelector("body");

switchMode.addEventListener("click", () => {
  elem.classList.toggle("dark-mode");
  let theme = body.classList.value;
  localStorage.setItem("theme", theme);
});
const thim = localStorage.getItem("theme");
elem.classList = thim;

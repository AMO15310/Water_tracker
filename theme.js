const bodySelector = document.querySelector("body");

const theme = localStorage.getItem("theme");
bodySelector.classList = theme;

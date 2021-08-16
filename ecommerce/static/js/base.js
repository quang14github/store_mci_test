const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((e) => {
  e.addEventListener("click", () => {
    e.style.color = "turquoise";
  });
});

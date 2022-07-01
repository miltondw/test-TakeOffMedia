const toggleMenu = document.getElementById("toggle-menu");
const sidebar = document.getElementById("sidebar");
const menu = document.getElementById("main-menu");

toggleMenu.addEventListener("click", (e) => {
  if (
    e.target.id == "toggle-menu" ||
    e.target.parentElement.id == "toggle-menu"
  ) {
    sidebar.classList.toggle("show");
    toggleMenu.classList.toggle("show");
    menu.classList.toggle("show");
  }
});
new Swiper(".mySwiper", {
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  });
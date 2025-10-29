const menuToggle = document.getElementById("menu-toggle");
const menuContainer = document.getElementById("menu-container");
const closeBtn = document.getElementById("close-btn");

menuToggle.addEventListener("click", () => {
    menuContainer.classList.add("show");
});

closeBtn.addEventListener("click", () => {
    menuContainer.classList.remove("show");
});

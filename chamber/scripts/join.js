
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".membership-info .card").forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("loaded");
        }, index * 150);
    });

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }
});

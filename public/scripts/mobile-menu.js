const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenuAside = document.getElementById("mobile-menu");

const toggleMenuHandler = () => {
    mobileMenuAside.classList.toggle("open");
}

mobileMenuBtn.addEventListener("click", toggleMenuHandler);
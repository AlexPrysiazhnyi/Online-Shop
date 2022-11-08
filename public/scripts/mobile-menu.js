const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenuAside = document.getElementById("mobile-menu");

const toggleMenuHandler = () => {
  if (mobileMenuAside.classList.contains("open")) {
    mobileMenuAside.classList.remove("sliding");
    setTimeout(() => {
      mobileMenuAside.classList.remove("open");
    }, 250);
    return;
  }
  mobileMenuAside.classList.add("open");
  setTimeout(() => {
    mobileMenuAside.classList.add("sliding");
  }, 10);
};

mobileMenuBtn.addEventListener("click", toggleMenuHandler);

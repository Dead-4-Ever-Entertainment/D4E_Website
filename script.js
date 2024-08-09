window.onload = () => {
  setTimeout(() => {
    document.querySelector("body").classList.add("display");
  }, 4);
};

const hamburgerMenu = document.querySelector(".hamburger-menu");
const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const menuLinks = document.querySelectorAll(".menu-link");

// Toggle sidebar visibility when clicking the hamburger menu
hamburgerMenu.addEventListener("click", () => {
  document.querySelector(".container").classList.toggle("change");
});

// Close the sidebar when clicking on a menu link
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    container.classList.remove("change");
  });
});

// Close the sidebar if clicked outside
document.addEventListener("click", (event) => {
  if (!sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
    container.classList.remove("change");
  }
});

document.querySelector(".scroll-btn").addEventListener("click", () => {
  document.querySelector("html").style.scrollBehavior = "smooth";
  setTimeout(() => {
    document.querySelector("html").style.scrollBehavior = "unset";
  }, 1000);
});

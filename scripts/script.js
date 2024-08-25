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

document.addEventListener("DOMContentLoaded", function() {
  // Check if the user is on an iOS device
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  var mapLink = document.getElementById('map-link');

  if (isIOS) {
    // Create a prompt for users to choose between Google Maps and Apple Maps
    mapLink.href = "javascript:void(0);"; // Prevent the default link from opening

    mapLink.addEventListener('click', function(event) {
      event.preventDefault();
      var openGoogle = confirm("Would you like to open Google Maps?");
      if (openGoogle) {
        window.location.href = "https://maps.google.com/?q=503+E+48th+ST+N,+Tulsa,+OK,+74126";
      } else {
        window.location.href = "maps://?q=503+E+48th+ST+N,+Tulsa,+OK,+74126";
      }
    });
  }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
window.onload = () => {
  setTimeout(() => {
    document.querySelector("body").classList.add("display");
  }, 4);
};

function toggleForm(formId) {
  const form = document.getElementById(formId);
  // Toggle visibility of the contact form
  form.style.display = form.style.display === "none" ? "block" : "none";
}

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
  var mapLink = document.getElementById('map-link');
  var modal = document.getElementById('map-modal');
  var span = document.getElementsByClassName('close')[0];
  var mapOptions = document.querySelectorAll('.map-option');

  // Detect if the user is on an iOS device
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Open the modal or directly navigate based on device type
  mapLink.addEventListener('click', function(event) {
    event.preventDefault();
    
    if (isIOS()) {
      modal.style.display = 'block'; // Show modal for iOS users
    } else {
      // Open Google Maps directly for non-iOS users
      window.open('https://maps.google.com/?q=503+E+48th+ST+N,+Tulsa,+OK,+74126', '_blank');
    }
  });

  // Close the modal when the close button is clicked
  span.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Close the modal and open the selected map option
  mapOptions.forEach(function(option) {
    option.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  });

  // Close the modal if the user clicks outside of it
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});


document.getElementById('currentYear').textContent = new Date().getFullYear();
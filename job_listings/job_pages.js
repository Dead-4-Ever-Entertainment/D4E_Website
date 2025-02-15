window.onload = () => {
    setTimeout(() => {
      document.querySelector("body").classList.add("display");
    }, 4);
  };

  document.getElementById('currentYear').textContent = new Date().getFullYear();
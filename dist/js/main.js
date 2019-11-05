(function() {
  var wordArray = ["hello my friend", "Heya fellow", "Viewers"];
  var element = document.getElementsByTagName("h1")[0];
  var element2 = document.getElementsByTagName("h1")[1];
  var wordIndex = 1;

  var resetAnimation = function() {
    element.classList.remove("flip");
  };

  setInterval(function() {
    switch (wordIndex) {
      case 0:
        element.classList.add("flip");
        element.textContent = wordArray[0];
        wordIndex = 1;
        setTimeout(resetAnimation, 1000);
        break;
      case 1:
        element2.classList.add("flip");
        element2.textContent = wordArray[1];
        wordIndex = 2;
        setTimeout(resetAnimation, 1000);
        break;
      case 2:
        element2.classList.add("flip");
        element2.textContent = wordArray[2];
        wordIndex = 0;
        setTimeout(resetAnimation, 1000);
        break;
    }
  }, 3000);

  var card = document.querySelector(".thecard");
  setInterval(function() {
    card.classList.remove("thecardBack");

    setTimeout(function() {
      card.classList.add("thecardBack");
    }, 1500);
  }, 3000);

  // / Select DOM Items
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".menu");
  const menuNav = document.querySelector(".menu-nav");
  const menuBranding = document.querySelector(".menu-branding");
  const navItems = document.querySelectorAll(".nav-item");

  // Set Initiaé State of menu
  let showMenu = false;

  menuBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    if (!showMenu) {
      menuBtn.classList.add("close");
      menu.classList.add("show");
      menuNav.classList.add("show");
      menuBranding.classList.add("show");

      navItems.forEach(item => item.classList.add("show"));

      // Set menu state
      showMenu = true;
    } else {
      menuBtn.classList.remove("close");
      menu.classList.remove("show");
      menuNav.classList.remove("show");
      menuBranding.classList.remove("show");

      navItems.forEach(item => item.classList.remove("show"));

      // Set menu state
      showMenu = false;
    }
  }

  // typewriter
  class TypeWriter {
    constructor(txtElement, words, wait = 2000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }

    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];

      // Check if deleting
      if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

      // Initial Type Speed
      let typeSpeed = 300;

      if (this.isDeleting) {
        typeSpeed /= 2;
      }

      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }

      setTimeout(() => this.type(), typeSpeed);
    }
  }

  // Init On DOM Load
  document.addEventListener("DOMContentLoaded", init);

  // Init App
  function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }

  // Sticky menu background
  window.addEventListener("scroll", function() {
    if (window.scrollY > 150) {
      document.querySelector("#header").style.background = "rgba(0,0,0,0.8)";
    } else {
      document.querySelector("#header").style.background = "rgba(0,0,0,0)";
    }
  });

  // Smooth Scrolling
  $("#navbar a, .btn, .menu a").on("click", function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      const hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 100
        },
        800
      );
    }
  });
})();

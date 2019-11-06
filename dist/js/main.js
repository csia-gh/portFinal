(function() {
  var card = document.querySelector(".thecard");
  // setInterval(function() {
  //   card.classList.remove("thecardBack");

  //   setTimeout(function() {
  //     card.classList.add("thecardBack");
  //   }, 2000);
  // }, 4000);

  card.classList.remove("thecardBack");

  setTimeout(function() {
    card.classList.add("thecardBack");
  }, 2000);

  setInterval(function() {
    card.classList.remove("thecardBack");

    setTimeout(function() {
      card.classList.add("thecardBack");
    }, 2000);
  }, 10000);

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

  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", function() {
      navItems.forEach(item => item.classList.remove("current"));
      this.classList.add("current");
    });
  }

  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", toggleMenu);
  }

  $(window)
    .scroll(function() {
      var scrollDistance = $(window).scrollTop();

      // Assign active class to nav links while scolling
      $(".page-section").each(function(i) {
        if ($(this).position().top - 200 <= scrollDistance) {
          $(".menu .menu-nav .nav-item.current").removeClass("current");
          $(".menu .menu-nav .nav-item")
            .eq(i)
            .addClass("current");
          $(".navItem2.current").removeClass("current");
          $(".navItem2")
            .eq(i)
            .addClass("current");
        }
      });
    })
    .scroll();

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

  // // Smooth Scrolling
  // $("#nav-2 a").on("click", function(event) {
  //   if (this.hash !== "") {
  //     event.preventDefault();

  //     const hash = this.hash;

  //     $("html, body").animate(
  //       {
  //         scrollTop: $(hash).offset().top - 100
  //       },
  //       800
  //     );
  //   }
  // });

  // Smooth Scrolling
  $(
    "a[href='#l-home'],a[href='#about'],a[href='#projects'],a[href='#contact-a']"
  ).on("click", function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      const hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        800
      );
    }
  });
})();

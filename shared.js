var backdrop = document.querySelector(".backdrop");
var backdropClose = document.querySelector("#backdropClose");
var mobileNav = document.querySelector(".mobile-nav");
var toggleButton = document.querySelector("#toggle-mobile-nav");
var toggleButton1 = document.querySelector("#toggle-mobile-nav1");
var toggleButton2 = document.querySelector("#toggle-mobile-nav2");
var toggleButton3 = document.querySelector("#toggle-mobile-nav3");

// var toggleButton = document.querySelectorAll("#toggle-mobile-nav, #toggle-mobile-nav1, #toggle-mobile-nav2, #toggle-mobile-nav3");

var closeMoal = document.querySelectorAll(".close-modal");

toggleButton.addEventListener("click", openMobileNev);
toggleButton1 ? toggleButton1.addEventListener("click", openMobileNev) : "";
toggleButton1 ? toggleButton2.addEventListener("click", openMobileNev) : "";
toggleButton1 ? toggleButton3.addEventListener("click", openMobileNev) : "";

function openMobileNev() {
  mobileNav.classList.add("open");
  backdrop.classList.add("open");
}

backdrop.addEventListener("click", closeMobileNav);

function closeMobileNav() {
  mobileNav.classList.remove("open");
  backdrop.classList.remove("open");
}

closeMoal.forEach((e) => {
  e.addEventListener("click", function () {
    console.log("Here");
    closeModal();
  });
});

function closeModal() {
  console.log("closing");

  mobileNav.classList.remove("open");
  backdrop.classList.remove("open");
}

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $(".show-on-scroll-up-header").outerHeight();

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  console.log("Inside scroll fn");
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $(".show-on-scroll-up-header").removeClass("nav-down").addClass("nav-up");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $(".show-on-scroll-up-header").removeClass("nav-up").addClass("nav-down");
    }
  }

  lastScrollTop = st;
}

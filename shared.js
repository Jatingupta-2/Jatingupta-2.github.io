var backdrop = document.querySelector(".backdrop");
var backdropClose = document.querySelector("#backdropClose");
var mobileNav = document.querySelector(".mobile-nav");
var toggleButton = document.querySelector("#toggle-mobile-nav");
var toggleButton1 = document.querySelector("#toggle-mobile-nav1");
var toggleButton2 = document.querySelector("#toggle-mobile-nav2");
var toggleButton3 = document.querySelector("#toggle-mobile-nav3");

// var toggleButton = document.querySelectorAll("#toggle-mobile-nav, #toggle-mobile-nav1, #toggle-mobile-nav2, #toggle-mobile-nav3");

var closeMoal = document.querySelectorAll(".close-modal");

  
toggleButton.addEventListener("click", openMobileNev)
toggleButton1?.toggleButton1.addEventListener("click", openMobileNev)
toggleButton1?.toggleButton2.addEventListener("click", openMobileNev)
toggleButton1?.toggleButton3.addEventListener("click", openMobileNev)


function openMobileNev() {
  mobileNav.classList.add("open");
    backdrop.classList.add("open");
}


backdrop.addEventListener("click", closeMobileNav);


function closeMobileNav() {
  mobileNav.classList.remove("open");
  backdrop.classList.remove("open");
}

closeMoal.forEach(e => {
  e.addEventListener("click", function () {
    console.log("Here")
    closeModal();
  
  });
});


function closeModal() {
  console.log("closing")

  mobileNav.classList.remove("open");
  backdrop.classList.remove("open");

}

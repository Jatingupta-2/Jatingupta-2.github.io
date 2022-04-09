var backdrop = document.querySelector(".backdrop");
var mobileNav = document.querySelector(".mobile-nav");
var toggleButton = document.querySelector("#toggle-mobile-nav");
var closeMoal = document.querySelectorAll(".close-modal");

toggleButton.addEventListener("click", function () {

  mobileNav.classList.add("open");
  backdrop.classList.add("open");

})

backdrop.addEventListener("click", function () {

  closeModal();

});

closeMoal.forEach(e => {
  e.addEventListener("click", function () {
    console.log("Here")
    closeModal();
  
  });
});


function closeModal() {

  mobileNav.classList.remove("open");
  backdrop.classList.remove("open");

}

var backdrop = document.querySelector(".backdrop");
var mobileNav = document.querySelector(".mobile-nav");
var toggleButton = document.querySelectorAll("#toggle-mobile-nav, #toggle-mobile-nav1, #toggle-mobile-nav2, #toggle-mobile-nav3");

var closeMoal = document.querySelectorAll(".close-modal");

for(i=0;i<toggleButton.length;i++){
  
  toggleButton[i].addEventListener("click", function () {

    mobileNav.classList.add("open");
    backdrop.classList.add("open");
  
  })
}


backdrop.addEventListener("click", function () {
  
  mobileNav.classList.remove("open");
  backdrop.classList.remove("open");

});

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

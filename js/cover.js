import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

var animation = lottieWeb.loadAnimation({
  container: document.getElementById('lottie'),
  path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Demo Animation",
});
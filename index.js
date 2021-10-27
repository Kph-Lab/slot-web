import afterimage from './assets/images/start-after.png'

function sleep(waitMsec) {
  var startMsec = new Date();
  while (new Date() - startMsec < waitMsec);
}

function navigate() {
  window.location.href = "/play.html";
}

function toggle() {
  document.getElementById("img").src = afterimage;
  setTimeout(navigate, 100);
}

document.addEventListener('keyup', (event) => {
  console.log(afterimage);
  console.log(event.code);
  if (event.code == "Space") {
    toggle();
  }
});

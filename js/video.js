window.addEventListener('load', carga);

function carga() {
  let video = document.getElementById('video');
  var estat = document.getElementById("playPausa");
  let videoControls = document.getElementById('controls');
  let progres = document.getElementById('progres');


  let videoFunciona = !!document.createElement('video').canPlayType;
  /*if (videoFunciona) {
    video.controls = false;
    videoControls.classList.remove('hidden');
  }*/

  let playButton = document.getElementById('playPausa');

  function barraVideo() {
    setInterval(function () {
      document.getElementById("progres").value = Math.round((video.currentTime / video.duration) * 100);
    });
  }


  document.getElementById('playPausa').addEventListener('click', () => {
    if (video.paused || video.ended) {
      video.play();
      playButton.src = "imatges/pause.png";

    } else {
      video.pause();
      playButton.src = "imatges/play.png";
    }
  });

  document.getElementById('stop').addEventListener('click', function (e) {
    video.currentTime = 0;
    video.pause();
    playButton.src = "imatges/play.png";
  });

  document.getElementById('pujarVolum').addEventListener('click', function (e) {
    document.getElementById('volum').value= parseInt(document.getElementById('volum').value) +2;
    document.getElementById("volum_valor").innerHTML = document.getElementById('volum').value;
  });

  document.getElementById('baixarVolum').addEventListener('click', function (e) {
    document.getElementById('volum').value= parseInt(document.getElementById('volum').value) -2;
    document.getElementById("volum_valor").innerHTML = document.getElementById('volum').value;
  });

  document.getElementById('silenciarVolum').addEventListener('click', function (e) {
    document.getElementById('volum').value = 0;
    document.getElementById("volum_valor").innerHTML = document.getElementById('volum').value;
  });

  barraVideo();
}


window.addEventListener('load', carga);

function carga() {
  let video = document.getElementById('video');
  let volum = document.getElementById('volume');
  let playBoto = document.getElementById('playPausa');
  let volumBoto = document.getElementById('volum');
  let tempsActual = document.getElementById('tempsActual');
  let tempsTotal = document.getElementById('tempsTotal');

  video.controls = false;

  function barraVideo() {
    setInterval(function () {
      document.getElementById("progres").value = Math.round((video.currentTime / video.duration) * 100);
    });
  }
  barraVideo();

  document.getElementById('playPausa').addEventListener('click', () => {
    if (video.paused || video.ended) {
      video.play();
      playBoto.src = "imatges/pause.png";

    } else {
      video.pause();
      playBoto.src = "imatges/play.png";
    }
  });

  document.getElementById('stop').addEventListener('click', function (e) {
    video.currentTime = 0;
    video.pause();
    playBoto.src = "imatges/play.png";
  });

  document.getElementById('10sEnrere').addEventListener('click', function (e) {
    video.currentTime -= 10;
  });

  document.getElementById('10sEndavant').addEventListener('click', function (e) {
    video.currentTime += 10;
  });


  volum.addEventListener('input', updateVolume);
  video.addEventListener('volumechange', updateVolumeIcon);

  function updateVolume() {
    if (video.muted) {
      video.muted = false;
    }
    video.volume = volum.value;
  }

  function updateVolumeIcon() {
    if (video.muted || video.volume === 0) {
      volumBoto.src = "imatges/soundmute.png";
    } else if (video.volume > 0 && video.volume <= 0.5) {
      volumBoto.src = "imatges/sound50.png";
    } else {
      volumBoto.src = "imatges/sound100.png";
    }
  }

  document.getElementById('vel0').addEventListener('click', function (e) {
    video.playbackRate = 0.5;
    document.getElementById('vel0').setAttribute("active", "true");
    document.getElementById('vel1').setAttribute("active", "false");
    document.getElementById('vel2').setAttribute("active", "false");

  });
  document.getElementById('vel1').addEventListener('click', function (e) {
    video.playbackRate = 1;
    document.getElementById('vel0').setAttribute("active", "false");
    document.getElementById('vel1').setAttribute("active", "true");
    document.getElementById('vel2').setAttribute("active", "false");
  });
  document.getElementById('vel2').addEventListener('click', function (e) {
    video.playbackRate = 2;
    document.getElementById('vel0').setAttribute("active", "false");
    document.getElementById('vel1').setAttribute("active", "false");
    document.getElementById('vel2').setAttribute("active", "true");
  });


  setInterval(mostraTemps, 10);

  function mostraTemps() {
    tempsActual.innerHTML = (('00' + (parseInt(video.currentTime))).slice(-3));

  }
  tempsTotal.innerHTML = (parseInt(video.duration));

  document.getElementById('video').addEventListener('ended', function (e) {
    playBoto.src = "imatges/replay.png";
  });
}
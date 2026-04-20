var audio = document.getElementById("audioPlayer");

function loadAudio() {
  var file = document.getElementById("audioFile").files[0];
  if (!file) return;
  audio.src = URL.createObjectURL(file);
  document.getElementById("fileName").textContent = file.name;
  document.getElementById("playPauseBtn").disabled = false;
}

function playPause() {
  if (audio.paused) {
    audio.play();
    document.getElementById("playPauseBtn").textContent = "⏸ Pause";
  } else {
    audio.pause();
    document.getElementById("playPauseBtn").textContent = "▶ Play";
  }
}

function changeVolume() {
  var slider = document.getElementById("volumeSlider");
  audio.volume = slider.value;
  document.getElementById("volumeDisplay").textContent = Math.round(slider.value * 100) + "%";
}

function toggleMute() {
  audio.muted = !audio.muted;
  document.getElementById("iconUnmuted").style.display = audio.muted ? "none" : "inline";
  document.getElementById("mutedIndicator").style.display = audio.muted ? "block" : "none";
  document.getElementById("muteBtnLabel").textContent = audio.muted ? " Unmute" : " Mute";
}

function toggleLoop() {
  audio.loop = !audio.loop;
  document.getElementById("loopBtn").textContent = audio.loop ? "🔁 Loop ON" : "↺ Loop";
}

function changeSpeed() {
  var slider = document.getElementById("speedSlider");
  audio.playbackRate = slider.value;
  document.getElementById("speedDisplay").textContent = slider.value + "x";
}

function skipBack() {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function skipForward() {
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

function seek() {
  audio.currentTime = document.getElementById("seekBar").value;
}

function formatTime(seconds) {
  var m = Math.floor(seconds / 60);
  var s = Math.floor(seconds % 60);
  if (s < 10) s = "0" + s;
  return m + ":" + s;
}

audio.addEventListener("timeupdate", function () {
  document.getElementById("seekBar").value = audio.currentTime;
  document.getElementById("currentTime").textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", function () {
  document.getElementById("seekBar").max = audio.duration;
  document.getElementById("duration").textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", function () {
  document.getElementById("playPauseBtn").textContent = "▶ Play";
});

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") { e.preventDefault(); playPause(); }
  if (e.code === "KeyM")  toggleMute();
  if (e.code === "KeyL")  toggleLoop();
  if (e.code === "ArrowLeft")  skipBack();
  if (e.code === "ArrowRight") skipForward();
});

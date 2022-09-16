const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substring(14, 19);

const handlePlayClick = (e) => {
  // if the video is playing, pause it
  // paused is A boolean value. true is paused and false is not paused.
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeChange = (event) => {
  const value = Number(event.target.value);
  if (value === 0) {
    video.muted = true;
    muteBtn.innerText = "Unmute";
  } else {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};
const handleTimeLineUpdate = (event) => {
  video.currentTime = event.target.value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;

  if (fullScreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");
const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 2000);
};

const handleSpace = (event) => {
  // console.log(event.code);
  // if (event.code === "Space") {
  //   video.paused ? video.play() : video.pause();
  // }
  switch (event.code) {
    case `Space`:
      video.paused ? video.play() : video.pause();
      break;
    case `KeyF`:
      document.fullscreenElement ? document.exitFullscreen() : videoContainer.requestFullscreen();
  }
};
const handleScreen = () => (video.paused ? video.play() : video.pause());
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineUpdate);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keydown", handleSpace);
video.addEventListener("click", handleScreen);

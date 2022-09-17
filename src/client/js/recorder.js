const startBtn = document.getElementById("startBtn");
const audio = document.getElementById("preview");

let stream;
let recorder;
let audioFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = audioFile;
  a.download = "MyRecording.wav";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
  stream = null;
};

const handleStart = async () => {
  await startAudio();
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (event) => {
    audioFile = URL.createObjectURL(event.data);
    audio.srcObject = null;
    audio.src = audioFile;
    // audio.loop = true;
    audio.play();
  };
  recorder.start();
};

const startAudio = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  audio.srcObject = stream;
  audio.play();
  // console.log(stream);
};

startBtn.addEventListener("click", handleStart);

document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("get-content");
  const buttonAudio = document.getElementById("trigger");
  const autoplayAudio = document.querySelector("audio[autoplay]");
  const container2 = document.getElementById("container-2");
  let originalVolume = autoplayAudio.volume;
  const volumeChangeDuration = 1000;
  const volumeChangeInterval = 40;
  let volumeStep = 0.02;

  openButton.addEventListener("click", function () {
    buttonAudio.play();

    smoothVolumeChange(
      originalVolume,
      volumeStep,
      volumeChangeDuration,
      autoplayAudio
    );

    const container2Visible = container2.style.display === "block";

    if (!container2Visible) {
      container2.style.display = "block";
      setTimeout(function () {
        container2.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      container2.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  buttonAudio.addEventListener("ended", function () {
    smoothVolumeChange(
      volumeStep,
      originalVolume,
      volumeChangeDuration,
      autoplayAudio
    );
  });

  function smoothVolumeChange(startVolume, endVolume, duration, audioElement) {
    const volumeChangeSteps = Math.ceil(duration / volumeChangeInterval);
    const volumeStepSize = (endVolume - startVolume) / volumeChangeSteps;

    let currentVolume = startVolume;
    let stepCount = 0;

    const volumeChangeIntervalId = setInterval(function () {
      currentVolume += volumeStepSize;
      audioElement.volume = currentVolume;

      stepCount++;

      if (stepCount >= volumeChangeSteps) {
        clearInterval(volumeChangeIntervalId);
      }
    }, volumeChangeInterval);
  }
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElement = document.querySelectorAll(".hidden");
hiddenElement.forEach((el) => observer.observe(el));

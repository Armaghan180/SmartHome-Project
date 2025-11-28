// Mobile nav
const menuBtn = document.querySelector(".nav-menu-btn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// Device toggles (Cards)
document.querySelectorAll(".device-card .device-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const isOn = btn.classList.toggle("is-on");
    const statusSpan = btn
      .closest(".device-card")
      .querySelector(".device-status-text");

    if (!statusSpan) return;

    if (isOn) {
      if (statusSpan.textContent.includes("Recording")) {
        statusSpan.textContent = "Recording";
        btn.textContent = "Pause feed";
      } else if (statusSpan.textContent.includes("°")) {
        statusSpan.textContent = "22° • Eco";
        btn.textContent = "Boost heat";
      } else {
        statusSpan.textContent = "On";
        btn.textContent = "Turn off";
      }
    } else {
      if (statusSpan.textContent.includes("Recording")) {
        statusSpan.textContent = "Paused";
        btn.textContent = "Resume feed";
      } else if (statusSpan.textContent.includes("°")) {
        statusSpan.textContent = "Idle";
        btn.textContent = "Boost heat";
      } else {
        statusSpan.textContent = "Off";
        btn.textContent = "Turn on";
      }
    }
  });
});

// Pill toggles in hero dashboard
document.querySelectorAll(".pill-toggle").forEach((pill) => {
  pill.addEventListener("click", () => {
    const isOn = pill.classList.toggle("is-on");
    pill.textContent = isOn ? "On" : "Off";
  });
});

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("is-open");
  });
});

// Temperature slider
const tempSlider = document.getElementById("tempSlider");
const tempValueDisplay = document.getElementById("tempValueDisplay");

if (tempSlider && tempValueDisplay) {
  tempValueDisplay.textContent = `${tempSlider.value}°`;

  tempSlider.addEventListener("input", () => {
    tempValueDisplay.textContent = `${tempSlider.value}°`;
  });
}

// Lights brightness slider
const lightsSlider = document.getElementById("lightsSlider");
const lightsPercent = document.getElementById("lightsPercent");

if (lightsSlider && lightsPercent) {
  lightsPercent.textContent = `${lightsSlider.value}%`;

  lightsSlider.addEventListener("input", () => {
    lightsPercent.textContent = `${lightsSlider.value}%`;
  });
}

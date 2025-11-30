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

// Temperature slider (devices page)
const tempSlider = document.getElementById("tempSlider");
const tempValueDisplay = document.getElementById("tempValueDisplay");

if (tempSlider && tempValueDisplay) {
  tempValueDisplay.textContent = `${tempSlider.value}°`;

  tempSlider.addEventListener("input", () => {
    tempValueDisplay.textContent = `${tempSlider.value}°`;
  });
}

// Lights brightness slider (devices page)
const lightsSlider = document.getElementById("lightsSlider");
const lightsPercent = document.getElementById("lightsPercent");

if (lightsSlider && lightsPercent) {
  lightsPercent.textContent = `${lightsSlider.value}%`;

  lightsSlider.addEventListener("input", () => {
    lightsPercent.textContent = `${lightsSlider.value}%`;
  });
}

/* ---------------- Simple auth using localStorage ---------------- */

// Keys for storage
const USERS_KEY = "smarthomeUsers";
const CURRENT_USER_KEY = "smarthomeCurrentUser";

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading users from localStorage", e);
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving users to localStorage", e);
  }
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function showAuthError(form, message) {
  const errorEl = form.querySelector(".auth-error");
  if (errorEl) {
    errorEl.textContent = message;
  } else {
    alert(message);
  }
}

/* --------- Sign up behaviour (signup.html) --------- */

const signupForm = document.querySelector(".signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#signup-name").value.trim();
    const email = document
      .querySelector("#signup-email")
      .value.trim()
      .toLowerCase();
    const password = document.querySelector("#signup-password").value;
    const confirm = document.querySelector("#signup-confirm").value;

    if (!name || !email || !password || !confirm) {
      showAuthError(signupForm, "Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      showAuthError(signupForm, "Passwords do not match.");
      return;
    }

    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      showAuthError(signupForm, "An account with this email already exists.");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser({ name, email });

    // For this project, go straight to devices page
    window.location.href = "devices.html";
  });
}

/* --------- Login behaviour (login.html) --------- */

const loginForm = document.querySelector(".auth-login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document
      .querySelector("#login-email")
      .value.trim()
      .toLowerCase();
    const password = document.querySelector("#login-password").value;

    const users = getUsers();
    const match = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!match) {
      showAuthError(
        loginForm,
        "Incorrect email or password. Please try again."
      );
      return;
    }

    setCurrentUser({ name: match.name, email: match.email });

    // Successful login -> go to devices
    window.location.href = "devices.html";
  });
}

/* ---------------- Show logged-in user in navbar ---------------- */

function updateNavbarUserState() {
  const userArea = document.querySelector(".nav-user-area");
  if (!userArea) return;

  const raw = localStorage.getItem("smarthomeCurrentUser");

  // Nobody logged in → show Login button
  if (!raw) {
    userArea.innerHTML = `
      <button class="nav-cta nav-login-btn" onclick="window.location.href='login.html'">
        Login
      </button>`;
    return;
  }

  const user = JSON.parse(raw);
  const firstName = user.name.split(" ")[0]; // Only show first name

  userArea.innerHTML = `
    <span class="nav-user-name">Hello, ${firstName}</span>
    <button class="logout-btn">Logout</button>
  `;

  // Logout button
  const logoutBtn = userArea.querySelector(".logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("smarthomeCurrentUser");
    window.location.href = "index.html";
  });
}

// Run immediately
updateNavbarUserState();

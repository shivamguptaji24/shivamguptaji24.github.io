'use strict';

// -------------------------------
// 🔄 Helper: Toggle "active" class on element
// -------------------------------
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// -------------------------------
// 📱 Sidebar Toggle (for mobile view)
// -------------------------------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Toggle sidebar when sidebar button is clicked
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// -------------------------------
// ⬇️ Custom Select Dropdown (Filtering logic)
// -------------------------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Toggle select dropdown menu
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Update selected value and filter content when a dropdown item is clicked
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// -------------------------------
// 🧹 Filter Functionality
// -------------------------------
const filterItems = document.querySelectorAll("[data-filter-item]");

// Show/hide items based on selected category
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// -------------------------------
// 🖥 Filter Buttons (for desktop view)
// -------------------------------
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// -------------------------------
// ✉️ Contact Form Validation & Enable Submit
// -------------------------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Enable submit button only when form is valid
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// -------------------------------
// 🧭 Page Navigation (Single Page Site Navigation)
// -------------------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Navigate to the page that matches nav link text
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0); // Scroll to top
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// -------------------------------
// ✅ Success Modal (After Form Submission)
// -------------------------------
// ✅ Contact Form Submission Handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("successModal");
  const closeBtn = modal.querySelector(".close-btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity(); // Show default browser validation
      return;
    }

    modal.classList.add("show");

    setTimeout(() => {
      modal.classList.remove("show");
      form.reset();
    }, 3000);
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });
});


// -------------------------------
// 🎯 Skills Filter (Interactive Buttons for Skill Category)
// -------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("[data-skill-filter]");
  const skillsItems = document.querySelectorAll(".skills-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-skill-filter");

      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      skillsItems.forEach((item) => {
        item.style.display = (category === "all" || item.getAttribute("data-category") === category)
          ? "inline-block"
          : "none";
      });
    });
  });
});

// -------------------------------
// 🗣 Glitch Text Speech (Read text aloud once)
// -------------------------------
let isSpeaking = false;

function speakText(element) {
  if (isSpeaking) return;

  const textElement = element.querySelector('.glitch-text');
  const textToSpeak = textElement.getAttribute('data-text');

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.pitch = 0;
  utterance.rate = 2;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    utterance.voice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];
  }

  isSpeaking = true;
  utterance.onend = () => isSpeaking = false;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// -------------------------------
// 📂 Sidebar Avatar Interaction
// -------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const avatar = document.querySelector(".avatar-box");
  const closeBtn = document.querySelector(".info_more-btn");

  avatar.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.remove("active");
  });
});

// -------------------------------
// 🔁 Rotating Text Headline Animation
// -------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const animationDelay = 2500;

  function switchWord(current, next) {
    current.classList.remove("is-visible");
    current.classList.add("is-hidden");
    next.classList.remove("is-hidden");
    next.classList.add("is-visible");
  }

  function rotateWords(wrapper) {
    const current = wrapper.querySelector("b.is-visible");
    const next = current.nextElementSibling || wrapper.querySelector("b:first-child");
    switchWord(current, next);
  }

  const wrappers = document.querySelectorAll(".cd-words-wrapper");
  wrappers.forEach(wrapper => {
    setInterval(() => rotateWords(wrapper), animationDelay);
  });
});

// -------------------------------
// 🧲 Floating "Hire Me" Modal
// -------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const hireMeBtn = document.getElementById("hireMeBtn");
  const hireMeModal = document.getElementById("hireMeModal");
  const closeHireMe = document.getElementById("closeHireMe");

  hireMeBtn.addEventListener("click", () => {
    hireMeModal.style.display = "flex";
  });

  closeHireMe.addEventListener("click", () => {
    hireMeModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === hireMeModal) {
      hireMeModal.style.display = "none";
    }
  });
});

// -------------------------------
// 🗣 Jarvis-Style Welcome Voice on Load
// -------------------------------
function playJarvisWelcome() {
  const msg = new SpeechSynthesisUtterance("Welcome. Please wait for a while, I will set up the world for you.");
  msg.pitch = 0.7;
  msg.rate = 0.9;
  msg.volume = 1;

  const voices = speechSynthesis.getVoices();
  msg.voice = voices.find(v =>
    v.name.toLowerCase().includes("google uk english male") ||
    v.name.toLowerCase().includes("daniel") ||
    v.lang === "en-GB"
  ) || voices[0];

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

// On window load: play welcome message and fade out loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  let welcomePlayed = false;

  const safePlayWelcome = () => {
    if (!welcomePlayed) {
      playJarvisWelcome();
      welcomePlayed = true;
    }
  };

  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.addEventListener("voiceschanged", safePlayWelcome);
  } else {
    safePlayWelcome();
  }

  const oneTimeUnlock = () => {
    safePlayWelcome();
    document.removeEventListener("click", oneTimeUnlock);
  };
  document.addEventListener("click", oneTimeUnlock, { once: true });

  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 6000);
});

// -------------------------------
// 📄 Resume Modal Toggle
// -------------------------------
function toggleResumeModal() {
  const modal = document.getElementById("resumeModal");
  const iframe = document.getElementById("resumeIframe");

  if (modal.style.display === "flex") {
    modal.style.display = "none";
    iframe.removeAttribute("src"); // Unload PDF when closing
  } else {
    modal.style.display = "flex";
    iframe.setAttribute("src", "/assets/pdfs/CV Shivam Gupta.pdf"); // Load only when opened
  }
}

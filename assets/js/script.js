'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });






// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

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

}

// add event in all filter button items for large screen
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



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Success Message Modal
const successModal = document.createElement("div");
successModal.innerHTML = `
  <div id="successModal" class="modal" style="display: none; position: fixed; z-index: 1000; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 300px; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); text-align: center;">
    <span class="close-btn" style="position: absolute; top: 10px; right: 15px; font-size: 20px; cursor: pointer; color: black;">&times;</span>
    <ion-icon name="checkmark-circle" style="font-size: 50px; color: green; margin-bottom: 10px;"></ion-icon>
    <p>Your message is sent successfully !!</p>
  </div>
`;
document.body.appendChild(successModal);

// Show success modal on form submit
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Stop form from submitting immediately
  
  document.getElementById("successModal").style.display = "block";
  
  // Hide modal after 3 seconds
  setTimeout(function() {
    document.getElementById("successModal").style.display = "none";
    form.submit(); // Now submit the form
  }, 3000);
});

// Close button functionality
document.querySelector(".close-btn").addEventListener("click", function() {
  document.getElementById("successModal").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("[data-skill-filter]");
  const skillsItems = document.querySelectorAll(".skills-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-skill-filter");

      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      // Show/Hide skills based on category
      skillsItems.forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "inline-block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

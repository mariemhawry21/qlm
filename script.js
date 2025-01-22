let menuIcon = document.querySelector(".mobile-burger");
let menu = document.querySelector(".mobile-menu");

menuIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  menu.classList.toggle("show");
});
document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
    menu.classList.remove("show");
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    menu.classList.remove("show");
  }
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.style.color = "green";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  let stats = document.querySelectorAll(".stat h4");
  let hasScrolled = false;

  const increaseNumber = (el, target) => {
    let count = 0;
    const increment = Math.ceil(target / 100);
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        el.innerHTML = target + "%";
        clearInterval(timer);
      } else {
        el.innerHTML = count + "%";
      }
    }, 20); // Adjust speed
  };

  const onScroll = () => {
    let statsSection = document.querySelector(".stats-section");
    let sectionTop = statsSection.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;

    if (sectionTop < windowHeight && sectionTop > 0 && !hasScrolled) {
      hasScrolled = true;
      stats.forEach((el) => {
        let target = +el.getAttribute("data-target"); // Target value
        increaseNumber(el, target);
      });
    }
  };

  window.addEventListener("scroll", onScroll);
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".mobile-menu .dropdown");

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });
  });
});



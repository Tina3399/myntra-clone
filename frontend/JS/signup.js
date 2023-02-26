import { navbar } from "../Component/navbar.js";

let header = document.getElementById("home_navbar");
header.innerHTML = navbar();

// RESPONSIVE NAVBAR CSS

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  //Animate Links
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  //Hamburger Animation
  hamburger.classList.toggle("toggle");
});

const form = document.getElementById("form");
const signupError = document.getElementById("signup_error");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: form.name.value,
    email: form.email.value,
    phone: form.mob.value,
    pass: form.pass.value,
  };

  console.log(payload);
  await fetch("https://sore-rose-beaver-cape.cyclic.app/users/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      signupError.textContent = res.msg;
      console.log(res, "res");
    })
    .catch((err) => {
      console.log({ msg: "Something went wrong", err: err.message });
    });
});

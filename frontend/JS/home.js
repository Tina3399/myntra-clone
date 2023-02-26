import { navbar } from "../Component/navbar.js";

let header = document.getElementById("home_navbar");
header.innerHTML = navbar();
const token = localStorage.getItem("token");
const loggedInUser = localStorage.getItem("loggedInUser");
const userName = document.getElementById("userName");
const dropdown_content = document.getElementById("dropdown-content");
const count_div = document.getElementById("count_div");
const cart_count = document.getElementById("cart-count-info");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

// <!-- COROUSEL SCRIPT -->
var counter = 1;
setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 5) {
    counter = 1;
  }
}, 3000);

// RESPONSIVE NAVBAR CSS

hamburger.addEventListener("click", () => {
  //Animate Links
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  //Hamburger Animation
  hamburger.classList.toggle("toggle");
});

// Fetch data to get name and count

if (token !== null) {
  await fetch(`http://localhost:8080/cart`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      userName.innerText = loggedInUser;
      dropdown_content.style.display = "none";
      count_div.style.display = "block";
      cart_count.style.marginRight = "60px";
      console.log(res);
      showCartCount();
    })
    .catch((error) => {
      console.log({ msg: "Something went wrong", error: error.message });
    });
}

count_div.addEventListener("click", () => {
  localStorage.clear("token");
  localStorage.clear("loggedInUser");
  location.reload();
});

function showCartCount() {
  fetch("http://localhost:8080/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.cart, "data");
      let cart_count = document.getElementById("cart-count-info");
      cart_count.innerText = data.cart.length;
    });
}
// showCartCount();

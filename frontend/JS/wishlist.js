const wishListData = JSON.parse(localStorage.getItem("Wishlist")) || [];
const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
let wishlistCount = document.getElementById("wishlistCount");
let WishListContainer = document.getElementById("WishListContainer");
const wishlistparent = document.getElementById("wishlistparent");
const empty_bag = document.getElementById("empty_bag");

const token = localStorage.getItem("token");
console.log(token);
import { navbar } from "../Component/navbar.js";

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

// console.log(wishListData);
let header = document.getElementById("home_navbar");
header.innerHTML = navbar();
checkLength(wishListData);
function checkLength(data) {
  if (wishListData.length > 0) {
    empty_bag.style.display = "none";

    wishlistparent.style.display = "block";
  } else {
    empty_bag.style.display = "block";
    wishlistparent.style.display = "none";
  }
  wishlistCount.innerHTML = `My Wishlist <span> ${data.length} items <span>`;
}

displayWishListProducts();

function displayWishListProducts() {
  // console.log(data);
  WishListContainer.innerHTML = "";
  checkLength(wishListData);
  wishListData.forEach(function (product, index) {
    let outer_div = document.createElement("div");
    let div = document.createElement("div");
    let image_div = document.createElement("div");
    image_div.className = "img_div";

    outer_div.setAttribute("id", "products");

    let img = document.createElement("img");
    if (product.gender === "men") {
      img.src = product.image_url.image1;
    } else {
      img.src = product.image_url;
    }

    let undo = document.createElement("button");
    undo.setAttribute("id", "undo");
    undo.textContent = "X";
    undo.addEventListener("click", () => {
      removeWishList(index);
      // console.log("hello");
    });
    div.innerHTML = `<a>
        <div>
        <div class="title">${product.brand}</div>

          <div class="title">${product.subtext}</div>
          <div class="price"> Rs. ${
            product.price
          } <span class="line-through">Rs. ${
      product.mrp
    }</span> <span class="discount">(${
      product.offer ? product.offer : 45
    }% OFF)</span></div>
        </div></a>`;

    //<button id ="moveToBag" onclick="addToCart">MOVE TO BAG</button>
    let cartBtn = document.createElement("button");
    cartBtn.textContent = "MOVE TO BAG";
    cartBtn.setAttribute("id", "moveToBag");
    cartBtn.addEventListener("click", () => {
      addToCart(product, index);
    });

    image_div.append(img);
    image_div.append(undo);
    div.append(cartBtn);
    outer_div.append(image_div, div);

    WishListContainer.append(outer_div);
  });
}

// WISHLIST BUTTON

function removeWishList(index) {
  console.log(index);
  wishListData.splice(index, 1);

  displayWishListProducts();
  localStorage.setItem("Wishlist", JSON.stringify(wishListData));
}

//-----------------------------

//  ADD TO CART BUTTON

function addToCart(product, index) {
  console.log(product);

  const payload = {
    title: product.category,
    image: product.image_url.image1
      ? product.image_url.image1
      : product.image_url,
    price: product.price,
    desc: product.subtext,
    mrp: product.mrp,
    qty: 1,
  };

  if (token !== null) {
    fetch("http://localhost:8080/cart/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        cartData.push(product);
        wishListData.splice(index, 1);
        localStorage.setItem("cartData", JSON.stringify(cartData));
        displayWishListProducts();
        localStorage.setItem("Wishlist", JSON.stringify(wishListData));
        console.log("added to cart", product);
        console.log(res, "result");
        // location.reload();
        showCartCount();
      })
      .catch((error) => {
        console.log({ msg: "Something went wrong", error: error.message });
      });
  } else {
    window.location.href = "../HTML/login.html";
  }
}
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
showCartCount();

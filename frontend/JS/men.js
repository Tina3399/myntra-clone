let productGridItems = document.getElementById("productGridItems");

// Fetch mens data from API

fetch("http://localhost:8080/products?gender=men", {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
  .then((res) => res.json())
  .then((res) => {
    displayProducts(res);
  });

function displayProducts(data) {
  productGridItems.innerHTML = "";
  console.log(data);
  data.forEach(function (product) {
    let outer_div = document.createElement("div");
    let div = document.createElement("div");
    let image_div = document.createElement("div");
    image_div.className = "img_div";

    outer_div.setAttribute("id", "products");

    let img = document.createElement("img");
    img.src = product.image_url.image1;

    div.innerHTML = `<a>
    <div>
      <div class="brandname">${product.brand} <span></span></div>
      <div class="title">${product.subtext}</div>
      <div class="price"> Rs. ${product.price} <span class="line-through">Rs. ${product.mrp}</span> <span class="discount">(${product.offer}% OFF)</span>
      </div>
    </div></a>`;

    outer_div.addEventListener("mouseenter", startInterval);
    outer_div.addEventListener("mouseleave", stopInterval);

    let interval;
    function startInterval() {
      let i = 1;
      interval = setInterval(function () {
        if (i > 4) {
          i = 1;
        }
        let x = "image" + i;
        img.src = product.image_url[x];
        x = "";
        i = i + 1;
      }, 1000);
    }

    function stopInterval() {
      clearInterval(interval);
      img.src = product.image_url.image1;
    }

    //---------------------------------------

    let wishListDiv = document.createElement("div");
    wishListDiv.setAttribute("id", "wishListDiv");
    let wishListBtn = document.createElement("button");
    wishListBtn.setAttribute("id", "wishListBtn");
    let wishicon = document.createElement("span");
    wishicon.className = "material-icons";
    wishicon.innerHTML = '<i class="fa-solid fa-heart material-icons"></i>';
    let wishname = document.createElement("span");
    wishname.innerHTML = "WISHLIST";
    wishListBtn.append(wishicon, wishname);
    wishListDiv.append(wishListBtn);

    outer_div.onmousemove = function () {
      wishListDiv.style.visibility = "visible";
      // wishListBtn.innerHTML=`<button id="wishListBtn">WISH LIST</button>`
    };

    outer_div.onmouseout = function () {
      wishListDiv.style.visibility = "hidden";
    };

    wishListBtn.onclick = function () {
      wishListBtn.style.backgroundColor = "#535766";
      wishListBtn.style.color = "white";
      wishname.innerHTML = "WISHLISTED";
      addToWishList(product);
    };

    //---------------------------------------------------------
    image_div.append(img, wishListDiv);

    outer_div.append(image_div, div);

    img.addEventListener("click", () => {
      localStorage.setItem("PoductDetalisData", JSON.stringify(product));
      window.location.href = "../HTML/productDetail.html";
    });

    div.addEventListener("click", () => {
      localStorage.setItem("PoductDetalisData", JSON.stringify(product));
      window.location.href = "../HTML/productDetail.html";
    });

    productGridItems.append(outer_div);
  });
}

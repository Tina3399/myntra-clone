import { navbar } from "../Component/navbar.js";

let header = document.getElementById("home_navbar");
let wishListData = JSON.parse(localStorage.getItem("Wishlist")) || [];

header.innerHTML = navbar();

let productDetailContainer = document.getElementById("productDetailContainer");

const displayData = () => {
  let product = JSON.parse(localStorage.getItem("PoductDetailsData"));
  console.log(product);

  let productDetailParent = document.getElementById("productDetailParent");
  let Left = document.getElementById("left");
  let Right = document.getElementById("right");

  let p = document.createElement("p");
  p.setAttribute("class", "produtPara");
  p.innerHTML = `Home / Clothing / Men Clothing / Tshirts /<span> ${product.brand}</span>/
  <span> ${product.subtext}</span>`;
  productDetailContainer.append(p);

  if (product.gender === "men") {
    Left.innerHTML = `<img src="${product.image_url.image1}" alt="">
    <img src="${product.image_url.image2}" alt="">
    <img src="${product.image_url.image3}" alt="">
    <img src="${product.image_url.image4}" alt="">`;
  } else {
    Left.innerHTML = `<img style="width:50%;height:auto;margin-left:25%" src="${product.image_url}" alt="">`;
  }
  Right.innerHTML = ` <h3 class="poductName">${product.brand}</h3>
    <h3 class="ProductTitle">${product.category}</h3>
    <div class="ratebox">
    <p class="productRating">4</p>
    <i class="fa-sharp fa-solid fa-star"></i>
    <div class="separator">|</div>
    <span class="ratingCount">4.5k Rating</span>
    </div>
    <hr>
    <div>
    <div class="price"> Rs. ${
      product.price
    }    <span class="line-through">Rs. ${
    product.mrp
  }</span>     <span class="discount">(${
    product.offer ? product.offer : 45
  }% OFF)</span>
    <div class="inclusiveTax">Inclusive of all taxes</div>
    <div class=Selectsize><span> SELECT SIZE </span> <span> SIZE CHART    > </span></div>
    <div class="Pleaseselectsize">Please select a size</div>

    <div class="productSizesdiv">
    <button class="circles">S</button>
    <button class="circles">M</button>
    <button class="circles">L</button>
    <button class="circles">XL</button>
    <button class="circles">XXL</button>
    </div>

    <div id="Buttons">
    <button class="cartbtn" id="cart">
    <img src="https://www.svgrepo.com/show/17522/bag.svg" />ADD TO BAG
    </button>
    <button class="wishbtn" id="wishlist">
    <i style="font-size:25px;margin-right:10px" class="fa-regular fa-heart"></i>WISHLIST
    </button>
    </div>

    <div class="deliverOption"> DELIVERY OPTIONS <img src="https://media.istockphoto.com/vectors/fast-delivery-truck-icon-fast-shipping-design-for-website-and-mobile-vector-id1302438914?k=20&m=1302438914&s=170667a&w=0&h=8HroNF2rhDbQCruNiN6ExIbplmIIMcD3vmFN6Z2CZNU=" /></div>

    <div class="enterPincode"><input type="text" placeholder="Enter a PIN code">CHECK</div>

    <p class="pinp">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>

    <p class="paya">100% Original Products </p>
    <p class="paya">Pay on delivery might be available</p>
    <p class="paya">Easy 30 days returns and exchanges</p>
    <p class="paya">Try & Buy might be available</p>

    <hr>

    <div class="produtDetailsdiv"> PRODUCT DETAILS <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwjVwMMSbIn5aK32MPiwO_8b6JA8ps-Lt3A&usqp=CAU" /></div>
    <p class="produtDetailspara">Keep this hip this season with the HRX Men's Athleisure T-shirt. This versatile T-shirt can be styled any way you like for the ultimate gym-to-street look.</p> 

    <div class="produtDetailsdiv"> Features</div>
    <p class="paya">Athleisure T-shirt can be paired with tracks, khakis or jeans </p>
    <p class="paya">Style: Round Neck </p>
    <p class="paya">Sleeve: Short Sleeves</p>
    <p class="paya">Colour: Yellow </p>
    <p class="paya">Print: Typography</p>
    <p class="paya">Fit: Regular</p>

    <div class="produtDetailsdiv"> Size & Fit </div>
    <p class="paya"> The model height 6' is wearing a size M </p>

    <div class="produtDetailsdiv"> Material & Care </div>
    <p class="paya"> 100% cotton </p>
    <p class="paya"> Machine-wash </p>
    <hr>
    <div>
  `;

  productDetailParent.append(Left, Right);
  productDetailContainer.append(productDetailParent);

  //   ----------------------------------------------------

  let wishlist = document.getElementById("wishlist");
  wishlist.addEventListener("click", () => {
    wishlist.style.backgroundColor = "#ff3e6c";
    wishlist.style.color = "white";
    addToWishList(product);
  });

  wishlist.addEventListener("dblclick", () => {
    wishlist.style.backgroundColor = "#fff";
  });

  //-----------------------------------------------------------------

  let cart = document.getElementById("cart");
  cart.addEventListener("click", () => {
    addToCart(product);
  });
};
displayData();

//----------------------------------------------------------------------------------

function addToWishList(product) {
  let flag = false;

  for (let i = 0; i < wishListData.length; i++) {
    if (wishListData[i]._id === product._id) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    wishListData.push(product);
  }

  localStorage.setItem("Wishlist", JSON.stringify(wishListData));
  console.log(wishListData);
}


//---------------------------------------------------------------------------------




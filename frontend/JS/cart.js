let cartParent = document.getElementById("cartParent");
const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
const empty_cart = document.getElementById("empty_cart");
const not_empty = document.getElementById("not_empty");
const token = localStorage.getItem("token");

let cartLeft = document.createElement("div");
cartLeft.setAttribute("id", "cartLeft");

let cartRight = document.createElement("div");
cartRight.setAttribute("id", "cartRight");

let avilableOfferDiv = document.createElement("div");
avilableOfferDiv.setAttribute("id", "avilableOfferDiv");

let priceDetailsContainer = document.createElement("div");
priceDetailsContainer.setAttribute("id", "priceDetailsContainer");

let dataDiv = document.createElement("div");
dataDiv.setAttribute("id", "dataDiv");

if (token !== null) {
  fetchData();
  empty_cart.style.display = "none";
  not_empty.style.display = "block";
} else {
  empty_cart.style.display = "block";
  not_empty.style.display = "none";
}

async function fetchData() {
  await fetch(`https://doubtful-toad-flip-flops.cyclic.app//cart`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res, "response");
      const Pcount = document.getElementById("Pcount");
      const totalPrice = document.getElementById("totalPrice");
      const totalAmount = document.getElementById("totalAmount");
      const discountPrice = document.getElementById("discountPrice");
      let total = 0;
      for (let i = 0; i < res.cart.length; i++) {
        total += Number(res.cart[i].price) * Number(res.cart[i].qty);
      }
      totalPrice.innerText = "₹" + total;
      const discount = Number(total) * (15 / 100);
      console.log(discount);
      discountPrice.innerText = "₹" + discount.toFixed(2);
      totalAmount.innerText = "₹" + (Number(total) - Number(discount));

      Pcount.innerText = res.cart.length + " Items";
      Pcount.style.color = "red";
      displayProducts(res.cart);
    })
    .catch((error) => {
      console.log({ msg: "Something went wrong", error: error.message });
    });
}

// AVAILABLE OFFER

avilableOfferDiv.innerHTML = `   <div class="avail_offer">
<div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKgAWECXD-dGwIJDs8PmoO65IAVSAHqqGi3Q&usqp=CAU" alt=""><pre><b>  Available Offers</b></pre></div>
<ul>
    <li> 5% Unlimited Cashback on Flipkart Axis Bank Ctedit Card TCA</li> <span id="dots"></span><span id="more">
        <li>10% Cashback upto R 100 on Paytm Postpaid transaction on a min spend of Rs 1000 , TCA
        </li>
        <li>10% Cashback upto R 200 on Ola Money Postpaid or wallet transaction on a min spend of Rs 100 TCA</li>
        <li>10% Cashback up to R 750 on Dhani One Freedom Card on a min spend of Rs 1,200. TCA</li>
        <li>10% Cashback Upto R$ 150 on Mobikwik wallet transaction of min Rs 1500 TCA
        </li>
        <li>5% Cashback upto R$ 150 and 3X Reward points on a minimum spend of Rs 1,500 with PayZapp.TCA
        </li>
        <li>Flat Rs 200 Cashback on first Airtel Payments Bank transaction on Myntra on a min spend of Rs 2,000. TCA
        </li></span>
</ul>
<button id="showMoreOffer"><b>Show more </b></button>
</div>`;

cartLeft.append(avilableOfferDiv);

// display Cart Data

function displayProducts(data) {
  dataDiv.innerHTML = "";
  data.forEach((el, index) => {
    // console.log(el);

    let div = document.createElement("div");
    div.setAttribute("id", "outerDiv");

    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("id", "imgDiv");
    let img = document.createElement("img");
    img.src = el.image;

    imgDiv.append(img);

    let descriptionDiv = document.createElement("div");
    descriptionDiv.setAttribute("id", "descriptionDiv");
    descriptionDiv.innerHTML = `<div>
       <div class="brandname"> ${el.title}</div>
       <div class ='title'> ${el.desc}</div>
       <div id="quantity_btns">
    <button id="plusBtn" onclick = "increaseQty(this)" data=${
      el._id
    }><i class="fa-solid fa-plus"></i></button>
    <span id="product_quantity" >${el.qty}</span>
    <button id="minusBtn" onclick = "decreaseQty(this)" data=${
      el._id
    } ><i class="fa-solid fa-minus"></i></button>
</div>
       </div>
       <div class="price"> Rs. ${
         el.price
       } <span class="line-through">Rs. 1499</span> <span class="discount">(${
      el.offer ? el.offer : 45
    }% OFF)</span>
       </div>`;

    div.append(imgDiv, descriptionDiv);

    let undo = document.createElement("button");
    undo.setAttribute("id", "undo");
    undo.textContent = "X";

    undo.addEventListener("click", () => {
      removeCartItem(el._id, index);
    });

    div.append(undo);

    dataDiv.append(div);
    cartLeft.append(dataDiv);
  });
}

let coupensDiv = document.createElement("div");
coupensDiv.innerHTML = `<div class="coupensDiv">
<div class="couponsBox">
    <div>
        <p class='Cname'>COUPONS</p>
    </div>
    <div class='Capply'>
        <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLSididhxOn_gqSKHQ_QWoDHQiFq6_CVDWjA&usqp=CAU'/> <span> Apply Coupons </span>  <button id="applyNow" id="applyCoupensbtn" ><b>Apply</b></button> </div>
        <div>
        </div>
    </div>
</div>
</div>`;

cartRight.append(coupensDiv);

let giftsDiv = document.createElement("div");
giftsDiv.innerHTML = `<p class='Gname'>GIFITNG AND PERSONALIZAION</p>
<div class="gifting">
<div><img src="https://constant.myntassets.com/checkout/assets/img/gift-big.webp" alt="" ></div>
<div>
    <p>Buying for a loved one?</p>
    <p>Gift wrap and personalised message on card <br> Only 25 RS.</p>
    <button  id="applyNowG" ><b>Add Gift Wrap</b></button>
</div>
</div>`;

cartRight.append(giftsDiv);

priceDetailsContainer.innerHTML = `<div class="priceDetails">PRICE DETAILS <span id="Pcount">( 0 Items )<span></div>
<div class="priceDetailDIv">

  <div class="totalDiv">
    <div>Total MRP</div>
    <div id="totalPrice">₹ 0</div>
  </div>

  <div class="totalDiv">
    <div>Discount On MRP</div>
    <div class="greenText" id="discountPrice">-₹ 0</div>
  </div>

  <div class="totalDiv">
    <div>Coupon Discount</div>
    <button id="applyCoupensbtn" class><b>Apply Coupon</b></button>
  </div>

  <div class="totalDiv">
    <div>Convinience Fee<span class="knowMore">  Know More</span></div>
    <div class="greenText">FREE</div>
  </div>

  <br/><hr/>

  <div class="totalAmountDiv totalDiv" >
    <div>Total Amount</div>
    <div id="totalAmount">₹ 0</div>
  </div>

  <div class="noConFeeImg">
  <img src="../images/noConvFee.jpg"/>
</div>

<a href="../Pages/payment.html"><button id="placeOrder" onclick="paymentBtn()">PLACE ORDER</button></a>  

</div> <br> <br>`;

async function paymentBtn() {
    await fetch("https://doubtful-toad-flip-flops.cyclic.app//cart/deleteAll", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    localStorage.setItem("cartData", JSON.stringify([]));
    window.location.href = "../pages/payment.html";
}

cartRight.append(priceDetailsContainer);

cartParent.append(cartLeft, cartRight);

// Delete items from cart

async function removeCartItem(id, index) {
  await fetch(
    `https://doubtful-toad-flip-flops.cyclic.app//cart/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(cartData);

      console.log(res, "ress");
      cartData.splice(index, 1);

      localStorage.setItem("cartData", JSON.stringify(cartData));

      fetchData();
    })
    .catch((err) =>
      console.log({ msg: "something went wwrong", err: err.message })
    );
}

// Increase Quantity   ------------!!!!!!!!!!!

function increaseQty(e) {
  const id = e.getAttribute("data");
  fetch(`https://doubtful-toad-flip-flops.cyclic.app//cart/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      res.qty++;
      fetch(`https://doubtful-toad-flip-flops.cyclic.app//cart/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(res),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          fetchData();
        })
        .catch((error) => {
          console.log({ msg: "Something went wrong", error: error.message });
        });
    })
    .catch((error) => {
      console.log({ msg: "Something went wrong", error: error.message });
    });
}

function decreaseQty(e) {
  const id = e.getAttribute("data");
  fetch(`https://doubtful-toad-flip-flops.cyclic.app//cart/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      res.qty = res.qty === 1 ? 1 : res.qty - 1;

      fetch(`https://doubtful-toad-flip-flops.cyclic.app//cart/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(res),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);

          fetchData();
        })
        .catch((error) => {
          console.log({ msg: "Something went wrong", error: error.message });
        });
    })
    .catch((error) => {
      console.log({ msg: "Something went wrong", error: error.message });
    });
}

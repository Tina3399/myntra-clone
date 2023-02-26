let productGridItems = document.getElementById('productGridItems');
const url = 'https://sore-rose-beaver-cape.cyclic.app/products';
let WishListData = JSON.parse(localStorage.getItem('Wishlist')) || [];

var mensData = [];
// Fetch mens data from API
fetchData();
async function fetchData() {
  await fetch(`${url}?gender=men`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      displayProducts(res);
      mensData.push(res);
    })
    .catch((error) => {
      console.log({ msg: 'Something went wrong', error: error.message });
    });
}

function displayProducts(data) {
  productGridItems.innerHTML = '';
  // console.log(data);
  data.forEach(function (product) {
    let outer_div = document.createElement('div');
    let div = document.createElement('div');
    let image_div = document.createElement('div');
    image_div.className = 'img_div';

    outer_div.setAttribute('id', 'products');
    // console.log(product.image_url.image1)
    let img = document.createElement('img');
    if (product.gender === 'men') {
      img.src = product.image_url.image1;
    } else {
      img.src = product.image_url;
    }
    div.innerHTML = `<a>
    <div>
      <div class="brandname">${product.brand} <span></span></div>
      <div class="title">${product.subtext}</div>
      <div class="price"> Rs. ${product.price} <span class="line-through">Rs. ${product.mrp}</span> <span class="discount">(${product.offer}% OFF)</span>
      </div>
    </div></a>`;

    if (product.gender === 'men') {
      outer_div.addEventListener('mouseenter', startInterval);
      outer_div.addEventListener('mouseleave', stopInterval);

      let interval;
      function startInterval() {
        let i = 1;
        interval = setInterval(function () {
          if (i > 4) {
            i = 1;
          }
          let x = 'image' + i;
          img.src = product.image_url[x];
          x = '';
          i = i + 1;
        }, 1000);
      }

      function stopInterval() {
        clearInterval(interval);
        img.src = product.image_url.image1;
      }
    }
    //---------------------------------------

    let wishListDiv = document.createElement('div');
    wishListDiv.setAttribute('id', 'wishListDiv');
    let wishListBtn = document.createElement('button');
    wishListBtn.setAttribute('id', 'wishListBtn');
    let wishicon = document.createElement('span');
    wishicon.className = 'material-icons';
    wishicon.innerHTML = '<i class="fa-solid fa-heart material-icons"></i>';
    let wishname = document.createElement('span');
    wishname.innerHTML = 'WISHLIST';
    wishListBtn.append(wishicon, wishname);
    wishListBtn.addEventListener('click', () => {
      addToWishList(product);
      wishListBtn.style.backgroundColor = '#535766';
      wishListBtn.style.color = 'white';
    });

    wishListDiv.append(wishListBtn);

    outer_div.onmousemove = function () {
      wishListDiv.style.visibility = 'visible';
      // wishListBtn.innerHTML=`<button id="wishListBtn">WISH LIST</button>`
    };

    outer_div.onmouseout = function () {
      wishListDiv.style.visibility = 'hidden';
    };

    //---------------------------------------------------------
    image_div.append(img, wishListDiv);

    outer_div.append(image_div, div);

    img.addEventListener('click', () => {
      localStorage.setItem('PoductDetailsData', JSON.stringify(product));
      window.location.href = '../Pages/productDetail.html';
    });

    div.addEventListener('click', () => {
      localStorage.setItem('PoductDetailsData', JSON.stringify(product));
      window.location.href = '../Pages/productDetail.html';
    });

    productGridItems.append(outer_div);
  });
}
// console.log(mensData);

//---------------------------------------------------------------------------------

function addToWishList(product) {
  let flag = false;

  for (let i = 0; i < WishListData.length; i++) {
    if (WishListData[i]._id === product._id) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    WishListData.push(product);
  }

  localStorage.setItem('Wishlist', JSON.stringify(WishListData));
  console.log(WishListData);
}

//---------------------------------------------------------------------------

// // sort Products
let sortButton = document.getElementById('sortButton');
sortButton.addEventListener('change', sortProducts);

function sortProducts() {
  let sortCriteria = sortButton.value;
  let productList = mensData;
  // console.log(productList[0],"after clicking on Sorting");
  let updatedProductList = productList[0].sort((prodA, prodB) => {
    if (sortCriteria === 'asc') {
      return prodA.price - prodB.price;
    } else if (sortCriteria === 'desc') {
      return prodB.price - prodA.price;
    } else if (sortCriteria === 'discount') {
      return prodB.offer - prodA.offer;
    } else {
      return true;
    }
  });
  // console.log(updatedProductList);
  displayProducts(updatedProductList);
}

// Filter Products acc to BRAND

const FilterBrand = document.getElementById('filterButtonBrand');

FilterBrand.addEventListener('click', (event) => {
  console.log(event.target.value);

  fetch(`${url}?brand=${event.target.value}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      displayProducts(res);
    })
    .catch((error) => {
      console.log({ msg: 'Something went wrong', error: error.message });
    });
});

// Filter Products acc to Price Range

const FilterPrice = document.getElementById('filterButtonPrice');

FilterPrice.addEventListener('click', (event) => {
  let min = Number(event.target.min);
  let max = Number(event.target.max);

  fetch(
    `https://sore-rose-beaver-cape.cyclic.app/products?min=${min}&max=${max}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res, 'filtered price');
      displayProducts(res);
    })
    .catch((error) => {
      console.log({ msg: 'Something went wrong', error: error.message });
    });
});

// Filter Products acc to their discount

const FilterDiscount = document.getElementById('filterButtonDiscount');

FilterDiscount.addEventListener('click', (event) => {
  let value = Number(event.target.value);

  fetch(`https://sore-rose-beaver-cape.cyclic.app/products?offer=${value}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res, 'discounted price');
      displayProducts(res);
    })
    .catch((error) => {
      console.log({ msg: 'Something went wrong', error: error.message });
    });
});

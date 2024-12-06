function loadHTML(elementId, file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("cartContent", "cart-content.html");
});

function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  } else {
    listCart = [];
  }
}
let cartCount = 0;
let listCart = [];
checkCart();

function addToCart($idProduct) {
  cartCount++;
  document.getElementById("cartpage").textContent = cartCount;
  let productsCopy = JSON.parse(JSON.stringify(products));
  //// If this product is not in the cart
  if (!listCart[$idProduct]) {
    listCart[$idProduct] = productsCopy.filter(
      (product) => product.id == $idProduct
    )[0];
    listCart[$idProduct].quantity = 1;
  } else {
    //If this product is already in the cart.
    //I just increased the quantity
    listCart[$idProduct].quantity++;
  }
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

  addCartToHTML();
}

function addCartToHTML() {
  // clear data default
  let listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = "";

  let totalHTML = document.querySelector(".cartCount");
  let totalQuantity = 0;
  // if has product in Cart
  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let discountedPrice = setProductPrice(
          product.price,
          product.isDiscounted
        );
        let priceSpan = setProductPriceSpan(
          product.isDiscounted,
          discountedPrice,
          product.price
        );
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `
        <div class="productimg-cart-frame">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="cart-product-details">
        <div class="content">
          <div class="name" onclick="viewPageProduct(${product.id})">${product.name}</div>${priceSpan}
        </div>
        <div class="quantity detail-row quantity-controls">
          <button class="minus" onclick="changeQuantity(${product.id}, '-')">-</button>
          <span class="value">${product.quantity}</span>
          <button class="plus" onclick="changeQuantity(${product.id}, '+')">+</button>
        </div>
        </div>
         `;

        listCartHTML.appendChild(newCart);
        totalQuantity = totalQuantity + product.quantity;
      }
    });
  }
  totalHTML.innerText = totalQuantity;
}

function updateCartCount() {
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.textContent = cart.length;
}
function changeQuantity($idProduct, $type) {
  switch ($type) {
    case "+":
      listCart[$idProduct].quantity++;
      break;
    case "-":
      listCart[$idProduct].quantity--;

      // if quantity <= 0 then remove product in cart
      if (listCart[$idProduct].quantity <= 0) {
        delete listCart[$idProduct];
      }
      break;

    default:
      break;
  }
  // save new data in cookie
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  // reload html view cart
  addCartToHTML();
}

let totalQuantity = 0;
let totalPrice = 0;

function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  }
}
checkCart();
setTimeout(checkoutCounter, 2000);
setTimeout(addCartToHTML, 2000);
setTimeout(updateWishlistCount, 2000);
function checkoutCounter() {
  // clear data default
  //   let listCartHTML = document.querySelector(".returnCart .list");
  //   listCartHTML.innerHTML = "";

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product_id") || null;
  const quantity = urlParams.get("quantity") || null;

  let totalQuantityHTML = document.querySelector(".cartCount");
  let totalPriceHTML = document.querySelector(".totalPrice");
  // if has product in Cart
  if (productId !== null && quantity !== null) {
    products.forEach((product) => {
      if (product.id == productId) {
        addProductCell(product, quantity);
      }
    });
  } else {
    if (listCart) {
      listCart.forEach((product) => {
        addProductCell(product);
      });
    }
  }

  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = "$" + totalPrice.toFixed(2);
}

function addProductCell(product, quantity = null) {
  let productTable = document.getElementById("productList");
  if (product) {
    let row = productTable.insertRow(-1);
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    const qty = quantity ? quantity : product.quantity;
    const discountedPrice = setProductPrice(
      product.price,
      product.isDiscounted
    );
    c1.innerText = product.name;
    c2.innerText = "$" + discountedPrice;
    c3.innerText = qty;
    c4.innerText = "$" + discountedPrice * qty;

    totalQuantity = totalQuantity + qty;
    totalPrice = totalPrice + discountedPrice * qty;
  }
}
//to follow

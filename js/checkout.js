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
function checkoutCounter() {
  // clear data default
  //   let listCartHTML = document.querySelector(".returnCart .list");
  //   listCartHTML.innerHTML = "";
  let productTable = document.getElementById("productList");
  let totalQuantityHTML = document.querySelector(".cartCount");
  let totalPriceHTML = document.querySelector(".totalPrice");

  let totalQuantity = 0;
  let totalPrice = 0;
  // if has product in Cart
  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let row = productTable.insertRow(-1);
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);
        let c4 = row.insertCell(3);

        c1.innerText = product.name;
        c2.innerText = product.price;
        c3.innerText = product.quantity;
        c4.innerText = product.price * product.quantity;

        totalQuantity = totalQuantity + product.quantity;
        totalPrice = totalPrice + product.price * product.quantity;
      }
    });
  }
  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = "$" + totalPrice.toFixed(2);
}

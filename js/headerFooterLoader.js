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
  loadHTML("header", "header.html");
  loadHTML("footer", "footer.html");
  setTimeout(setEventListenert, 3000);
});

function setEventListenert() {
  console.log("page is fully loaded");
  let iconCart = document.querySelector(".viewCart");
  let cart = document.querySelector(".cart-main");
  let container = document.querySelector(".container");

  iconCart.addEventListener("click", function () {
    if (cart.style.right == "-100%") {
      cart.style.right = "0";
    } else {
      cart.style.right = "-100%";
    }
  });

  let close = document.querySelector(".close");
  close.addEventListener("click", function () {
    cart.style.right = "-100%";
    container.style.transform = "translateX(0)";
  });


}

function searchProduct() {
  const path = window.location.pathname;
  let searchItem = document.getElementById("search-bar").value;
  let isShop = (path.includes("shop.html")) ? true : false;
   
    const filteredProducts =
    searchItem === "all" || searchItem === "" ? products : products.filter((p) =>  (p.category.includes(searchItem)|| p.name.includes(searchItem)));
    if(isShop) {
      productsContainer.innerHTML = "";
      if(filteredProducts.length < 1 ) {
        productsContainer.innerHTML = "No product found.";
      } else {
        if(path.includes("shop.html")) {
          filteredProducts.forEach((product) => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
          });
        } 
      }
    } else {
      const searchRes = document.getElementById("searchResult");
      if(searchItem === "") {
        searchResult.innerHTML ="";
      } else {
        if(filteredProducts.length < 1 && searchItem !== "") {
          searchRes.innerHTML = "No product found";
        } else {
          searchResult.innerHTML ="";
          filteredProducts.forEach((product) => {
            const prodLi = createSearchResultInput(product);
            prodLi.addEventListener("click", function(e) {
              window.open("product-page.html?id="+product.id, "_self");  
            });
            searchRes.appendChild(prodLi);
          });
        }
      }
    }
}
function createSearchResultInput(product) {
  let prodLi = document.createElement('li');
  prodLi.innerHTML = `<img src="${product.image}" alt="${product.name}">
      <div class="prodName" value="${product.id}"> ${product.name} </div> <div class = "price"> $${product.price} </div>`;
  return prodLi;
}
function toggleCart() {
  const cartModal = document.getElementById("cartModal");
  if (cartModal.style.right === "0px") {
    cartModal.style.right = "-400px"; // Hide cart
  } else {
    cartModal.style.right = "0px"; // Show cart
    addCartToHTML(); // Populate items when showing
  }
}

// Function to clear the cart (if needed)
function clearCart() {
  // Logic to clear items from cart
  listCart = []; // Assuming listCart holds your cart items
  localStorage.removeItem("listCart"); // Clear from localStorage if used
  addCartToHTML(); // Refresh displayed items
}

// Function to populate cart items (similar to addCartToHTML)
function addCartToHTML() {
  const listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = ""; // Clear previous items

  if (listCart.length === 0) {
    listCartHTML.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  listCart.forEach((product) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <span>${product.name}</span>
          <span>${product.quantity}</span>
      `;
    listCartHTML.appendChild(itemDiv);
  });
}

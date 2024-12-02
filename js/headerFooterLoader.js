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
  let isShop = path.includes("shop.html") ? true : false;

  const filteredProducts =
    searchItem === "all" || searchItem === ""
      ? products
      : products.filter(
          (p) =>
            p.category.toLowerCase().includes(searchItem.toLowerCase()) ||
            p.name.toLowerCase().includes(searchItem.toLowerCase())
        );
  if (isShop) {
    productsContainer.innerHTML = "";
    if (filteredProducts.length < 1) {
      productsContainer.innerHTML = "No product found.";
    } else {
      if (path.includes("shop.html")) {
        filteredProducts.forEach((product) => {
          const productCard = createProductCard(product);
          productsContainer.appendChild(productCard);
        });
        disableWishList();
      }
    }
  } else {
    const searchRes = document.getElementById("searchResult");
    if (searchItem === "") {
      searchResult.innerHTML = "";
    } else {
      if (filteredProducts.length < 1 && searchItem !== "") {
        searchRes.innerHTML = "No product found";
      } else {
        searchResult.innerHTML = "";
        filteredProducts.forEach((product) => {
          const prodLi = createSearchResultInput(product);
          prodLi.addEventListener("click", function (e) {
            window.open("product-page.html?id=" + product.id, "_self");
          });
          searchRes.appendChild(prodLi);
        });
      }
    }
  }
}
function createSearchResultInput(product) {
  let prodLi = document.createElement("li");
  let discountedPrice = setProductPrice(product.price, product.isDiscounted);
  let priceSpan = setProductPriceSpan(
    product.isDiscounted,
    discountedPrice,
    product.price
  );
  prodLi.innerHTML = `<img src="${product.image}" alt="${product.name}">
      <div class="prodName" value="${product.id}"> ${product.name} </div> ${priceSpan}`;
  return prodLi;
}

function setProductPrice(price, isDiscounted) {
  return isDiscounted
    ? price - (price * discountPercentage) / 100
    : price.toFixed(2);
}

function setProductPriceSpan(isDiscounted, discountedPrice, price) {
  if (isDiscounted) {
    return `<span class="original-price" style="text-decoration: line-through; color: gray;">$${price.toFixed(
      2
    )}</span> 
          <span class="discounted-price" style="color: red;">$${discountedPrice}</span>`;
  } else {
    return `<span class="discounted-price" style="color: gray;">$${price}</span>`;
  }
}
function toggleCart() {
  const cartModal = document.getElementById("cartModal");
  if (cartModal.style.right === "0px") {
    cartModal.style.right = "-400px"; // Hide cart
  } else {
    cartModal.style.right = "0px"; // Show cart
  }
}

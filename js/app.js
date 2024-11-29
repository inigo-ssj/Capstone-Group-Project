let products = null;
let categories = [];
let discountCategoryCount = {};

const discountPercentage = 20;
const categoryDiscountCount = 3;
const productsContainer = document.getElementById("products-container");
const featuredContainer = document.getElementById("featured-products");
const dealsContainer = document.getElementById("deals-products");

fetch("js/product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;

    products.map((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
        discountCategoryCount[product.category] = 0;
      }
    });

    renderShopProducts();
  });

function randomBoolean() {
  return Math.floor(Math.random() * 2) == 0;
}

function renderShopProducts(filter = "all") {
  productsContainer.innerHTML = "";

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  filteredProducts.forEach((product) => {
    if (
      discountCategoryCount[product.category] < categoryDiscountCount &&
      randomBoolean()
    ) {
      discountCategoryCount[product.category] =
        discountCategoryCount[product.category] + 1;
      product.isDiscounted = true;
    }
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });

  setTimeout(addCartToHTML, 3000);
  setTimeout(updateWishlistCount, 3000);
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  let discountedPrice = setProductPrice(product.price, product.isDiscounted);
  let priceSpan = setProductPriceSpan(
    product.isDiscounted,
    discountedPrice,
    product.price
  );
  productCard.innerHTML = `
        <a href="./product-page.html?id=${product.id}">
          <div class="frame">
            <img src="${product.image}" alt="${product.name}" class="product-image" />
          </div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">$${product.price}</p>
          </a>
      <div>
          <button class="add-to-cart" onclick="addToCart(${product.id})">
          <img src="Resources/icons/addtocart-black.png" alt="Add to Cart Icon" />
          </button>
          <button class="add-to-wishlist" id = "" onclick="addToWishlist(${product.id})">
          <img src="Resources/icons/fav-black.png" alt="Favorite Icon" />
          </button>
      </div>
  `;
  return productCard;
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

function setProductPrice(price, isDiscounted) {
  return isDiscounted
    ? price - (price * discountPercentage) / 100
    : price.toFixed(2);
}

function filterByCategory(category) {
  renderShopProducts(category);
}

function sortProducts() {
  const sortValue = document.getElementById("sortDropdown").value;

  switch (sortValue) {
    case "priceLowHigh":
      products.sort((a, b) => a.price - b.price);
      break;
    case "priceHighLow":
      products.sort((a, b) => b.price - a.price);
      break;
    case "popularity":
      products.sort((a, b) => b.popularity - a.popularity);
      break;
    default:
      products.sort((a, b) => a.id - b.id); // Default sorting
  }

  renderShopProducts(category);
}

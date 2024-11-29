let products = null;
let discountCategoryCount = {};
let categories = [];

const categoryDiscountCount = 3;
const discountPercentage = 20; // 20% discount

fetch("js/product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    const pageScreen = window.location.pathname;
    products.map((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
        discountCategoryCount[product.category] = 0;
      }
    });

    const featuredProducts = getOnePerCategory(products, categories);
    const dealsProducts = categories.map(
      (category) =>
        products
          .filter(
            (product) =>
              product.category === category &&
              !featuredProducts.some((featured) => featured.id === product.id)
          )
          .sort((a, b) => b.popularity - a.popularity)[0]
    );

    setProductDiscount();
    if (pageScreen.includes("product-page.html")) {
      setProductDetails();
    } else {
      renderProducts("featured-products", featuredProducts);
      renderDealsProducts("deals-products", dealsProducts); // New function for deals
      setTimeout(addCartToHTML, 3000);
      setTimeout(updateWishlistCount, 3000);
    }
  });

function setProductDiscount(filter = "all") {
  products.forEach((product) => {
    if (
      discountCategoryCount[product.category] < categoryDiscountCount &&
      randomBoolean()
    ) {
      discountCategoryCount[product.category] =
        discountCategoryCount[product.category] + 1;
      product.isDiscounted = true;
    }
  });
}

function randomBoolean() {
  return Math.floor(Math.random() * 2) == 0;
}

function renderProducts(containerId, selectedProducts) {
  const container = document.getElementById(containerId);
  container.innerHTML = selectedProducts
    .map(
      (product) => `
      <div class="product-card">
        <a href="product-page.html">
          <img src="${product.image}" alt="${
        product.name
      }" class="product-image" />
        </a>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          <img src="Resources/icons/addtocart-black.png" alt="Add to Cart Icon" />
        </button>
        <button class="add-to-wishlist" id = "" onclick="addToWishlist(${
          product.id
        })">
          <img src="Resources/icons/fav-black.png" alt="Favorite Icon" />
        </button>
      </div>
    `
    )
    .join("");
}

function renderDealsProducts(containerId, dealsProducts) {
  const container = document.getElementById(containerId);
  container.innerHTML = dealsProducts
    .map((product) => {
      const discountedPrice = (
        product.price -
        (product.price * discountPercentage) / 100
      ).toFixed(2);
      return `
      <div class="product-card">
        <img src="${product.image}" alt="${
        product.name
      }" class="product-image" />
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">
          <span class="original-price" style="text-decoration: line-through; color: gray;">$${product.price.toFixed(
            2
          )}</span> 
          <span class="discounted-price" style="color: red;">$${discountedPrice}</span>
        </p>
         <button class="add-to-cart" onclick="addToCart(${product.id})">
          <img src="Resources/icons/addtocart-black.png" alt="Add to Cart Icon" />
        </button>
        <button class="add-to-wishlist" id = "" onclick="addToWishlist(${
          product.id
        })">
          <img src="Resources/icons/fav-black.png" alt="Favorite Icon" />
        </button>
      </div>
    `;
    })
    .join("");
}

function getOnePerCategory(products, categories) {
  return categories.map((category) =>
    products.find((product) => product.category === category)
  );
}

let products = null;
const categories = ["cap", "dress", "jacket", "shorts", "pants", "tshirts"];
const discountPercentage = 20; // 20% discount

fetch("js/product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;

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

    renderProducts("featured-products", featuredProducts);
    renderDealsProducts("deals-products", dealsProducts); // New function for deals
    setTimeout(addCartToHTML, 3000);
    setTimeout(updateWishlistCount, 3000);
  });

function renderProducts(containerId, selectedProducts) {
  const container = document.getElementById(containerId);
  container.innerHTML = selectedProducts
    .map(
      (product) => `
      <div class="product-card">
        <img src="${product.image}" alt="${
        product.name
      }" class="product-image" />
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <a href="shop.html" class="view-product-btn">View More</a>
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
        <a href="shop.html" class="view-product-btn">View More</a>
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

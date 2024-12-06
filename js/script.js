function initHomePage() {
  if (pagePath.includes("product-page.html")) {
    setProductDetails();
  } else {
    if (pagePath.includes("index.html")) {
      renderHomeProducts("featured-products", todayFeatured);
      renderHomeProducts("deals-products", todayDeals); // New function for deals
    }
    setTimeout(addCartToHTML, 3000);
    setTimeout(updateWishlistCount, 3000);
    setTimeout(displayWishlistItems, 3000);
  }
}

function renderHomeProducts(containerId, productList) {
  const container = document.getElementById(containerId);
  container.innerHTML = productList
    .map((product) => {
      const discountedPrice = setProductPrice(
        product.price,
        product.isDiscounted
      );
      const priceSpan = setProductPriceSpan(
        product.isDiscounted,
        discountedPrice,
        product.price
      );
      return `
      <div class="product-card">
        <a href="./product-page.html?id=${product.id}">
          <div class="frame">
            <img src="${product.image}" alt="${product.name}" class="product-image" />
          </div>
          <h3 class="product-name">${product.name}</h3>
          ${priceSpan}
          </a>
      <div>
          <button class="add-to-cart" onclick="addToCart(${product.id})">
          <img src="Resources/icons/addtocart-black.png" alt="Add to Cart Icon" />
          </button>
          <button class="add-to-wishlist" id="wishlist${product.id}" onclick="addToWishlist(${product.id})">
          <img src="Resources/icons/fav-black.png" alt="Favorite Icon" />
          </button>
      </div>
      </div>
    `;
    })
    .join("");
}

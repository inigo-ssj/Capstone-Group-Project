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
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">
        ${priceSpan}
        </p>
         <button class="add-to-cart" onclick="addToCart(${product.id})">
          <img src="Resources/icons/addtocart-black.png" alt="Add to Cart Icon" />
        </button>
         <button class="add-to-wishlist" id="wishlist${product.id}" onclick="addToWishlist(${product.id})">
          <img src="Resources/icons/fav-black.png" alt="Favorite Icon" />
          </button>
      </div>
    `;
    })
    .join("");
}

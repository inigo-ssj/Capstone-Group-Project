// Get the product ID from the URL query string
function setProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Find the product by ID
  const product = products.find((product) => product.id == productId);

  if (product) {
    let discountedPrice = setProductPrice(product.price, product.isDiscounted);
    let priceSpan = setProductPriceSpan(
      product.isDiscounted,
      discountedPrice,
      product.price
    );
    // Populate product details on the page
    document.getElementById("product-page-image").src = product.image;
    document.getElementById("product-title").textContent = product.name;
    document.getElementById("product-description").textContent =
      product.description;
    document.getElementById("product-price").innerHTML = priceSpan;
    document.getElementById("product-details-list").innerHTML = product.details
      .map((detail) => `<li>${detail}</li>`)
      .join("");

    // Hook up the Add to Cart button
    document.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCart(product.id); // Use the existing global function
    });

    document.querySelector(".buy-now").addEventListener("click", () => {
      const quantity = document.getElementById("quantity").value;
      window.open(
        "cart-checkout.html?product_id=" + product.id + "&quantity=" + quantity,
        "_self"
      ); // Use the existing global function
    });

    // Hook up the Add to Wishlist button
    const wishlistButton = document.querySelector(".add-to-wishlist");
    wishlistButton.id = `wishlist${product.id}`; // Assign the correct ID
    wishlistButton.addEventListener("click", () => {
      addToWishlist(product.id); // Use the existing global function
    });

    // Update wishlist icon based on the current state
    updateWishlistIcon(product.id, wishlistButton);
  } else {
    // If the product doesn't exist, show an error or redirect
    document.querySelector(".product-container").innerHTML =
      "<h2>Product not found</h2>";
  }
}

// Update wishlist icon based on whether the product is in the wishlist
function updateWishlistIcon(productId, button) {
  const productImg = button.querySelector("img");
  if (wishlist.includes(productId)) {
    productImg.src = "Resources/icons/fav-black-toggled.png"; // Already in wishlist
  } else {
    productImg.src = "Resources/icons/fav-black.png"; // Not in wishlist
  }
}

// Zoom effect for the product image
document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.querySelector(".product-page-image");
  const productImage = imageContainer.querySelector("#product-page-image");

  imageContainer.addEventListener("mousemove", (e) => {
    const rect = imageContainer.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X relative to the container
    const y = e.clientY - rect.top; // Mouse Y relative to the container

    const xPercent = (x / rect.width) * 100; // Convert to percentage
    const yPercent = (y / rect.height) * 100;

    // Update the transform origin to zoom towards the mouse pointer
    productImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    productImage.style.transform = "scale(2)"; // Scale the image
  });

  // Reset zoom on mouse leave
  imageContainer.addEventListener("mouseleave", () => {
    productImage.style.transformOrigin = "center center"; // Reset origin
    productImage.style.transform = "scale(1)"; // Reset scale
  });
});

//to follow

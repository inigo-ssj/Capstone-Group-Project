let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function updateWishlistCount() {
  const wishlistCountElement = document.getElementById("wishlistCount");
  wishlistCountElement.textContent = wishlist.length;
  disableWishList();
}

function addToWishlist(productId) {
  const productBtn = document.getElementById("wishlist" + productId);
  const productImg = productBtn.querySelector("img");

  // Check if the product is already in the wishlist
  if (!wishlist.includes(productId)) {
    // Add to wishlist
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Save to localStorage

    // Change the image to show "added to wishlist" state
    if (productImg) {
      productImg.src = "Resources/icons/fav-black-toggled.png";
    }
  } else {
    // Remove from wishlist
    wishlist = wishlist.filter((id) => id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Update localStorage

    // Revert the image to the original state
    if (productImg) {
      productImg.src = "Resources/icons/fav-black.png";
    }
  }

  // Update wishlist count and displayed items
  updateWishlistCount();
  displayWishlistItems();
}

function disableWishList(productId = null) {
  let productBtn = null;
  if (productId != null) {
    productBtn = document.getElementById("wishlist" + productId);
    productBtn.disabled = false;
  } else {
    wishlist.forEach((listProdId) => {
      const product = products.find((p) => p.id === listProdId);
      if (product) {
        productBtn = document.getElementById("wishlist" + product.id);
        if (typeof productBtn !== "undefined" && productBtn !== null) {
          productBtn.disabled = false;
        }
      }
    });
  }
}

function toggleWishlist() {
  const modal = document.getElementById("wishlistModal");
  if (modal.style.right === "0px") {
    modal.style.right = "-400px"; // Hide modal
  } else {
    modal.style.right = "0px"; // Show modal
    displayWishlistItems(); // Populate items when showing
  }
}

function displayWishlistItems() {
  const wishlistItemsContainer = document.getElementById("wishlistItems");
  wishlistItemsContainer.innerHTML = ""; // Clear previous items

  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML = "<p>Your wishlist is empty.</p>";
  } else {
    wishlist.forEach((productId) => {
      const product = products.find((p) => p.id === productId); // Assuming products is your product list
      if (product) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("wishlist-item");
        itemDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <span>${product.name}</span>
                <button class="remove-button" onclick='removeFromWishlist(${productId})'>Remove</button>
            `;
        wishlistItemsContainer.appendChild(itemDiv);
        disableWishList(product.id);
      }
    });
  }
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter((id) => id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Update localStorage

  const productBtn = document.getElementById("wishlist" + productId);
  const productImg = productBtn.querySelector("img");
  productBtn.disabled = false;
  productImg.src = "Resources/icons/fav-black.png";

  updateWishlistCount();
  displayWishlistItems(); // Refresh displayed items
}

// Load wishlist from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
  if (savedWishlist) {
    wishlist = savedWishlist;
  }
});

// ---------------------------------------------------------------------------
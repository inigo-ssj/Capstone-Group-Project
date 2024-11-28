let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function updateWishlistCount() {
  const wishlistCountElement = document.getElementById("wishlistCount");
  wishlistCountElement.textContent = wishlist.length;
  disableWishList();
}

function addToWishlist(productId) {
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Save to localStorage
    disableWishList(productId);
    updateWishlistCount();
    displayWishlistItems();
  }
}

function disableWishList(productId = null) {
  let productBtn = null;
    if(productId != null) {
      productBtn = document.getElementById("wishlist" + productId);
      productBtn.disabled = true;
      productBtn.style.background = "grey";
    } else {
      wishlist.forEach((listProdId) => {
        const product = products.find((p) => p.id === listProdId); 
        if (product) {
          productBtn = document.getElementById("wishlist" + product.id);
          if(typeof productBtn !== "undefined" && productBtn !== null) {
            productBtn.disabled = true;
            productBtn.style.background = "grey";
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
  productBtn.disabled = false;
  productBtn.style.background = "linear-gradient(45deg, #ff5772, #e64a19)";
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

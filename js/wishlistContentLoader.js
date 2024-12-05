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
    if (productBtn) {
      const productImg = productBtn.querySelector("img");
      if (productImg) {
        productImg.src = "Resources/icons/fav-black-toggled.png";
      }
    }
  } else {
    wishlist.forEach((listProdId) => {
      const product = products.find((p) => p.id === listProdId);
      if (product) {
        productBtn = document.getElementById("wishlist" + product.id);
        if (typeof productBtn !== "undefined" && productBtn !== null) {
          const productImg = productBtn.querySelector("img");
          if (productImg) {
            productImg.src = "Resources/icons/fav-black-toggled.png";
          }
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
        let discountedPrice = setProductPrice(
          product.price,
          product.isDiscounted
        );
        let priceSpan = setProductPriceSpan(
          product.isDiscounted,
          discountedPrice,
          product.price
        );
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("wishlist-item");
        itemDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="content"> <div>${product.name}</div>  ${priceSpan} </div> 
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
  enableWishListBtn(productId);
  updateWishlistCount();
  displayWishlistItems(); // Refresh displayed items
}

function enableWishListBtn(productId) {
  const productBtn = document.getElementById("wishlist" + productId);
  if (productBtn) {
    const productImg = productBtn.querySelector("img");
    productImg.src = "Resources/icons/fav-black.png";
  }
}

// Load wishlist from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
  if (savedWishlist) {
    wishlist = savedWishlist;
  }
});

// ---------------------------------------------------------------------------

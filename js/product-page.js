// Fetch product data
fetch("js/product.json")
  .then((response) => response.json())
  .then((products) => {
    // Get the product ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Find the product by ID
    const product = products.find((product) => product.id == productId);

    if (product) {
      // Populate the product details on the page
      document.getElementById("product-page-image").src = product.image;
      document.getElementById("product-title").textContent = product.name;
      document.getElementById("product-description").textContent =
        product.description;
      document.getElementById(
        "product-price"
      ).textContent = `$${product.price}`;
      document.getElementById("product-details-list").innerHTML =
        product.details.map((detail) => `<li>${detail}</li>`).join("");

      const addToCartButton = document.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => addToCart(product.id));
    } else {
      // If the product doesn't exist, show an error or redirect
      document.querySelector(".product-container").innerHTML =
        "<h2>Product not found</h2>";
    }
  })
  .catch((error) => console.error("Error fetching product data:", error));

// -------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
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

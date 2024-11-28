let products = null;

// Fetch products data
fetch("js/product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id")); // Get the product ID from the URL

    // Find the selected product
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (selectedProduct) {
      displayProductDetails(selectedProduct);
    } else {
      console.error("Product not found");
      document.querySelector(".container").innerHTML =
        "<p>Product not found.</p>";
    }
  });

function displayProductDetails(product) {
  // Populate the HTML with the selected product's details
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-title").textContent = product.name;
  document.getElementById("product-description").textContent =
    product.description;
  document.getElementById(
    "product-price"
  ).textContent = `$${product.price.toFixed(2)}`;

  // Populate size options (if applicable)
  const sizeSelect = document.getElementById("size");
  const sizes = ["S", "M", "L", "XL"]; // Example sizes
  sizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });

  // Populate additional details
  const detailsList = document.getElementById("details-list");
  product.details.forEach((detail) => {
    const listItem = document.createElement("li");
    listItem.textContent = detail;
    detailsList.appendChild(listItem);
  });
}

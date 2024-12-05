let products = null;
let todayDeals = [];
let todayFeatured = [];
let categories = [];
let discountCategoryCount = {};
let featuredCategoryCount = {};
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const discountPercentage = 20;
const categoryDiscountCount = 3;
const featuredCategoryLimit = 1;
const pagePath = window.location.pathname;

checkProduct();
if (products == null) {
  fetch("js/product.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;

      renderCategory();
      setProductDiscount();
      var expDate = new Date();
      expDate.setTime(expDate.getTime() + 24 * 3600 * 1000);

      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("todayFeatured", JSON.stringify(todayFeatured));
      localStorage.setItem("todayDeals", JSON.stringify(todayDeals));

      localStorage.setItem("productExpDate", expDate.getTime());
      renderInitPage();
    });
} else {
  renderInitPage();
}

function viewPageProduct(productId) {
  window.open("product-page.html?id=" + productId, "_self");
}
function updateWishlistCount() {
  const wishlistCountElement = document.getElementById("wishlistCount");
  wishlistCountElement.textContent = wishlist.length;
}

function renderCategory() {
  products.map((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
      discountCategoryCount[product.category] = 0;
      featuredCategoryCount[product.category] = 0;
    }
  });
}

function renderInitPage() {
  renderCategory();
  if (pagePath.includes("shop.html")) {
    renderShopProducts();
  } else if (!pagePath.includes("cart-checkout.html")) {
    initHomePage();
  }
}

function checkProduct() {
  var productValue = JSON.parse(localStorage.getItem("products")) || [];
  todayDeals = JSON.parse(localStorage.getItem("todayDeals")) || [];
  todayFeatured = JSON.parse(localStorage.getItem("todayFeatured")) || [];
  var productExpDate =
    JSON.parse(localStorage.getItem("productExpDate")) || null;
  var dateNow = new Date();
  dateNow = dateNow.getTime();
  if (
    productValue.length > 0 &&
    productExpDate != null &&
    dateNow <= productExpDate
  ) {
    products = productValue;
  } else {
    products = null;
    todayDeals = [];
    todayFeatured = [];
  }
}

function randomBoolean() {
  return Math.floor(Math.random() * 2) == 0;
}

function setProductDiscount() {
  products.forEach((product) => {
    if (
      discountCategoryCount[product.category] < categoryDiscountCount &&
      randomBoolean()
    ) {
      discountCategoryCount[product.category] =
        discountCategoryCount[product.category] + 1;
      product.isDiscounted = true;
      if (todayDeals.length < 6) {
        todayDeals.push(product);
      }
    }

    if (
      featuredCategoryCount[product.category] < featuredCategoryLimit &&
      randomBoolean() &&
      !product.isDiscounted
    ) {
      featuredCategoryCount[product.category] =
        featuredCategoryCount[product.category] + 1;
      todayFeatured.push(product);
    }
  });
}

//added

const allProductsUL = document.getElementById("all-products-grid");

const addProductToCart = async (event) => {
  if (event.target.tagName !== "BUTTON") {
    return;
  }
  const itemsCounterElements = document.querySelectorAll(".items-counter");
  let response;
  const productId = event.target.dataset.productid;
  const csrfToken = event.target.dataset.csrf;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId,
        _csrf: csrfToken,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    alert("Please check your connection and try again!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong.");
    return;
  }
  const responseData = await response.json();
  itemsCounterElements.forEach((itemsCounter) => {
    itemsCounter.textContent = responseData.totalItems;
    if (itemsCounter.textContent > 0) {
      itemsCounter.classList.add("open");
    }
  });
};

allProductsUL.addEventListener("click", addProductToCart);

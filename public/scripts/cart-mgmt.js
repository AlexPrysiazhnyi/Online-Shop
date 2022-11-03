const addToCartBtn = document.querySelector(".add-cart-btn");
const itemsCounter = document.querySelector(".items-counter");

const addProductToCart = async () => {
  let response;
  const productId = addToCartBtn.dataset.productid;
  const csrfToken = addToCartBtn.dataset.csrf;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId,
        _csrf: csrfToken
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
  itemsCounter.textContent = responseData.totalItems;

  console.log(responseData);
};

addToCartBtn.addEventListener("click", addProductToCart);

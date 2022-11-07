const mainHTMLEl = document.getElementById("cart-main");
const updateItemForms = document.querySelectorAll(".cart-item-mgmt form");
const itemsCounterElements = document.querySelectorAll(".items-counter");
const totalCartPriceEl = document.querySelector("#cart-total p");

const updateItemInCart = async (event) => {
  event.preventDefault();
  const submittedForm = event.target;
  const productId = submittedForm.dataset.productid;
  const csrfToken = submittedForm.dataset.csrf;
  const updatedQuantity = +submittedForm.firstElementChild.value;
  const totalItemsPriceEl =
    submittedForm.parentElement.previousElementSibling.children[1];
  let response;

  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({ productId, updatedQuantity, _csrf: csrfToken }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    alert("Request failed! Please check your connection and try again.");
  }

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();
  itemsCounterElements.forEach((itemsCounter) => {
    itemsCounter.textContent = responseData.totalItems;
  });

  totalCartPriceEl.textContent = `Total: \$${responseData.totalPrice.toFixed(
    2
  )}`;

  if (responseData.updatedCartItemPrice) {
    totalItemsPriceEl.textContent = `\$${responseData.updatedCartItemPrice.toFixed(
      2
    )}`;
  }

  if (updatedQuantity <= 0) {
    submittedForm.closest("li").remove();
  }
  itemsCounterElements.forEach((itemsCounter) => {
    if (itemsCounter.textContent <= 0) {
      mainHTMLEl.innerHTML = "<h1>Your Cart is Empty!</h1>";
      itemsCounter.classList.remove("open");
    }
  });
};

for (const form of updateItemForms) {
  form.addEventListener("submit", updateItemInCart);
}

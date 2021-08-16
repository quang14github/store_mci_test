const products = [];
for (let i = 0; i < localStorage.length; i++) {
  id = localStorage.key(i);
  const product = JSON.parse(localStorage.getItem(id));
  if (product.status === "cart") products.push(product);
}
var container = document.querySelector(".orders");
const totalCost = document.querySelector(".checkout__totalCost__value");
products.forEach((element) => {
  // create DOM element for order
  const order = document.createElement("div");
  order.classList = "order";
  const orderImg = document.createElement("img");
  orderImg.src = element.img;
  orderImg.classList = "order__img";
  const orderName = document.createElement("h1");
  orderName.innerHTML = element.name;
  orderName.classList = "order__name";
  const orderPrice = document.createElement("p");
  orderPrice.innerHTML = `${element.price}`;
  orderPrice.classList = "order__price";
  const orderQuantity = document.createElement("input");
  orderQuantity.classList = "order__quantity";
  orderQuantity.type = "number";
  orderQuantity.min = "1";
  orderQuantity.max = "99";
  orderQuantity.value = element.quantity;
  const orderCost = document.createElement("p");
  orderCost.classList = "order__cost";
  orderCost.innerHTML = `${element.quantity * element.price}`;
  totalCost.innerHTML =
    parseInt(orderCost.innerHTML) +
    parseInt(totalCost.innerHTML ? totalCost.innerHTML : "0");
  function validQuantityInput(quantityInput) {
    if (!parseInt(quantityInput.value)) {
      alert("Invalid input");
      quantityInput.value = 1;
    } else if (parseInt(quantityInput.value) > 99) quantityInput.value = 99;
    else if (parseInt(quantityInput.value) < 1) quantityInput.value = 1;
    totalCost.innerHTML -= orderCost.innerHTML;
    orderCost.innerHTML = orderPrice.innerHTML * quantityInput.value;
    totalCost.innerHTML =
      parseInt(orderCost.innerHTML) + parseInt(totalCost.innerHTML);
    localStorage.setItem(
      `${element.id}`,
      JSON.stringify({ ...element, quantity: `${quantityInput.value}` })
    );
  }
  orderQuantity.addEventListener("input", () => {
    validQuantityInput(orderQuantity);
  });
  orderQuantity.addEventListener("keyup", () => {
    validQuantityInput(orderQuantity);
  });
  const orderRemove = document.createElement("p");
  orderRemove.classList = "order__remove";
  orderRemove.innerHTML = "Remove";
  orderRemove.addEventListener("click", () => {
    container.removeChild(order);
    localStorage.removeItem(`${element.id}`);
    totalCost.innerHTML -= orderCost.innerHTML;
  });
  order.appendChild(orderImg);
  order.appendChild(orderName);
  order.appendChild(orderPrice);
  order.appendChild(orderQuantity);
  order.appendChild(orderCost);
  order.appendChild(orderRemove);
  container.appendChild(order);
});

// checkout
const checkoutBtn = document.querySelector(".checkout__button");
const checkoutModal = document.querySelector(".modal");
checkoutBtn.addEventListener("click", () => {
  if (products.length) checkoutModal.classList.remove("hide");
});
const modalSubmit = document.querySelector(".modal__form__submit");
const modalClose = document.querySelector(".modal__close");
window.onclick = (e) => {
  if (e.target == modalClose) checkoutModal.classList.add("hide");
};
const modalForm = document.querySelector(".modal__form");
modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
modalSubmit.addEventListener("click", () => {
  alert("Successfully checkout!");
  const orders = document.querySelectorAll(".order");
  orders.forEach((element) => {
    container.removeChild(element);
  });
  products.forEach((element) => {
    localStorage.setItem(
      element.id,
      JSON.stringify({ ...element, status: "checkout" })
    );
  });
  while (products.length > 0) products.pop();
  totalCost.innerHTML = 0;
  checkoutModal.classList.add("hide");
});

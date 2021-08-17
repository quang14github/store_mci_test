const products = [];
const currentAccount = localStorage.getItem("currentAccount");
if (currentAccount) {
  const user = JSON.parse(localStorage.getItem(currentAccount));
  const cart = user.cart;
  cart.forEach((e) => {
    if (parseInt(e.quantity.cart) > 0) products.push(e);
  });
  var container = document.querySelector(".orders");
  const totalCost = document.querySelector(".checkout__totalCost__value");
  products.forEach((element) => {
    const productIndex = cart.findIndex((e) => e.id == element.id);
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
    orderQuantity.value = element.quantity.cart;
    const orderCost = document.createElement("p");
    orderCost.classList = "order__cost";
    orderCost.innerHTML = `${element.quantity.cart * element.price}`;
    totalCost.innerHTML =
      parseInt(orderCost.innerHTML) +
      parseInt(totalCost.innerHTML ? totalCost.innerHTML : "0");
    // valid input function
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
      cart[productIndex].quantity.cart = quantityInput.value;
      localStorage.setItem(
        currentAccount,
        JSON.stringify({ ...user, cart: cart })
      );
    }
    // add event when input change
    orderQuantity.addEventListener("input", () => {
      validQuantityInput(orderQuantity);
    });
    orderQuantity.addEventListener("keyup", () => {
      validQuantityInput(orderQuantity);
    });

    // remove button
    const orderRemove = document.createElement("p");
    orderRemove.classList = "order__remove";
    orderRemove.innerHTML = "Remove";
    orderRemove.addEventListener("click", () => {
      container.removeChild(order);
      cart[productIndex].quantity.cart = "0";
      localStorage.setItem(
        currentAccount,
        JSON.stringify({ ...user, cart: cart })
      );
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
    const userAddress = document.getElementById("address");
    if (userAddress.value) {
      alert("Successfully checkout!");
      const orders = document.querySelectorAll(".order");
      orders.forEach((element) => {
        container.removeChild(element);
      });
      products.forEach((element) => {
        const productIndex = cart.findIndex((e) => e.id == element.id);
        if (!cart[productIndex].quantity.checkout)
          cart[productIndex].quantity.checkout = "0";
        cart[productIndex].quantity.checkout =
          parseInt(cart[productIndex].quantity.checkout) +
          parseInt(cart[productIndex].quantity.cart);
        cart[productIndex].quantity.cart = "0";
      });
      localStorage.setItem(
        currentAccount,
        JSON.stringify({ ...user, cart: cart })
      );
      totalCost.innerHTML = 0;
      checkoutModal.classList.add("hide");
      while (products.length > 0) products.pop();
    }
  });
}

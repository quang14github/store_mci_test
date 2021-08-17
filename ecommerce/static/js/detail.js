const currentAccount = localStorage.getItem("currentAccount");
var product = {};
product.img = document.querySelector(".product__img").src;
product.name = document.querySelector(".product__info__name").innerHTML;
product.price = document.querySelector(".product__info__price").innerHTML;
quantityInput = document.querySelector(".product__quantity");
function validQuantityInput() {
  if (!parseInt(quantityInput.value)) {
    alert("Invalid input");
    quantityInput.value = 1;
  } else if (parseInt(quantityInput.value) > 99) quantityInput.value = 99;
  else if (parseInt(quantityInput.value) < 1) quantityInput.value = 1;
}
quantityInput.addEventListener("input", validQuantityInput);
quantityInput.addEventListener("keyup", validQuantityInput);
product.quantity = {};
product.id = document.querySelector(".product__id").innerHTML;
var button = document.querySelector(".submit");
button.addEventListener("click", () => {
  if (currentAccount) {
    product.quantity.cart = document.querySelector(".product__quantity").value;
    let currQuantity;
    const user = JSON.parse(localStorage.getItem(currentAccount));
    const cart = user.cart;
    const currentProduct = cart.findIndex((e) => e.id == product.id);
    if (currentProduct != -1) {
      currQuantity = cart[currentProduct].quantity.cart;
      cart[currentProduct].quantity.cart =
        parseInt(currQuantity) + parseInt(product.quantity.cart);
      product.quantity.cart = cart[currentProduct].quantity.cart;
    } else {
      cart.push(product);
    }
    localStorage.setItem(
      currentAccount,
      JSON.stringify({ ...user, cart: cart })
    );
    alert(`You have ${product.quantity.cart} ${product.name} in cart`);
  } else {
    alert("You need to sign in!");
    window.location.assign("http://localhost:8000/profile/");
  }
});

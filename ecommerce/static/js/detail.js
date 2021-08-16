var product = {};
product.img = document.querySelector(".product__img").src;
product.name = document.querySelector(".product__info__name").innerHTML;
product.price = document
  .querySelector(".product__info__price")
  .innerHTML;
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
product.id = document.querySelector(".product__id").innerHTML;
product.status = "cart";
var button = document.querySelector(".submit");
button.addEventListener("click", () => {
  product.quantity = document.querySelector(".product__quantity").value;
  let currQuantity;
  if (localStorage.getItem(`${product.id}`)) {
    currQuantity = JSON.parse(localStorage.getItem(`${product.id}`)).quantity;
    product.quantity = parseInt(currQuantity) + parseInt(product.quantity);
  }
  localStorage.setItem(`${product.id}`, JSON.stringify(product));
  alert(`You have ${product.quantity} ${product.name} in cart`);
});

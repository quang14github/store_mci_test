const profile = document.querySelector(".profile");
const authentication = document.querySelector(".authentication");
const toSignUp = document.querySelector(".toSignUp");
const title = document.querySelector(".title");
const signUpForm = document.querySelector(".signUp__form");
const signInForm = document.querySelector(".signIn__form");
const su_name = document.getElementById("su_userName");
const su_password = document.getElementById("su_password");
const su_submit = document.querySelector(".signUp__form__submit");
const si_name = document.getElementById("si_userName");
const si_password = document.getElementById("si_password");
const si_submit = document.querySelector(".signIn__form__submit");
const userName = document.querySelector(".userName");
function initProfile() {
  authentication.classList.add("hide");
  document.getElementsByTagName("BODY")[0].style.backgroundImage = "url('')";
  userName.innerHTML = localStorage.getItem("currentAccount");
  const currentAccount = localStorage.getItem("currentAccount");
  const user = JSON.parse(localStorage.getItem(currentAccount));
  const cart = user.cart;
  let products = [];
  cart.forEach((e) => {
    if (parseInt(e.quantity.checkout)) products.push(e);
  });
  var container = document.querySelector(".orders");
  container.innerHTML = "";
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
    const orderQuantity = document.createElement("p");
    orderQuantity.classList = "order__quantity";
    orderQuantity.innerHTML = element.quantity.checkout;
    const orderCost = document.createElement("p");
    orderCost.classList = "order__cost";
    orderCost.innerHTML = `${element.quantity.checkout * element.price}`;
    order.appendChild(orderImg);
    order.appendChild(orderName);
    order.appendChild(orderQuantity);
    order.appendChild(orderCost);
    container.appendChild(order);
  });
  profile.classList.remove("hide");
}
if (localStorage.getItem("currentAccount")) initProfile();
// signin
si_submit.addEventListener("click", () => {
  if (si_name.value && si_password.value) {
    const user = localStorage.getItem(si_name.value);
    if (user && JSON.parse(user).pass == si_password.value) {
      localStorage.setItem("currentAccount", si_name.value);
      alert("Sign in successfully!");
      initProfile();
    } else {
      alert("Wrong user name or password! Please try again");
    }
  } else {
    alert("Please fill all informations!");
  }
});

// signup
toSignUp.addEventListener("click", () => {
  title.innerHTML = "Sign Up";
  signInForm.classList.add("hide");
  signUpForm.classList.remove("hide");
});
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
su_submit.addEventListener("click", () => {
  if (su_name.value && su_password.value) {
    if (!localStorage.getItem(su_name.value)) {
      localStorage.setItem(
        su_name.value,
        JSON.stringify({ pass: su_password.value, cart: [] })
      );
      alert("Sign up successfully!");
      localStorage.setItem("currentAccount", su_name.value);
      initProfile();
    } else {
      alert("User name has been used! Please choose another");
    }
  } else {
    alert("Please fill all informations!");
  }
});
//logout
const logOut = document.querySelector(".logOut");
logOut.addEventListener("click", () => {
  localStorage.setItem("currentAccount", "");
  document.getElementsByTagName("BODY")[0].style.backgroundImage =
    "url('../static/media/profile.png')";
  profile.classList.add("hide");
  authentication.classList.remove("hide");
});

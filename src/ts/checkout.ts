import { displayCounter } from "./functions.ts/cartFunctions";
import { ProductsInCart } from "./models/ProductsInCart";

let listFromLocalStorage: ProductsInCart[] = [];
listFromLocalStorage = JSON.parse(localStorage.getItem("product") || "[]");
let emptyBasket = document.getElementById("empty-basket") as HTMLDivElement;

if(listFromLocalStorage.length == 0){
  emptyBasket.style.display = "block";
}
else{
  emptyBasket.style.display = "none";
}

let sum: number = 0;

function displayPaymentGateway() {
  let sumAmount = 0;
  for (let i = 0; i < listFromLocalStorage.length; i++) {
    sumAmount +=
      listFromLocalStorage[i].product.price * listFromLocalStorage[i].amount;
  }

  let checkoutContainer: HTMLDivElement = document.createElement("div");
  let checkoutForm: HTMLFormElement = document.createElement("form");
  let labelFname: HTMLLabelElement = document.createElement("label");
  let inputFname: HTMLInputElement = document.createElement("input");
  let labelLname: HTMLLabelElement = document.createElement("label");
  let inputLname: HTMLInputElement = document.createElement("input");
  let labelCc: HTMLLabelElement = document.createElement("label");
  let inputCc: HTMLInputElement = document.createElement("input");
  let labelCcv: HTMLLabelElement = document.createElement("label");
  let inputCcv: HTMLInputElement = document.createElement("input");
  let labelSubmit: HTMLLabelElement = document.createElement("label");
  let submitButton: HTMLInputElement = document.createElement("input");

  checkoutContainer.classList.add("checkout");
  labelFname.classList.add("fname-text");
  inputFname.classList.add("fname");
  labelLname.classList.add("lname-text");
  inputLname.classList.add("lname");
  labelCc.classList.add("cc-text");
  inputCc.classList.add("cc");
  labelCcv.classList.add("ccv-text");
  inputCcv.classList.add("ccv");
  labelSubmit.classList.add("submit-text");
  submitButton.classList.add("purchase-button");

  /* label setAttributes */
  labelFname.setAttribute("for", "fname");
  labelLname.setAttribute("for", "lname");
  labelCc.setAttribute("for", "cc");
  labelCcv.setAttribute("for", "ccv");
  labelSubmit.setAttribute("for", "submit");

  /* label innerText */
  labelFname.innerText = "First name:";
  labelLname.innerText = "Last name:";
  labelCc.innerText = "CC:";
  labelCcv.innerText = "CCV:";
  labelSubmit.innerText = "Total belopp: " + sumAmount.toString() + "kr";

  /* input setAttributes */
  inputFname.setAttribute("type", "text");
  inputFname.setAttribute("name", "fname");
  inputFname.setAttribute("placeholder", "Jhon");
  inputFname.setAttribute("required", "");

  inputLname.setAttribute("type", "text");
  inputLname.setAttribute("name", "lname");
  inputLname.setAttribute("placeholder", "Doe");
  inputLname.setAttribute("required", "");

  inputCc.setAttribute("type", "number");
  inputCc.setAttribute("name", "cc");
  inputCc.setAttribute("placeholder", "xxxx xxxx xxxx xxxx");
  inputCc.setAttribute("required", "");

  inputCcv.setAttribute("type", "number");
  inputCcv.setAttribute("name", "ccv");
  inputCcv.setAttribute("placeholder", "xxx");
  inputCcv.setAttribute("required", "");

  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("name", "submit");
  submitButton.setAttribute("value", "Betala");

  checkoutForm.setAttribute("onsubmit", "return false");

  checkoutContainer.appendChild(checkoutForm);
  checkoutForm.appendChild(labelFname);
  checkoutForm.appendChild(inputFname);
  checkoutForm.appendChild(labelLname);
  checkoutForm.appendChild(inputLname);
  checkoutForm.appendChild(labelCc);
  checkoutForm.appendChild(inputCc);
  checkoutForm.appendChild(labelCcv);
  checkoutForm.appendChild(inputCcv);
  checkoutForm.appendChild(labelSubmit);
  checkoutForm.appendChild(submitButton);

  (document.querySelector(".content") as HTMLElement).appendChild(
    checkoutContainer
  );

  if (checkoutForm.addEventListener) {
    checkoutForm.addEventListener("submit", callback, false); //Modern browsers
  } else if (checkoutForm.attachEvent) {
    checkoutForm.attachEvent("onsubmit", callback); //Old IE
  }

  function callback() {
    setTimeout(function () {
      let alertContainer: HTMLDivElement = document.createElement("div");
      let alertMsg: HTMLParagraphElement = document.createElement("p");

      alertContainer.classList.add("alert-container");
      alertMsg.classList.add("alert-msg");

      alertMsg.innerText = "Köpet har genomförts!";

      alertContainer.appendChild(alertMsg);

      (document.querySelector(".content") as HTMLElement).appendChild(
        alertContainer
      );
      setTimeout(function () {
        window.localStorage.clear();
        window.location.reload();
      }, 5000);
    }, 500);
  }
}

function displayProductsInCart() {
  let listFromLocalStorage = JSON.parse(
    localStorage.getItem("product") || "[]"
  );
  listFromLocalStorage = listFromLocalStorage.map((product: ProductsInCart) => {
    return new ProductsInCart(product.amount, product.product);
  });

  console.log(listFromLocalStorage);

  (document.querySelector(".productsContainer") as HTMLElement).innerHTML = "";

  for (let i = 0; i < listFromLocalStorage.length; i++) {
    let productInCartContainer: HTMLDivElement = document.createElement("div");
    let productInCartTitle: HTMLHeadingElement = document.createElement("h3");
    let productInCartImage: HTMLImageElement = document.createElement("img");
    let productInCartPrice: HTMLParagraphElement = document.createElement("h5");
    let productInCartButtonMinus: HTMLButtonElement =
      document.createElement("button");
    let amountOfProductsText: HTMLSpanElement = document.createElement("span");
    let productInCartButtonPlus: HTMLButtonElement =
      document.createElement("button");
    let productInCartButtonContainer: HTMLDivElement =
      document.createElement("div");
    sum += listFromLocalStorage[i].product.price;

    productInCartButtonMinus.textContent = "-";
    productInCartButtonPlus.textContent = "+";

    productInCartContainer.classList.add("productInCartCheckout");
    productInCartTitle.classList.add("productInCartCheckout__title");
    productInCartImage.classList.add("productInCartCheckout__image");
    productInCartPrice.classList.add("productInCartCheckout__price");
    amountOfProductsText.classList.add("productInCartCheckout__amount");
    productInCartButtonMinus.classList.add("productInCartButton__minus");
    productInCartButtonPlus.classList.add("productInCartButton__plus");
    productInCartButtonContainer.classList.add(
      "productInCartButtonContainerCheckout"
    );

    productInCartImage.src = listFromLocalStorage[i].product.image;
    productInCartImage.alt = listFromLocalStorage[i].product.name;

    productInCartTitle.innerHTML = listFromLocalStorage[i].product.name;
    productInCartPrice.innerHTML =
      listFromLocalStorage[i].product.price.toString() + " kr";
    amountOfProductsText.innerHTML = listFromLocalStorage[i].amount.toString();

    productInCartContainer.appendChild(productInCartTitle);
    productInCartContainer.appendChild(productInCartImage);
    productInCartContainer.appendChild(productInCartPrice);
    productInCartContainer.appendChild(productInCartButtonContainer);
    productInCartButtonContainer.appendChild(productInCartButtonMinus);
    productInCartButtonContainer.appendChild(amountOfProductsText);
    productInCartButtonContainer.appendChild(productInCartButtonPlus);

    (document.querySelector(".productsContainer") as HTMLElement).appendChild(
      productInCartContainer
    );

    productInCartButtonPlus.addEventListener("click", () => {
      console.log("You clicked on + ");

      listFromLocalStorage[i].amount++;
      localStorage.setItem("product", JSON.stringify(listFromLocalStorage));
      displayProductsInCart();

      // addToCart(listFromLocalStorage[i].product);
      //increaseQuantityByOne(listFromLocalStorage[i].product);
    });

    productInCartButtonMinus.addEventListener("click", () => {
      console.log("You clicked on - ");
      listFromLocalStorage[i].amount--;
      localStorage.setItem("product", JSON.stringify(listFromLocalStorage));
      if (listFromLocalStorage[i].amount === 0) {
        let index = listFromLocalStorage.indexOf(listFromLocalStorage[i]); // gör en variabel av listpositioonen som jag vill radera.
        listFromLocalStorage.splice(index, 1); // ta bort produkten ur varukorgen om amount blir noll..
        let savedCart = JSON.stringify(listFromLocalStorage); // gör en variabel av listan jag vill skicka upp till localstorage.
        localStorage.setItem("product", savedCart); //uppdaterar localstorage med den nya listan
      }
      displayProductsInCart();
    });
  }
  displayCounter();
}

function displayProductsSum() {
  let sumAmount = 0;
  for (let i = 0; i < listFromLocalStorage.length; i++) {
    sumAmount +=
      listFromLocalStorage[i].product.price * listFromLocalStorage[i].amount;
  }

  let productTotalText: HTMLParagraphElement = document.createElement("p");

  productTotalText.classList.add("productTotalText");

  productTotalText.innerHTML = "Totalbelopp: " + sumAmount + "kr";

  (document.querySelector(".purchase-button") as HTMLElement).appendChild(
    productTotalText
  );
}
displayProductsInCart();
displayPaymentGateway();
displayCounter();
displayProductsSum();

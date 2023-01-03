import { ChristmasBauble } from "./models/ChristmasBauble";
import { ProductsInCart } from "./models/ProductsInCart";
import { displayCounter } from "./functions.ts/cartFunctions";
// import { addToCart, listToLocalStorage } from "./products";
import { addToCart } from "../ts/functions.ts/cartFunctions";

let listFromLocalStorage: ProductsInCart[] = [];
listFromLocalStorage = JSON.parse(localStorage.getItem("product") || "[]");
let sum: number = 0;
let amountOfProducts: number = 1;

function displayProductsInCart() {
  let listFromLocalStorage = JSON.parse(
    localStorage.getItem("product") || "[]"
  );
  listFromLocalStorage = listFromLocalStorage.map((product: ProductsInCart) => {
    return new ProductsInCart(product.amount, product.product);
  });

  console.log(listFromLocalStorage);

  (document.querySelector("main") as HTMLElement).innerHTML = "";

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

    productInCartContainer.classList.add("productInCart");
    productInCartTitle.classList.add("productInCart__title");
    productInCartImage.classList.add("productInCart__image");
    productInCartPrice.classList.add("productInCart__price");
    amountOfProductsText.classList.add("productInCart__amount");
    productInCartButtonMinus.classList.add("productInCart__buttonMinus");
    productInCartButtonPlus.classList.add("productInCart__buttonPlus");
    productInCartButtonContainer.classList.add("productInCartButtonContainer");

    productInCartImage.src = listFromLocalStorage[i].product.image;
    productInCartImage.alt = listFromLocalStorage[i].product.name;

    productInCartTitle.innerHTML = listFromLocalStorage[i].product.name;
    productInCartPrice.innerHTML =
      listFromLocalStorage[i].product.price.toString() + " kr";
    amountOfProductsText.innerHTML = listFromLocalStorage[i].amount.toString(); // det jag vill sätta som innerhtml måste vara positionen av produktens amount
    // och eftersom listan renderas om/ laddas om , följer amount med i loopen.

    productInCartContainer.appendChild(productInCartTitle);
    productInCartContainer.appendChild(productInCartImage);
    productInCartContainer.appendChild(productInCartPrice);
    productInCartContainer.appendChild(productInCartButtonContainer);
    productInCartButtonContainer.appendChild(productInCartButtonMinus);
    productInCartButtonContainer.appendChild(amountOfProductsText);
    productInCartButtonContainer.appendChild(productInCartButtonPlus);

    (document.querySelector("main") as HTMLElement).appendChild(
      productInCartContainer
    );
    (document.querySelector(".shoppingCartPage") as HTMLElement).appendChild(
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

      // subtractFromCart(listFromLocalStorage[i]);
      //increaseQuantityByOne(listFromLocalStorage[i].product);
    });
  }
}

function displayProductsSum() {
  let sumAmount = 0;
  for (let i = 0; i < listFromLocalStorage.length; i++) {
    sumAmount +=
      listFromLocalStorage[i].product.price * listFromLocalStorage[i].amount;
  }

  let productsTotalContainer: HTMLDivElement = document.createElement("div");
  let productTotalText: HTMLHeadingElement = document.createElement("h3");

  productsTotalContainer.classList.add("productsTotalContainer");
  productTotalText.classList.add("productTotalText");

  productTotalText.innerHTML = "Totalbelopp: " + sumAmount + "kr";
  console.log("Detta skall vara totalbelopp" + sumAmount);

  productsTotalContainer.appendChild(productTotalText);

  (document.querySelector("main") as HTMLElement).appendChild(
    productsTotalContainer
  );
}

function displayClearCartButton() {
  let productsClearContainer: HTMLDivElement = document.createElement("div");
  let productInCartButtonClear: HTMLButtonElement =
    document.createElement("button");

  productsClearContainer.classList.add("productsClearContainer");
  productInCartButtonClear.classList.add("productInCartButton__clear");

  productInCartButtonClear.textContent = "Rensa varukorg";

  productsClearContainer.appendChild(productInCartButtonClear);

  (document.querySelector("main") as HTMLElement).appendChild(
    productsClearContainer
  );

  productInCartButtonClear.addEventListener("click", () => {
    window.localStorage.clear();
    window.location.reload();
  });
}

function displayToCheckout() {
  let productToCheckoutButton: HTMLButtonElement =
    document.createElement("button");

  productToCheckoutButton.classList.add("productToCheckoutButton");

  productToCheckoutButton.textContent = "Till kassa";

  (
    document.querySelector(".productsClearContainer") as HTMLElement
  ).appendChild(productToCheckoutButton);

  productToCheckoutButton.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
}

// displayProductsInCart(listFromLocalStorage);
displayProductsInCart();
displayProductsSum();
displayCounter();
displayClearCartButton();
displayToCheckout();
console.log("This is the total: ", sum);

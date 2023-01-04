import { ChristmasBauble } from "../models/ChristmasBauble";
import { ProductsInCart } from "../models/ProductsInCart";

export function displayCounter() {
  let listFromLocalStorage: ProductsInCart[] = [];
  listFromLocalStorage = JSON.parse(localStorage.getItem("product") || "[]");
  let productCounter: HTMLParagraphElement = document.createElement("p");
  let sum = 0;

  for (let i = 0; i < listFromLocalStorage.length; i++) {
    sum += listFromLocalStorage[i].amount;
    console.log(listFromLocalStorage[i].amount);
  }

  productCounter.textContent = sum.toString();
  let counterContainer: HTMLDivElement = document.createElement("div");

  counterContainer.classList.add("counter");

  counterContainer.appendChild(productCounter);

  (document.querySelector(".phone-nav") as HTMLElement).appendChild(
    counterContainer
  );
}

export function addToCart(product: ChristmasBauble) {
  //hämta listan från LS här istälet för högst upp i filen
  let listToLocalStorage: ProductsInCart[] = [];
  listToLocalStorage = JSON.parse(localStorage.getItem("product") || "[]");

  let itemToCart: ProductsInCart = new ProductsInCart(1, product);
  let found = false;

  if (listToLocalStorage.length === 0) {
    found = false;
  } else {
    for (let i = 0; i < listToLocalStorage.length; i++) {
      if (listToLocalStorage[i].product.id === itemToCart.product.id) {
        listToLocalStorage[i].amount++;
        localStorage.setItem("product", JSON.stringify(listToLocalStorage));
        console.log("den finns i listan");
        found = true;
        return;
      }
    }
  }

  if (found === false) {
    console.log("hittar inte id");
    listToLocalStorage.push(itemToCart);
    localStorage.setItem("product", JSON.stringify(listToLocalStorage));
  }
}

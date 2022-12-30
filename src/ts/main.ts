import { ProductsInCart } from "./models/ProductsInCart";

export let listFromLocalStorage: ProductsInCart[] = [];
listFromLocalStorage = JSON.parse(localStorage.getItem("product") || "[]");
let productCounter: HTMLParagraphElement = document.createElement("p");

export function displayCounter() {
  let sum = 0;
  
  for (let i = 0; i < listFromLocalStorage.length; i++){
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
displayCounter();

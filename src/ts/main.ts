import { ChristmasBauble } from "./models/ChristmasBauble";

export let listFromLocalStorage: ChristmasBauble[] = [];

export function displayCounter() {
  listFromLocalStorage = JSON.parse(localStorage.getItem("product") || "[]");

  let counterContainer: HTMLDivElement = document.createElement("div");
  let productCounter: HTMLParagraphElement = document.createElement("p");

  productCounter.textContent = listFromLocalStorage.length.toString();

  counterContainer.classList.add("counter");

  counterContainer.appendChild(productCounter);

  (document.querySelector(".phone-nav") as HTMLElement).appendChild(
    counterContainer
  );
}
displayCounter();

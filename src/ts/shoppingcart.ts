import { ChristmasBauble } from "./models/ChristmasBauble";

let listFromLocalStorage: ChristmasBauble[] = [];
let sum: number = 0;

function displayProductsInCart() {
  listFromLocalStorage = JSON.parse(localStorage.getItem("product") || "[]");
  listFromLocalStorage = listFromLocalStorage.map(
    (product: ChristmasBauble) => {
      return new ChristmasBauble(product.name, product.image, product.price);
    }
  );

  console.log(listFromLocalStorage);
  for (let i = 0; i < listFromLocalStorage.length; i++) {
    let productInCartContainer: HTMLDivElement = document.createElement("div");
    let productInCartTitle: HTMLHeadingElement = document.createElement("h3");
    let productInCartImage: HTMLImageElement = document.createElement("img");
    let productInCartPrice: HTMLParagraphElement = document.createElement("h5");
    let productInCartButtonMinus: HTMLButtonElement = document.createElement("button");
    let productInCartButtonPlus: HTMLButtonElement = document.createElement("button");
    let productInCartButtonContainer: HTMLDivElement = document.createElement("div");
    sum += listFromLocalStorage[i].price;

    productInCartButtonMinus.textContent = '-';
    productInCartButtonPlus.textContent = '+';

    productInCartContainer.classList.add("productInCart");
    productInCartTitle.classList.add("productInCart__title");
    productInCartImage.classList.add("productInCart__image");
    productInCartPrice.classList.add("productInCart__price");
    productInCartButtonMinus.classList.add("productInCartButton__minus");
    productInCartButtonPlus.classList.add("productInCartButton__plus");
    productInCartButtonContainer.classList.add("productInCartButtonContainer");

    productInCartImage.src = listFromLocalStorage[i].image;
    productInCartImage.alt = listFromLocalStorage[i].name;

    productInCartTitle.innerHTML = listFromLocalStorage[i].name;
    productInCartPrice.innerHTML =
      listFromLocalStorage[i].price.toString() + " kr";

    productInCartContainer.appendChild(productInCartTitle);
    productInCartContainer.appendChild(productInCartImage);
    productInCartContainer.appendChild(productInCartPrice);
    productInCartContainer.appendChild(productInCartButtonContainer);
    productInCartButtonContainer.appendChild(productInCartButtonMinus);
    productInCartButtonContainer.appendChild(productInCartButtonPlus);

    (document.querySelector("main") as HTMLElement).appendChild(
      productInCartContainer
    );

  }
}

function displayProductsSum(){
  let productsTotalContainer: HTMLDivElement = document.createElement("div");
  let productTotalText: HTMLHeadingElement = document.createElement("h3");

  productsTotalContainer.classList.add("productsTotalContainer");
  productTotalText.classList.add("productTotalText");

  productTotalText.innerHTML = "Totalbelopp: " + sum + "kr";

  productsTotalContainer.appendChild(productTotalText);

  (document.querySelector("main") as HTMLElement).appendChild(
    productsTotalContainer
  );
}
displayProductsInCart();
displayProductsSum();
console.log("This is the total: ", sum);
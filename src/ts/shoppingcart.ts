import { ChristmasBauble } from "./models/ChristmasBauble";
import { listToLocalStorage } from "./products";

let listFromLocalStorage: ChristmasBauble[] = [];
let sum: number = 0;
let amountOfProducts: number = 1;

function displayProductsInCart() {
  listFromLocalStorage = JSON.parse(localStorage.getItem("product") || "[]");
  listFromLocalStorage = listFromLocalStorage.map(
    (product: ChristmasBauble) => {
      return new ChristmasBauble(product.name, product.image, product.price);
    }
  );

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
    sum += listFromLocalStorage[i].price;

    productInCartButtonMinus.textContent = "-";
    productInCartButtonPlus.textContent = "+";

    productInCartContainer.classList.add("productInCart");
    productInCartTitle.classList.add("productInCart__title");
    productInCartImage.classList.add("productInCart__image");
    productInCartPrice.classList.add("productInCart__price");
    amountOfProductsText.classList.add("productInCart__amount");
    productInCartButtonMinus.classList.add("productInCartButton__minus");
    productInCartButtonPlus.classList.add("productInCartButton__plus");
    productInCartButtonContainer.classList.add("productInCartButtonContainer");

    productInCartImage.src = listFromLocalStorage[i].image;
    productInCartImage.alt = listFromLocalStorage[i].name;

    productInCartTitle.innerHTML = listFromLocalStorage[i].name;
    productInCartPrice.innerHTML =
      listFromLocalStorage[i].price.toString() + " kr";
    amountOfProductsText.innerHTML = amountOfProducts.toString();

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

    //håller på med funktion för att ändra antalet av en viss produkt i varukorgen
    productInCartButtonPlus.addEventListener("click", () => {
      let currentAmountOfProducts = parseInt(amountOfProductsText.innerHTML);
      let addedAmount = currentAmountOfProducts + 1;
      amountOfProductsText.innerHTML = addedAmount.toString();

      listFromLocalStorage = JSON.parse(
        localStorage.getItem("product") || "[]"
      );
      listFromLocalStorage.push(listFromLocalStorage[i]);
      localStorage.setItem("product", JSON.stringify(listFromLocalStorage));
    });
  }

  // displayProductsSum(); //kanske ska anropa funktionen här (eller i eventlistener?) för att den ska uppdatera totala summan varje gång man skapar html.
  //kanske antingen behöver tömma displayproducts diven varje ggn om den ska ligga här.
}

function displayProductsSum() {
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

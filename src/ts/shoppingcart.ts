import { ChristmasBauble } from "./models/ChristmasBauble";

let listFromLocalStorage: ChristmasBauble[] = [];

function displayProductsInCart() {
  listFromLocalStorage = JSON.parse(
    localStorage.getItem("product") || "[]"
  );
  listFromLocalStorage = listFromLocalStorage.map(
    (product: ChristmasBauble) => {
      return new ChristmasBauble(
        product.name,
        product.image,
        product.price
      );
    }
  );

  console.log(listFromLocalStorage);
  for (let i = 0; i < listFromLocalStorage.length; i++) {
    let productInCartContainer: HTMLDivElement =
      document.createElement("div");
    let productInCartTitle: HTMLHeadingElement =
      document.createElement("h3");
    let productInCartImage: HTMLImageElement =
      document.createElement("img");
    let productInCartPrice: HTMLParagraphElement =
      document.createElement("h5");

    productInCartContainer.classList.add("productInCart");
    productInCartTitle.classList.add("productInCart__title");
    productInCartImage.classList.add("productInCart__image");
    productInCartPrice.classList.add("productInCart__price");

    productInCartImage.src = listFromLocalStorage[i].image;
    productInCartImage.alt = listFromLocalStorage[i].name;

    productInCartTitle.innerHTML = listFromLocalStorage[i].name;
    productInCartPrice.innerHTML =
      listFromLocalStorage[i].price.toString() + " kr";

    productInCartContainer.appendChild(productInCartTitle);
    productInCartContainer.appendChild(productInCartImage);
    productInCartContainer.appendChild(productInCartPrice);

    (document.querySelector("main") as HTMLElement).appendChild(
      productInCartContainer
    );
  }
}

displayProductsInCart();

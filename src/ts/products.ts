import { ChristmasBauble } from "./models/ChristmasBauble";
import { productItems } from "./models/productItems";

function displayProducts(productItems: ChristmasBauble[]) {
  for (let i = 0; i < productItems.length; i++) {
    let productContainer: HTMLDivElement = document.createElement("div");
    let productTitle: HTMLHeadingElement = document.createElement("h3");
    let productImage: HTMLImageElement = document.createElement("img");
    let productPrice: HTMLParagraphElement = document.createElement("h5");

    productContainer.classList.add("product");
    productTitle.classList.add("product__title");
    productImage.classList.add("product__image");
    productPrice.classList.add("product__price");

    productImage.src = productItems[i].image;
    productImage.alt = productItems[i].name;

    productTitle.innerHTML = productItems[i].name;
    productPrice.innerHTML = productItems[i].price.toString() + " kr";

    productContainer.appendChild(productImage);
    productContainer.appendChild(productTitle);
    productContainer.appendChild(productPrice);

    (document.querySelector("main") as HTMLElement).appendChild(
      productContainer
    );
  }
}

displayProducts(productItems);

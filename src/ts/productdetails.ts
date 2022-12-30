import { ChristmasBauble } from "./models/ChristmasBauble";
import { productItems } from "./models/productItems";
// import { displayCounter } from "./main";
import { ProductsInCart } from "./models/ProductsInCart";
import { addToCart } from "./products";

const assortmentDetailContainer: HTMLDivElement = document.createElement("div");
const assortmentDetailHeading: HTMLHeadingElement =
  document.createElement("h2");
const assortmentDetailInfoText: HTMLParagraphElement =
  document.createElement("p");
const assortmentAmount: HTMLParagraphElement = document.createElement("h5");

assortmentDetailHeading.innerHTML = "Julgranskula";
assortmentDetailInfoText.innerHTML =
  "Handmålad julkula i glas. Band eller snöre ingår ej.";
assortmentAmount.innerHTML =
  "Visar " + productItems.length.toString() + " produkter";

assortmentDetailContainer.classList.add("assortment");
assortmentDetailHeading.classList.add("assortment__heading");
assortmentDetailInfoText.classList.add("assortment__info");
assortmentAmount.classList.add("assortment__amount");

assortmentDetailContainer.appendChild(assortmentDetailHeading);
assortmentDetailContainer.appendChild(assortmentDetailInfoText);
assortmentDetailContainer.appendChild(assortmentAmount);

(document.querySelector("main") as HTMLElement).appendChild(
  assortmentDetailContainer
);

function displayProductdetails() {
  let productContainer: HTMLDivElement = document.createElement("div");
  let productTitle: HTMLHeadingElement = document.createElement("h5");
  let productImage: HTMLImageElement = document.createElement("img");
  let productPrice: HTMLParagraphElement = document.createElement("h5");
  let productButton: HTMLButtonElement = document.createElement("button");

  productContainer.classList.add("product");
  productTitle.classList.add("product__title");
  productImage.classList.add("product__image");
  productPrice.classList.add("product__price");
  productButton.classList.add("product__buttonAddToCart");

  productImage.src = productItems[0].image;
  productImage.alt = productItems[0].name;

  productTitle.innerHTML = productItems[0].name;
  productPrice.innerHTML = productItems[0].price.toString() + " kr";
  productButton.innerHTML = "Lägg i varukorg";

  productContainer.appendChild(productImage);
  productContainer.appendChild(productTitle);
  productContainer.appendChild(productPrice);
  productContainer.appendChild(productButton);

  (document.querySelector("main") as HTMLElement).appendChild(productContainer);
}

displayProductdetails();

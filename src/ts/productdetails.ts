import { ChristmasBauble } from "./models/ChristmasBauble";
import { productItems } from "./models/productItems";
// import { displayCounter } from "./main";
import { ProductsInCart } from "./models/ProductsInCart";
import { addToCart } from "./products";

export function displayProductdetails() {
  let productDetailContainer: HTMLDivElement =
    document.createElement("div");
  let productDetailTitle: HTMLHeadingElement =
    document.createElement("h5");
  let productDetailImage: HTMLImageElement =
    document.createElement("img");
  let productDescribtion: HTMLParagraphElement =
    document.createElement("p");
  let productDetailPrice: HTMLParagraphElement =
    document.createElement("h5");
  let productDetailButton: HTMLButtonElement =
    document.createElement("button");

  productDetailContainer.classList.add("productdetail");
  productDetailTitle.classList.add("productdetail__title");
  productDetailImage.classList.add("productdetail__image");
  productDescribtion.classList.add("productdetail__paragraph");
  productDetailPrice.classList.add("productdetail__price");
  productDetailButton.classList.add("productdetail__buttonAddToCart");

  productDetailImage.src = productItems[0].image;
  productDetailImage.alt = productItems[0].name;

  productDescribtion.innerText = productItems[0].description;
  productDetailTitle.innerHTML = productItems[0].name;
  productDetailPrice.innerHTML =
    productItems[0].price.toString() + " kr";
  productDetailButton.innerHTML = "Lägg i varukorg";

  productDetailContainer.appendChild(productDetailImage);
  productDetailContainer.appendChild(productDetailTitle);
  productDetailContainer.appendChild(productDescribtion);
  productDetailContainer.appendChild(productDetailPrice);
  productDetailContainer.appendChild(productDetailButton);

  (document.querySelector("main") as HTMLElement).appendChild(
    productDetailContainer
  );
}
displayProductdetails();

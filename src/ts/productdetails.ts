import { ChristmasBauble } from "./models/ChristmasBauble";
import { productItems } from "./models/productItems";
// import { displayCounter } from "./main";
import { ProductsInCart } from "./models/ProductsInCart";
import { addToCart } from "./products";

export function displayProductdetails() {
  let url = window.location.search;
  let usp = new URLSearchParams(url);
  let id = usp.get("id");
  let newId = `${id}`; // nu är newId värdet för id=, dvs endast själva sökordet och inte hela URL:en.

  for (let i = 0; i < productItems.length; i++) {
    if (productItems[i].id.toString() === newId) {
      let containerOfImg: HTMLDivElement =
        document.createElement("div");
      let containerOfInfo: HTMLDivElement =
        document.createElement("div");
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
      productDetailButton.classList.add(
        "productdetail__buttonAddToCart"
      );
      containerOfImg.classList.add("productdetail__containerOfImg");
      containerOfInfo.classList.add("productdetail__containerOfInfo");

      productDetailImage.src = productItems[i].image;
      productDetailImage.alt = productItems[i].name;

      productDescribtion.innerText = productItems[i].description;
      productDetailTitle.innerHTML = productItems[i].name;
      productDetailPrice.innerHTML =
        productItems[i].price.toString() + " kr";
      productDetailButton.innerHTML = "Lägg i varukorg";

      productDetailContainer.appendChild(containerOfImg);
      containerOfImg.appendChild(productDetailImage);
      productDetailContainer.appendChild(containerOfInfo);
      containerOfInfo.appendChild(productDetailTitle);
      containerOfInfo.appendChild(productDescribtion);
      containerOfInfo.appendChild(productDetailPrice);
      containerOfInfo.appendChild(productDetailButton);

      (document.querySelector("main") as HTMLElement).appendChild(
        productDetailContainer
      );
    }
  }
}
displayProductdetails();

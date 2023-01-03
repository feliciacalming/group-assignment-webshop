import { ChristmasBauble } from "./models/ChristmasBauble";
import { productItems } from "./models/productItems";
import {
  displayCounter,
  listFromLocalStorage,
} from "./functions.ts/cartFunctions";
import { ProductsInCart } from "./models/ProductsInCart";
import { addToCart } from "../ts/functions.ts/cartFunctions";

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

      productDetailContainer.classList.add("productdetail");
      productDetailTitle.classList.add("productdetail__title");
      productDetailImage.classList.add("productdetail__image");
      productDescribtion.classList.add("productdetail__paragraph");
      productDetailPrice.classList.add("productdetail__price");

      containerOfImg.classList.add("productdetail__containerOfImg");
      containerOfInfo.classList.add("productdetail__containerOfInfo");

      productDetailImage.src = productItems[i].image;
      productDetailImage.alt = productItems[i].name;

      productDescribtion.innerText = productItems[i].description;
      productDetailTitle.innerHTML = productItems[i].name;

      productDetailContainer.appendChild(containerOfImg);
      containerOfImg.appendChild(productDetailImage);
      productDetailContainer.appendChild(containerOfInfo);
      containerOfInfo.appendChild(productDetailTitle);
      containerOfInfo.appendChild(productDescribtion);
      containerOfInfo.appendChild(productDetailPrice);

      (document.querySelector("main") as HTMLElement).appendChild(
        productDetailContainer
      );
      let productInCartButtonPlus: HTMLButtonElement =
        document.createElement("button");

      productInCartButtonPlus.addEventListener("click", () => {
        console.log("You clicked on + ");
        addToCart(productItems[i]);
      });

      for (let i = 0; i < listFromLocalStorage.length; i++) {
        let containerOfButtons: HTMLDivElement =
          document.createElement("div");
        let productInCartButtonMinus: HTMLButtonElement =
          document.createElement("button");
        let productDetailButton: HTMLButtonElement =
          document.createElement("button");
        let amountOfProductsText: HTMLSpanElement =
          document.createElement("span");
        productDetailButton.classList.add(
          "productdetail__buttonAddToCart"
        );

        productInCartButtonMinus.addEventListener("click", () => {
          console.log("You clicked on - ");
          listFromLocalStorage[i].amount--;
          localStorage.setItem(
            "product",
            JSON.stringify(listFromLocalStorage)
          );
          if (listFromLocalStorage[i].amount === 0) {
            let index = listFromLocalStorage.indexOf(
              listFromLocalStorage[i]
            ); // gör en variabel av listpositioonen som jag vill radera.
            listFromLocalStorage.splice(index, 1); // ta bort produkten ur varukorgen om amount blir noll..
            let savedCart = JSON.stringify(listFromLocalStorage); // gör en variabel av listan jag vill skicka upp till localstorage.
            localStorage.setItem("product", savedCart); //uppdaterar localstorage med den nya listan
          }
        });
        containerOfButtons.classList.add(
          "productdetail__containerOfButtons"
        );
        productInCartButtonMinus.textContent = "-";
        productInCartButtonPlus.textContent = "+";
        productDetailButton.innerHTML = "Lägg i varukorg";

        containerOfInfo.appendChild(productInCartButtonMinus);
        containerOfInfo.appendChild(amountOfProductsText);
        containerOfInfo.appendChild(productInCartButtonPlus);
        amountOfProductsText.classList.add("productTotalText");
        containerOfButtons.appendChild(productInCartButtonMinus);
        containerOfButtons.appendChild(amountOfProductsText);
        containerOfButtons.appendChild(productInCartButtonPlus);
        amountOfProductsText.innerHTML =
          listFromLocalStorage[i].amount.toString();
        productDetailButton.appendChild(containerOfButtons);
        containerOfInfo.appendChild(productDetailButton);
        productDetailContainer.appendChild(containerOfButtons);
        containerOfInfo.appendChild(containerOfButtons);
      }
    }
  }
}
displayProductdetails();

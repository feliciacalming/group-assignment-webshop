import { ChristmasBauble } from "./models/ChristmasBauble";
import { productItems } from "./models/productItems";
import { displayCounter } from "./main";
import { ProductsInCart } from "./models/ProductsInCart";

export let listToLocalStorage: ProductsInCart[] = [];

const assortmentContainer: HTMLDivElement = document.createElement("div");
const assortmentHeading: HTMLHeadingElement = document.createElement("h2");
const assortmentInfoText: HTMLParagraphElement = document.createElement("p");
const assortmentAmount: HTMLParagraphElement = document.createElement("h5");

assortmentHeading.innerHTML = "Julgranskulor";
assortmentInfoText.innerHTML =
  "Alla våra fantastiska julkulor är gjorda av glas av högsta kvalité. Alla produkter är munblåsta och handmålade, vilket gör varje julgranskula unik.";
assortmentAmount.innerHTML =
  "Visar " + productItems.length.toString() + " produkter";

assortmentContainer.classList.add("assortment");
assortmentHeading.classList.add("assortment__heading");
assortmentInfoText.classList.add("assortment__info");
assortmentAmount.classList.add("assortment__amount");

assortmentContainer.appendChild(assortmentHeading);
assortmentContainer.appendChild(assortmentInfoText);
assortmentContainer.appendChild(assortmentAmount);
(document.querySelector("main") as HTMLElement).appendChild(
  assortmentContainer
);

/***** Funktioner *****/

//lägger till produkterna från local storage i listan när sidan laddas om. annars börjar varukorg-countern räkna om från
//början när man lägger till en ny produkt efter att ha laddat om sidan, trots att det är flera objekt i local storage.
listToLocalStorage = JSON.parse(localStorage.getItem("product") || "[]");

function displayProducts(productItems: ChristmasBauble[]) {
  for (let i = 0; i < productItems.length; i++) {
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

    productImage.src = productItems[i].image;
    productImage.alt = productItems[i].name;

    productTitle.innerHTML = productItems[i].name;
    productPrice.innerHTML = productItems[i].price.toString() + " kr";
    productButton.innerHTML = "Lägg i varukorg";

    productContainer.appendChild(productImage);
    productContainer.appendChild(productTitle);
    productContainer.appendChild(productPrice);
    productContainer.appendChild(productButton);

    (document.querySelector("main") as HTMLElement).appendChild(
      productContainer
    );

    //Den här anonyma funktionen funkade som den ska.

    productButton.addEventListener("click", () => {
      addToCart(productItems[i]);
      // let itemToCart: ProductsInCart = new ProductsInCart(1, productItems[i]);
      // if (
      //   listToLocalStorage.find(
      //     (productItems) => productItems.product.id === itemToCart.product.id
      //   )
      // ) {
      //   //plussa på amount med 1
      //   listToLocalStorage[i].amount++;
      //   localStorage.setItem("product", JSON.stringify(listToLocalStorage));
      // } else {
      //   listToLocalStorage.push(itemToCart);
      //   localStorage.setItem("product", JSON.stringify(listToLocalStorage));
      // }

      // console.log(listToLocalStorage);
      // displayCounter();
    });
  }
}

function addToCart(product: ChristmasBauble) {
  let itemToCart: ProductsInCart = new ProductsInCart(1, product);

  if (listToLocalStorage.length > 0) {
    for (let i = 0; i < listToLocalStorage.length; i++) {
      if (product.id === listToLocalStorage[i].product.id) {
        // listToLocalStorage.find(
        //   (productss) => productss.product.id === itemToCart.product.id
        // )
        // )
        console.log(listToLocalStorage);
        listToLocalStorage[i].amount++;
        // localStorage.setItem("product", JSON.stringify(listToLocalStorage));
        // itemToCart.amount++;

        console.log("den hittade");
      } else {
        listToLocalStorage.push(itemToCart);
        localStorage.setItem("product", JSON.stringify(listToLocalStorage));
      }
    }
  } else {
    console.log("hittade ingen av samma");
    listToLocalStorage.push(itemToCart);
    localStorage.setItem("product", JSON.stringify(listToLocalStorage));
  }
}

displayCounter();
displayProducts(productItems);

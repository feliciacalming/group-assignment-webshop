import { ChristmasBauble } from "./models/ChristmasBauble";
import { productItems } from "./models/productItems";
import { displayCounter } from "./main";
import { ProductsInCart } from "./models/ProductsInCart";
import { colors, size } from "./models/filterOptions";
import { displayProductdetails } from "./productdetails";
import { toggleFilter } from "./functions.ts/filterFunctions";

const assortmentContainer: HTMLDivElement =
  document.createElement("div");
const assortmentHeading: HTMLHeadingElement =
  document.createElement("h2");
const assortmentInfoText: HTMLParagraphElement =
  document.createElement("p");
const assortmentAmount: HTMLParagraphElement =
  document.createElement("h5");
const filterButton: HTMLButtonElement =
  document.createElement("button");

// const productsOnDisplay: HTMLElement = document.createElement("section");
// productsOnDisplay.classList.add("productsOnDisplay");

assortmentHeading.innerHTML = "Julgranskulor";
assortmentInfoText.innerHTML =
  "Alla våra fantastiska julkulor är gjorda av glas av högsta kvalité. Alla produkter är munblåsta och handmålade, vilket gör varje julgranskula unik.";
assortmentAmount.innerHTML =
  "Visar " + productItems.length.toString() + " produkter";
filterButton.innerHTML = "Filter";

//eventlistener för filter
filterButton.addEventListener("click", () => {
  toggleFilter();
  displayProducts(filteredProducts);
});

assortmentContainer.classList.add("assortment");
assortmentHeading.classList.add("assortment__heading");
assortmentInfoText.classList.add("assortment__info");
assortmentAmount.classList.add("assortment__amount");
filterButton.classList.add("assortment__button");

assortmentContainer.appendChild(assortmentHeading);
assortmentContainer.appendChild(assortmentInfoText);
assortmentContainer.appendChild(assortmentAmount);
assortmentContainer.appendChild(filterButton);
(document.querySelector("main") as HTMLElement).appendChild(
  assortmentContainer
);

//Filter-rutan

/***** Funktioner *****/

function displayProducts(productItems: ChristmasBauble[]) {
  for (let i = 0; i < productItems.length; i++) {
    let productContainer: HTMLDivElement =
      document.createElement("div");
    let productTitle: HTMLHeadingElement =
      document.createElement("h5");
    let productImage: HTMLImageElement =
      document.createElement("img");
    let productPrice: HTMLParagraphElement =
      document.createElement("h5");
    let productButton: HTMLButtonElement =
      document.createElement("button");

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
    // productsOnDisplay.appendChild(productContainer);

    productContainer.addEventListener("click", () => {
      document.location.href =
        "productdetails.html?id=" + productItems[i].id;
    });

    (document.querySelector("main") as HTMLElement).appendChild(
      productContainer
    );

    productButton.addEventListener("click", () => {
      addToCart(productItems[i]);
    });
  }
}

export function addToCart(product: ChristmasBauble) {
  //hämta listan från LS här istälet för högst upp i filen
  let listToLocalStorage: ProductsInCart[] = [];
  listToLocalStorage = JSON.parse(
    localStorage.getItem("product") || "[]"
  );

  let itemToCart: ProductsInCart = new ProductsInCart(1, product);
  let found = false;

  if (listToLocalStorage.length === 0) {
    found = false;
  } else {
    for (let i = 0; i < listToLocalStorage.length; i++) {
      if (
        listToLocalStorage[i].product.id === itemToCart.product.id
      ) {
        listToLocalStorage[i].amount++;
        localStorage.setItem(
          "product",
          JSON.stringify(listToLocalStorage)
        );
        console.log("den finns i listan");
        found = true;
        return;
      }
    }
  }

  if (found === false) {
    console.log("hittar inte id");
    listToLocalStorage.push(itemToCart);
    localStorage.setItem(
      "product",
      JSON.stringify(listToLocalStorage)
    );
  }
}

//FILTER FUNKTIONER
const filterContainer = document.getElementById(
  "filter"
) as HTMLDivElement;
const filterHeading = document.getElementById(
  "filter-heading"
) as HTMLElement;
const filterTitle = document.createElement("h1");
const exitBtn = document.createElement("button");
const useFilterBtn = document.createElement("button");
const clearFilterBtn = document.createElement("button");

filterTitle.classList.add("filter__title");
exitBtn.classList.add("filter__exitButton");
useFilterBtn.classList.add("filter__filterButton");
clearFilterBtn.classList.add("filter__clearButton");

filterTitle.innerHTML = "Filter";
exitBtn.innerHTML = "X";
useFilterBtn.innerHTML = "Använd filter";
clearFilterBtn.innerHTML = "Rensa filter";

let filteredProducts: ChristmasBauble[] = [];

// Toggle för Filter-funktionen. När man klickar på X i filter-rutan får den display: none igen, och produktsidan display: block igen.
exitBtn.addEventListener("click", () => {
  toggleFilter();
});

useFilterBtn.addEventListener("click", () => {
  toggleFilter();
  displayProducts(filteredProducts);
});

filterHeading.appendChild(filterTitle);
filterHeading.appendChild(exitBtn);
filterContainer.appendChild(useFilterBtn);
filterContainer.appendChild(clearFilterBtn);

//FÄRGFILTER.

function displayColorOptions() {
  for (let i = 0; i < colors.length; i++) {
    let colorFilters: HTMLElement = document.getElementById(
      "color"
    ) as HTMLElement;
    let colorContainer: HTMLDivElement =
      document.createElement("div");
    let checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    let colorname: HTMLHeadingElement = document.createElement("h4");

    colorContainer.classList.add("color__container");
    checkbox.classList.add("color__checkbox");
    colorname.classList.add("color__name");

    colorname.innerHTML = colors[i];

    colorContainer.appendChild(checkbox);
    colorContainer.appendChild(colorname);
    colorFilters.appendChild(colorContainer);
  }
}

//STORLEKSFILTER.

function displaySizeOptions() {
  for (let i = 0; i < size.length; i++) {
    let sizeFilters: HTMLElement = document.getElementById(
      "size"
    ) as HTMLElement;
    let sizeContainer: HTMLDivElement = document.createElement("div");
    let checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    let sizeNumber: HTMLHeadingElement = document.createElement("h4");

    sizeContainer.classList.add("size__container");
    checkbox.classList.add("size__checkbox");
    sizeNumber.classList.add("size__number");

    sizeNumber.innerHTML = size[i].size.toString();

    //eventlyssnare för checkboxen

    checkbox.addEventListener("click", () => {
      if (checkbox.checked === true) {
        for (let i = 0; i < productItems.length; i++) {
          if (
            sizeNumber.innerHTML === productItems[i].size.toString()
          ) {
            filteredProducts.push(productItems[i]);

            /* Ska lägga till en knapp för "Använd filter", och när man trycker på den ska den köra toggleFilter för att stänga
             rutan samt displayProducts med filtrerade listan för att enbart visa de filtrerade produkterna på sidan */
            // toggleFilter();
            // displayProducts(filteredProducts);
          }
        }
      }
    });

    sizeContainer.appendChild(checkbox);
    sizeContainer.appendChild(sizeNumber);
    sizeFilters.appendChild(sizeContainer);
  }
}

//FILTRERINGSFUNKTION FÖR STORLEK

displayCounter();
displayProducts(productItems);
displayColorOptions();
displaySizeOptions();

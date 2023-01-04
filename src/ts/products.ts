import { ChristmasBauble } from "./models/ChristmasBauble";
import { productItems } from "./models/productItems";
import { colors, size } from "./models/filterOptions";
import { addToCart, displayCounter } from "./functions.ts/cartFunctions";
import { toggleFilter } from "./functions.ts/filterFunctions";

const assortmentContainer: HTMLDivElement = document.createElement("div");
const assortmentHeading: HTMLHeadingElement = document.createElement("h2");
const assortmentInfoText: HTMLParagraphElement = document.createElement("p");
const assortmentAmount: HTMLParagraphElement = document.createElement("h5");
const buttonContainer: HTMLDivElement = document.createElement("div");
const filterButton: HTMLButtonElement = document.createElement("button");

const productsOnDisplay: HTMLElement = document.createElement("section");

assortmentHeading.innerHTML = "Julgranskulor";
assortmentInfoText.innerHTML =
  "Alla våra fantastiska julkulor är gjorda av glas av högsta kvalité. Alla produkter är munblåsta och handmålade, vilket gör varje julgranskula unik.";
assortmentAmount.innerHTML =
  "Visar " + productItems.length.toString() + " produkter";
filterButton.innerHTML = "Filter +";

//eventlistener för filter
filterButton.addEventListener("click", () => {
  toggleFilter();
});

assortmentContainer.classList.add("assortment");
assortmentHeading.classList.add("assortment__heading");
assortmentInfoText.classList.add("assortment__info");
assortmentAmount.classList.add("assortment__amount");
filterButton.classList.add("assortment__button");
productsOnDisplay.classList.add("productsOnDisplay");
buttonContainer.classList.add("amountAndButton");

assortmentContainer.appendChild(assortmentHeading);
assortmentContainer.appendChild(assortmentInfoText);
buttonContainer.appendChild(filterButton);
buttonContainer.appendChild(assortmentAmount);
assortmentContainer.appendChild(buttonContainer);
(document.querySelector("main") as HTMLElement).appendChild(
  assortmentContainer
);

//Filter-rutan

/***** Funktioner *****/

function displayProducts(productItems: ChristmasBauble[]) {
  productsOnDisplay.innerHTML = "";

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
    productsOnDisplay.appendChild(productContainer);

    productImage.addEventListener("click", () => {
      document.location.href = "productdetails.html?id=" + productItems[i].id;
    });

    (document.querySelector("main") as HTMLElement).appendChild(
      productsOnDisplay
    );

    productButton.addEventListener("click", () => {
      addToCart(productItems[i]);
      displayCounter();
    });
  }
}

//FILTER FUNKTIONER
const filterContainer = document.getElementById("filter") as HTMLDivElement;
const filterHeading = document.getElementById("filter-heading") as HTMLElement;
const filterTitle = document.createElement("h1");
const exitBtn = document.createElement("button");
const useFilterBtn = document.createElement("button");
const clearFilterBtn = document.createElement("button");
const filterButtonsContainer = document.createElement("div");

filterTitle.classList.add("filter__title");
exitBtn.classList.add("filter__exitButton");
useFilterBtn.classList.add("filter__filterButton");
clearFilterBtn.classList.add("filter__clearButton");
filterButtonsContainer.classList.add("filter__buttonsContainer");

filterTitle.innerHTML = "Filter";
exitBtn.innerHTML = "X";
useFilterBtn.innerHTML = "Använd filter";
clearFilterBtn.innerHTML = "Rensa filter";

let filteredProducts: ChristmasBauble[] = [];

filterHeading.appendChild(filterTitle);
filterHeading.appendChild(exitBtn);
filterButtonsContainer.appendChild(useFilterBtn);
filterButtonsContainer.appendChild(clearFilterBtn);
filterContainer.appendChild(filterButtonsContainer);

// Toggle för Filter-funktionen. När man klickar på X i filter-rutan får den display: none igen, och produktsidan display: block igen.
exitBtn.addEventListener("click", () => {
  toggleFilter();
});

useFilterBtn.addEventListener("click", () => {
  toggleFilter();
  displayProducts(filteredProducts);
  assortmentAmount.innerHTML =
    "Visar " + filteredProducts.length.toString() + " produkter";
});

clearFilterBtn.addEventListener("click", () => {
  filteredProducts.splice(0, filteredProducts.length);
  toggleFilter();
  displayProducts(productItems);
});

//filtrering på färg

function displayColorOptions() {
  for (let i = 0; i < colors.length; i++) {
    let colorFilters: HTMLElement = document.getElementById(
      "color"
    ) as HTMLElement;
    let colorContainer: HTMLDivElement = document.createElement("div");
    let checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    let colorname: HTMLHeadingElement = document.createElement("h4");

    colorContainer.classList.add("color__container");
    checkbox.classList.add("color__checkbox");
    colorname.classList.add("color__name");

    colorname.innerHTML = colors[i].title;

    checkbox.addEventListener("click", () => {
      if (checkbox.checked === true) {
        for (let i = 0; i < productItems.length; i++) {
          if (
            productItems[i].color
              .toLowerCase()
              .includes(colorname.innerHTML.toLowerCase())
          ) {
            filteredProducts.push(productItems[i]);
          }
        }
      }
      if (checkbox.checked === false) {
        for (let i = 0; i < filteredProducts.length; i++) {
          if (
            filteredProducts[i].color
              .toLowerCase()
              .includes(colorname.innerHTML.toLocaleLowerCase())
          ) {
            filteredProducts.splice(i, 1);
          }
        }
      }
    });

    colorContainer.appendChild(checkbox);
    colorContainer.appendChild(colorname);
    colorFilters.appendChild(colorContainer);
  }
}

//filtrering på storlek

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
          if (sizeNumber.innerHTML === productItems[i].size.toString()) {
            filteredProducts.push(productItems[i]);
          }
        }
      }
    });

    sizeContainer.appendChild(checkbox);
    sizeContainer.appendChild(sizeNumber);
    sizeFilters.appendChild(sizeContainer);
  }
}

displayCounter();
displayProducts(productItems);
displayColorOptions();
displaySizeOptions();

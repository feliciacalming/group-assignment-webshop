import { displayCounter } from "./main";
import { ChristmasBauble } from "./models/ChristmasBauble";
import { ProductsInCart } from "./models/ProductsInCart";
import { listToLocalStorage } from "./products";

let listFromLocalStorage: ProductsInCart[] = [];
let sum: number = 0;
let amountOfProducts: number = 1;

function displayProductsInCart(){
  listFromLocalStorage = JSON.parse(
    localStorage.getItem("product") || "[]"
  );
  listFromLocalStorage = listFromLocalStorage.map(
    (product: ProductsInCart) => {
      return new ProductsInCart(product.amount, product.product);
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
    sum += listFromLocalStorage[i].product.price;

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

    productInCartImage.src = listFromLocalStorage[i].product.image;
    productInCartImage.alt = listFromLocalStorage[i].product.name;

    productInCartTitle.innerHTML =
      listFromLocalStorage[i].product.name;
    productInCartPrice.innerHTML =
      listFromLocalStorage[i].product.price.toString() + " kr";
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
    (document.querySelector(".shoppingCartPage") as HTMLElement).appendChild(
      productInCartContainer
    );

    productInCartButtonPlus.addEventListener
      ("click", () => {
        console.log("You clicked on + ");

        increaseQuantityByOne(listFromLocalStorage[i].product);
  }
}
  //håller på med funktion för att ändra antalet av en viss produkt i varukorgen
  /* productInCartButtonPlus.addEventListener("click", () => {
    let currentAmountOfProducts = parseInt(
      amountOfProductsText.innerHTML
    );
    let addedAmount = currentAmountOfProducts + 1;
    amountOfProductsText.innerHTML = addedAmount.toString();

    listFromLocalStorage = JSON.parse(
      localStorage.getItem("product") || "[]"
    );
    listFromLocalStorage.push(listFromLocalStorage[i]);
    localStorage.setItem(
      "product",
      JSON.stringify(listFromLocalStorage)
    );
  });*/

  // displayProductsSum(); //kanske ska anropa funktionen här (eller i eventlistener?) för att den ska uppdatera totala summan varje gång man skapar html.
  //kanske antingen behöver tömma displayproducts diven varje ggn om den ska ligga här.

}

// J: försöker skapa en funktion i rooten , men att tillhörande addeventlistener ligger i loopen
// skickar med den christmasBauble som kunden klickat på..
function increaseQuantityByOne(
  clickedChristmasBauble:ChristmasBauble) {
  if (listFromLocalStorage.length) {
    for (const productInCart of listFromLocalStorage) {
      if (productInCart.product.id === clickedChristmasBauble.id) {
        const newAmount = productInCart.amount + 1;
        productInCart.amount = newAmount;
        console.log(newAmount);
      }
    }
  } else {
    let itemToCart: ProductsInCart = new ProductsInCart(
      1,
      clickedChristmasBauble
    );
    listFromLocalStorage.push(itemToCart);
  }
  localStorage.setItem(
    "product",
    JSON.stringify(listFromLocalStorage)
  );
  displayProductsInCart();
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

function displayClearCartButton() {
  let productsClearContainer: HTMLDivElement = document.createElement("div");
  let productInCartButtonClear: HTMLButtonElement =
    document.createElement("button");

  productsClearContainer.classList.add("productsClearContainer");
  productInCartButtonClear.classList.add("productInCartButton__clear");

  productInCartButtonClear.textContent = "Rensa varukorg";

  productsClearContainer.appendChild(productInCartButtonClear);

  (document.querySelector("main") as HTMLElement).appendChild(
    productsClearContainer
  );

  productInCartButtonClear.addEventListener("click", () => {
    window.localStorage.clear();
    window.location.reload();
  });
}

displayProductsInCart();
displayProductsSum();
displayClearCartButton();
displayCounter();
console.log("This is the total: ", sum);

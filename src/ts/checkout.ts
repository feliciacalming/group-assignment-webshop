import { displayCounter } from "./main";

function displayPaymentGateway(){
    let checkoutContainer: HTMLDivElement = document.createElement("div");
    let checkoutForm: HTMLFormElement = document.createElement("form");
    let labelFname: HTMLLabelElement = document.createElement("label");
    let inputFname: HTMLInputElement = document.createElement("input");
    let labelLname: HTMLLabelElement = document.createElement("label");
    let inputLname: HTMLInputElement = document.createElement("input");
    let labelCc: HTMLLabelElement = document.createElement("label");
    let inputCc: HTMLInputElement = document.createElement("input");
    let labelCcv: HTMLLabelElement = document.createElement("label");
    let inputCcv: HTMLInputElement = document.createElement("input");
    let submitButton: HTMLInputElement = document.createElement("input");

    checkoutContainer.classList.add("checkout");
    labelFname.classList.add("fname-text");
    inputFname.classList.add("fname");
    labelLname.classList.add("lname-text");
    inputLname.classList.add("lname");
    labelCc.classList.add("cc-text");
    inputCc.classList.add("cc");
    labelCcv.classList.add("ccv-text");
    inputCcv.classList.add("ccv");

    /* label setAttributes */
    labelFname.setAttribute("for", "fname");
    labelLname.setAttribute("for", "lname");
    labelCc.setAttribute("for", "cc");
    labelCcv.setAttribute("for", "ccv");

    /* label innerText */
    labelFname.innerText = "First name:";
    labelLname.innerText = "Last name:";
    labelCc.innerText = "CC:";
    labelCcv.innerText = "CCV:";

    /* input setAttributes */
    inputFname.setAttribute("type", "text");
    inputFname.setAttribute("name", "fname");
    inputFname.setAttribute("placeholder", "Jhon");
    inputFname.setAttribute("required", "");
    
    inputLname.setAttribute("type", "text");
    inputLname.setAttribute("name", "lname");
    inputLname.setAttribute("placeholder", "Doe");
    inputLname.setAttribute("required", "");

    inputCc.setAttribute("type", "number");
    inputCc.setAttribute("name", "cc");
    inputCc.setAttribute("placeholder", "xxxx xxxx xxxx xxxx");
    inputCc.setAttribute("required", "");

    inputCcv.setAttribute("type", "number");
    inputCcv.setAttribute("name", "ccv");
    inputCcv.setAttribute("placeholder", "xxx");
    inputCcv.setAttribute("required", "");

    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("name", "submit");
    

    checkoutContainer.appendChild(checkoutForm);
    checkoutForm.appendChild(labelFname);
    checkoutForm.appendChild(inputFname);
    checkoutForm.appendChild(labelLname);
    checkoutForm.appendChild(inputLname);
    checkoutForm.appendChild(labelCc);
    checkoutForm.appendChild(inputCc);
    checkoutForm.appendChild(labelCcv);
    checkoutForm.appendChild(inputCcv);
    checkoutForm.appendChild(submitButton);

    (document.querySelector(".content") as HTMLElement).appendChild(
        checkoutContainer
    );
}
displayPaymentGateway();
//displayCounter();
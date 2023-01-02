export function toggleFilter() {
  let screen = window.matchMedia("(max-width: 700px)");
  if (screen.matches) {
    (document.getElementById("filter") as HTMLDivElement).classList.toggle(
      "show"
    );
    (document.getElementById("productpage") as HTMLDivElement).classList.toggle(
      "hide"
    );
  } else {
    (document.getElementById("filter") as HTMLDivElement).classList.toggle(
      "show"
    );
    (document.getElementById("filter") as HTMLDivElement).classList.toggle(
      "showDesktop"
    );
    (document.getElementById("productpage") as HTMLDivElement).classList.toggle(
      "hideDesktop"
    );
    console.log("ELSE!!!");
  }
}

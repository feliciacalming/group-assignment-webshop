export function toggleFilter() {
  (document.getElementById("filter") as HTMLDivElement).classList.toggle(
    "show"
  );
  (document.getElementById("productpage") as HTMLDivElement).classList.toggle(
    "hide"
  );
}

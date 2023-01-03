export class Sizes {
  constructor(public size: number, public found: boolean) {}
}

export class Color {
  constructor(public title: string) {}
}

export const colors: Color[] = [
  { title: "Röd" },
  { title: "Blå" },
  { title: "Rosa" },
  { title: "Grön" },
  { title: "Lila" },
];

export const size: Sizes[] = [
  { size: 8, found: false },
  { size: 12, found: false },
];

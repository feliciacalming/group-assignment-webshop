export class Sizes {
  constructor(public size: number, public found: boolean) {}
}

export const colors: string[] = ["Röd", "Blå", "Rosa", "Grön", "Lila"];
export const size: Sizes[] = [
  { size: 8, found: false },
  { size: 12, found: false },
];

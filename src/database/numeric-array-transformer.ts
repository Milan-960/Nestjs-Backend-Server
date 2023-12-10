/// ColumnNumericTransformer
export class NumericArrayTransformer {
  to(data: number[]): string[] {
    if (!data) return undefined;
    const strings: string[] = [];
    for (const entry of data) {
      strings.push(entry.toString());
    }
    return strings;
  }
  from(data: string[]): number[] {
    if (!data) return undefined;
    const numbers: number[] = [];
    for (const entry of data) {
      numbers.push(parseFloat(entry));
    }
    return numbers;
  }
}

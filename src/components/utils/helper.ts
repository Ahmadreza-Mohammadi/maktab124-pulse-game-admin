export function digitsEnToFa(input: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return input
    .toString()
    .split('')
    .map((char) => (/[0-9]/.test(char) ? persianDigits[parseInt(char, 10)] : char))
    .join('');
}

  
  export const formatPrice = (price:number) => {
    return digitsEnToFa(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

    export const categoryLabels: { [key: string]: string } = {
      game: "بازی",
      chair: "صندلی گیمینگ",
      keyboard: "کیبورد",
      headset: "هدست",
      mouse: "ماوس",
      monitor: "مانیتور",
      console: "کنسول",
    };
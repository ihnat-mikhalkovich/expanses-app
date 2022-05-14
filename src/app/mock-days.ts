import { Product } from "./product";
import { Day } from "./Day";


const PRODUCT_NAMES = [
  "Картошка",
  "Клубника",
  "Курица",
  "Лемон",
  "Перец",
  "Оливковое масло",
  "Морковка",
  "Яблоко",
  "Сырок",
  "Молоко",
  "Мандарин",
  "Рис",
  "Мороженное",
  "Помидор",
  "Огурец",
  "Груша"
];

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomProduct(): Product {
  let id = randomInteger(0, PRODUCT_NAMES.length - 1);
  let productName = PRODUCT_NAMES[id];
  return {
    id: id,
    name: productName
  }
}

function generateProducts(): Product[] {
  let productAmount = randomInteger(0, 15);
  let products = [];
  for (let i = 0; i < productAmount; i++) {
    products.push(randomProduct())
  }
  return products.filter((v, i, a) => a.indexOf(v) === i)
}

export function generateMockData(start: Date, end: Date): Day[] {
  let result = [];
  let date = start;
  let time = end.getTime() - start.getTime();
  let days = time / (1000 * 3600 * 24) + 1;
  for (let i = 1; i <= days; i++) {
    let products = generateProducts();
    result.push({
      date: date,
      products: products
    });
    date = new Date(date.getTime() + (1000 * 60 * 60 * 24));
  }
  return result;
}
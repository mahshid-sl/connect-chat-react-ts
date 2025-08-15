/** @type {import("prettier").Config} */
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: true, // آخر خطوط ; بزاره
  singleQuote: true, // از '' به جای ""
  trailingComma: 'all', // بعد آخرین آیتم هم کاما بزاره
  tabWidth: 2, // فاصله تب
  printWidth: 80, // طول خط
};

// Функция для проверки длины строки.

const checkStringLength = (stringToCheck, stringLength) => stringToCheck.length <= stringLength;

// Функция для проверки, является ли строка палиндромом

const isPalindrome = (string) => {
  string = string.replace(/ /g,'').toLowerCase();
  return string === string.split('').reverse().join('');
};

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

const extractNumber = (string) => {
  let startNumber = '';
  if (Number.isFinite(string)) {
    startNumber = string.toString().replace(/[\D]+/g, '');
    return startNumber;
  }
  let extractedNumber = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      extractedNumber += string[i];
    }
  }
  return extractedNumber;
};

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

const completeString = (string1, minLength, string2) => {
  if (string1.length > minLength) {
    return string1;
  }
  let symbolsToAdd = minLength - string1.length;
  return string2.slice(0, symbolsToAdd % string2.length) + string2.repeat(symbolsToAdd / string2.length) + string1;
};

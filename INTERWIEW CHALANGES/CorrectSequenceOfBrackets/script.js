const str1 = '([{()}])'; // true
const str2 = '()[]{}'; // true
const str3 = '(]'; // false
const str4 = '([)]'; // false
const str5 = '{[]}'; // true


//& Моё решение
function isValidBrackets(str) {
  let stack = [];
  const strSplit = str.split('');

  const openBr = ['(', '[', '{'];

  strSplit.forEach((elem) => {
    if (openBr.includes(elem)) {
      stack.push(elem);
    }

    switch (elem) {
      case ')':
        if (stack[stack.length - 1] === '(') {
          stack.pop();
        } else return false;
        break;

      case ']':
        if (stack[stack.length - 1] === '[') {
          stack.pop();
        } else return false;
        break;

      case '}':
        if (stack[stack.length - 1] === '{') {
          stack.pop();
        } else return false;
        break;
    }
  });

  return stack.length === 0;
}

console.log(isValidBrackets(str1));
console.log(isValidBrackets(str2));
console.log(isValidBrackets(str3));
console.log(isValidBrackets(str4));
console.log(isValidBrackets(str5));

//* ================================================================ //
//. https://www.youtube.com/watch?v=C6CbIReHsNk&list=PL0k-9Y7O1GwccXKHRzmvVj17yB7T9pjTo&index=4

//& Второй вариант из видео

function isValid(s) {
  const brackets = {
    ")": "(",
    "]": "[",
    "}": "{"
  };

  const st = [];
  for (let i = 0; i < s.length; i++) {
    if (isClosedBracket(s[i])) {
      if (brackets[s[i]] !== st.pop()) return false;
    } else {
      st.push(s[i]);
    }
  }
  return st.length === 0;
}

function isClosedBracket(ch) {
  return [")", "]", "}"].indexOf(ch) > -1;
}
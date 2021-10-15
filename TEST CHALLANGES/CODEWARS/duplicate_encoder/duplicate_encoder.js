console.log(dubleEncode("din"), "= ((("); //* "((("
console.log(dubleEncode("recede"), "= ()()()"); //* "()()()"
console.log(dubleEncode("Success", "= )())())"), "= )())())"); //* ")())())"
console.log(dubleEncode("(( @"), "= ))(("); //* "))(("
console.log(dubleEncode('add'));

function duplicateEncode(word){
    const validWord = word.toUpperCase();
    const chars = validWord.split('');
    
    let result = [];
    
    for (let i = 0; i < chars.length; i++) {
      const currentChar = chars[i];
      const first = chars.indexOf(currentChar);
      const last = chars.lastIndexOf(currentChar);
      
      if (first === last) {
        result.push('(');
      } else result.push(')');
    }
    
    return result.join('');
}

//* one of the best practices
function dubleEncode(word) {
    return word
            .toLowerCase()
            .split('')
            .map((char, i, arr) => {
                return arr.indexOf(char) === arr.lastIndexOf(char) ? '(' : ')';
            })
            .join('');
}
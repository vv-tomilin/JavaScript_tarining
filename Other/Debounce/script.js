const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => { fn.apply(this, arguments) }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms)
  };
}

function onChange(e) {
  console.log(e.target.value);
}

onChange = debounce(onChange, 200);

document.getElementById('search').addEventListener('keyup', onChange);



















//onChange = debounce(onChange, 500);



















// onChange = debounce(onChange, 1000);

// const debounce = (fn, time) => {
//   let timeout;

//   return function() {
//     const functionCall = () => fn.apply(this, arguments);

//     clearTimeout(timeout);
//     timeout = setTimeout(functionCall, time);
//   }
// }

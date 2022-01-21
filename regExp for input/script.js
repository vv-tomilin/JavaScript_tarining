const input = document.querySelector('input');

input.addEventListener('input', (e) => {
  console.log(e);
  const value = e.target.value;
  console.log(e.target.value = value.match(/[0][.,][0-9]*|[0]|[1-9]*[.,][1-9]*|[1-9]*/m)[0]);
});

input.addEventListener('focus', (e) => {

  const value = e.target.value;

  if (value === '0') {
    console.log(e.target.value = '');
  };
});
let classNames = [
  'header', 'menu', 'menu-item', 'menu-item', 'menu-item', 'footer', 'menu', 'link', 'link', 'link', 'link'
];
console.log(classNames);

const classNamesCount = {};

for (let i = 0; i < classNames.length; i++) {
  let current = classNames[i];

  if (classNamesCount[current]) {
    classNamesCount[current] += 1;
  } else {
    classNamesCount[current] = 1;
  }
}

const result = Object.keys(classNamesCount).sort((a, b) => {
  return classNamesCount[b] - classNamesCount[a]
});

console.log(result);
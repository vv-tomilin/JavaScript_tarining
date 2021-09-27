const obj = {
    name: 'Vasiliy',
    age: 28,
    job: 'front-end'
};

const entries = [
    ['name', 'Vasiliy'],
    ['age', 30],
    ['job', 'front-end']
];

// console.log(Object.entries(obj));
// console.log(Object.fromEntries(entries));

const map = new Map(entries);
console.log(map);
console.log('\n');
console.log(map.get('job'));

// map
//     .set('newField', 12)
//     .set(obj, 'value of object');
// console.log(map);
// 
// map.delete('age');
// console.log(map);
// 
// map.clear();

for (let [key, value] of map) {
    console.log(key, value);
}

console.log('\n');

for (let key of map.keys()) {
    console.log(key);
}

console.log('\n');

map.forEach((value, key, mapM) => {
    console.log(key, value);
    console.log(mapM);
});

console.log('\n');

const arr = [...map];
const arr2 = Array.from(map);
console.log(arr);
console.log(arr2);

console.log('\n');

const users = [
    {name: 'Max'},
    {name: 'Irina'},
    {name: 'Oleg'}
];

const visits = new Map();

visits
    .set(users[0], new Date())
    .set(users[1], new Date(new Date().getTime() + 1000000 * 60))
    .set(users[2], new Date(new Date().getTime() + 2000000000 * 60));

console.log(visits);
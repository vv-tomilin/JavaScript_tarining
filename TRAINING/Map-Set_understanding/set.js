const set = new Set([6, 1, 4, 2, 3, 2, 4, 5, 2, 6, 4]);
console.log(set);

console.log(set.has(20));
console.log(set.has(4));

console.log(set.size);

console.log(set.delete(6));
console.log(set.size);

//set.clear();
//console.log(set.size);

console.log(set.values());

for (let key of set) {
    console.log(key);
}
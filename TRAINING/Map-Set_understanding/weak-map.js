const obj = {name: 'weak-map'};

const map = new WeakMap([
    [obj, 'object data']
]);

console.log(map);

//* есть методы [get, set, delete, has] размер этой карты вычислить невозможно

//! ============================================================= //
console.log('====================================================\n');

const cache = new WeakMap();

function cacheUser(user) {
    if (!cache.has(user)) {
        cache.set(user, Date.now());
    }

    return cache.get(user);
}

let lena = {name: 'Elena'};
let alex = {name: 'Alex'};
let misha = {name: 'Mickhail'}

cacheUser(lena);
cacheUser(alex);

console.log(cache);

console.log(cache.has(lena));
console.log(cache.has(alex));
console.log(cache.has(misha));

console.log('\n');

lena = null;

console.log(cache);
console.log(cache.has(lena));
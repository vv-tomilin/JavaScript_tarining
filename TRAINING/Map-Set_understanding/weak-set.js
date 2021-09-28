const users = [
    {name: 'Elena'},
    {name: 'Alex'},
    {name: 'Mickhail'}
];

const visits = new WeakSet();

visits.add(users[0]).add(users[2]);
console.log(visits);
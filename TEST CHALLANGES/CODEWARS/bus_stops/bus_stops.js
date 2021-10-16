var number = function(busStops){
    let peopleInBus = 0;

    busStops.forEach((item, i, arr) => {
        peopleInBus = peopleInBus + item[0];
        peopleInBus = peopleInBus - item[1];
    })

    return peopleInBus;
}

console.log(number([[3,0],[9,1],[4,10],[12,2],[6,1],[7,10]]));
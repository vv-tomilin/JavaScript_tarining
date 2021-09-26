const url = 'https://pokeapi.co/api/v2/language/8';

let getPokeLang = fetch(url);

getPokeLang
    .then((response) => {
        return response.json();
    })
    .then((text) => {
        console.log(text);
    });
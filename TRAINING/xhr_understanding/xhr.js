const asteroidsUrl = 'https://api.nasa.gov/neo/rest/v1/feed';
const START_DATE = '2015-09-07';
const END_DATE = '2015-09-08';
const API_KEY = 'DEMO_KEY';

function sendRequest(url, startDate, endDate, apiKey) {
    return new Promise((resolve, reject) => {
        const urlAsteroids = `
        ${url}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', urlAsteroids);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(console.error(xhr.response))
            }
            resolve(xhr.response);
        };
        xhr.send();
    })
}

sendRequest(asteroidsUrl, START_DATE, END_DATE, API_KEY)
    .then((data) => {
        console.log(data);
    });
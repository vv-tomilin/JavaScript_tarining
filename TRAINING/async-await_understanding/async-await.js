'use strict'

const url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

const imgContainer = document.getElementById('img-container');
const textContainer = document.getElementById('text-container');

async function fetchPlanetImg(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Images:', data);

        const img = document.createElement('img');
        img.src = `${data.hdurl}`;
        img.width = 500;
        img.height = 500;
        imgContainer.appendChild(img);

        const text = `
            <div>
                <h2>${data.title}</h2>
                <p>Copyright: ${data.copyright}</p>
                <p>Date: ${data.date}</p>
                <p>Explanation: ${data.explanation}</p>
            </div>
        `;
        textContainer.innerHTML = text;
    } catch(e) {
        console.error(e);
    } finally {
        console.log('Finally!!!');
    }
}

fetchPlanetImg(url);
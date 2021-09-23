'use strict'

const btnOpenNewTab = document.querySelector('#open-new-tab');
const btnOpenNewWindow =document.querySelector('#open-new-window');

btnOpenNewTab.addEventListener('click', () => {
    window.open();
});

btnOpenNewWindow.addEventListener('click', () => {
    const url = 'file:///C:/Users/dnsuser/Desktop/JS%20Learning/JavaScript/Mini_tasks/TRAINING/dom-bom_understanding/bom-new-window.html';
    const data = {
        name: 'Vasily',
        surename: 'Tomilin',
        age: 30
    };
    
    const newWindow = window.open(url, 'New Window', 'width=500, height=500, top=150, left=150');
    newWindow.postMessage(data, url);
});
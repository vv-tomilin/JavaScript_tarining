'use strict'

const targetOrigin = 'file:///C:/Users/dnsuser/Desktop/JS%20Learning/JavaScript/Mini_tasks/TRAINING/dom-bom_understanding/bom-new-window.html';

// window.addEventListener('message', function(e) {
//     if(e.origin !== targetOrigin) {
//         return console.log('Не тот домен');
//     }

//     alert(`message: ${e.data}`);
// });

console.log(
    window.addEventListener('message', function(e) {
        return e.data;
    })
);
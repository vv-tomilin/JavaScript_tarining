const blocksList = document.querySelector('.blocks-list');
const blockItems = document.querySelectorAll('.block-item');

let isClick = false;

blocksList.addEventListener('click', (e) => {

    if (e.target.closest('.block-item')) {

        if (isClick === false) {
            console.log(isClick);
            e.target.classList.add('block-item--active');
            isClick = true;
            console.log(isClick);
        } else {
            e.target.classList.remove('block-item--active');
            isClick = false;
            console.log('false');
        }
    }
});

window.addEventListener('click', () => {
    //console.log('Window click!!!');
});
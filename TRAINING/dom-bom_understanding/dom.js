'use strict'

const bigTextBlock = document.createElement('div');
bigTextBlock.classList.add('big-text-block');
bigTextBlock.textContent = 'big text block';
const firstBlock = document.getElementById('first-block');
firstBlock.appendChild(bigTextBlock);


//|| ================================================================ //

//& Добавление переданного элемента в DOM-дерево относительно элемента, вызвавшего метод

//? targetElement.insertAdjacentElement(position, element);
//. https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentElement

const beforeFirstBlock = document.createElement('div');
beforeFirstBlock.classList.add('before-first-block');
beforeFirstBlock.textContent = 'Before first block';
bigTextBlock.insertAdjacentElement('beforebegin', beforeFirstBlock); //* добавляю 'beforeFirstBlock' перед элементом 'bigTextBlock'

const innerBigTextBlockAfterbegin = document.createElement('div');
innerBigTextBlockAfterbegin.classList.add('inner-big-text');
innerBigTextBlockAfterbegin.textContent = 'Inner text block "afterbegin"';
bigTextBlock.insertAdjacentElement('afterbegin', innerBigTextBlockAfterbegin);

//|| ===================================================================== //

//? innerHTML
//. https://developer.mozilla.org/ru/docs/Web/API/Element/innerHTML

const listWrapper = document.createElement('div');
listWrapper.classList.add('list-wrapper');
document.body.appendChild(listWrapper);

const ul = `
    <ul class='list'>
        <li>one</li>
        <li>two</li>
        <li>three</li>
    </ul>
`;

listWrapper.innerHTML = ul;

//|| ====================================================================== //

//* Create image element

const img = document.createElement('img');
img.src = 'https://picsum.photos/240';
img.width = 240;
img.classList.add('image');
img.alt = 'superman';
listWrapper.appendChild(img);

//|| ====================================================================== //

//& insertAdjacentHTML() разбирает указанный текст как HTML 
//& или XML и вставляет полученные узлы (nodes) в DOM дерево в указанную позицию

//? targetElement.insertAdjacentHTML(position, text);
//. https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML

const textBlock = `
    <div class='text-block'>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </div>
`;

bigTextBlock.insertAdjacentHTML('beforeend', textBlock);

//|| ======================================================================= //

const paragraphs = document.querySelector('.text-block');
paragraphs.children[1].classList.add('active-text');

//|| ======================================================================= //

const generateAutoCard = (brand, year, color) => {

    // const currentDate = new Date();
    // const age = currentDate.getFullYear() - year;

    const age = new Date().getFullYear() - year;

    return `
        <div class="auto-card">
            <h2>${brand} ${year}</h2>
            <p>
                Automobile ${brand} - ${year} 
                since. Age of the car - ${age} years old
            </p>
            <p>Color: ${color.toUpperCase()}</p>
            <button class="btn" type="button">Delete</button>
        </div>
    `;
};

const carsList = [
    {brand: 'Tesla', year: '2016', color: 'blue'},
    {brand: 'KIA', year: '2013', color: 'black'},
    {brand: 'Infifnity', year: '2021', color: 'gold'}
];

const carsDiv = document.createElement('div');
carsDiv.classList.add('autos');

const carsHTML = carsList.map((car) => {
    return generateAutoCard(car.brand, car.year, car.color);
}).join('');

carsDiv.innerHTML = carsHTML;
bigTextBlock.insertAdjacentElement('afterend', carsDiv);

const buttonsDel = document.querySelectorAll('.btn');

buttonsDel.forEach((btn) => {
    btn.addEventListener('click', deliteAutoCard);
});

function deliteAutoCard(e) {
    const currentButton = e.currentTarget;

    currentButton.closest('.auto-card').remove();
}

//& Element.closest() возвращает ближайший родительский элемент (или сам элемент),
//& который соответствует заданному CSS-селектору или null, если таковых элементов вообще нет.
//. https://developer.mozilla.org/ru/docs/Web/API/Element/closest
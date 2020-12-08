//SELECTORS
const input = document.querySelector('.input');
const submitBtn = document.querySelector('.submitBtn');
const outputList = document.querySelector('.output-list');
const thumbnail = document.querySelector('.thumbnail');
const title = document.querySelector('.title');
const author = document.querySelector('.author');

//Modal selectors
const modalBg = document.querySelector('.modal-bg');
const modalBtn = document.querySelector('.modal-btn');
const closeModal = document.querySelector('.close-modal');

//EVENT LISTENERS
submitBtn.addEventListener('click', getBooks);

input.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        getBooks();
    }
});

modalBtn.addEventListener('click', () => {
    modalBg.classList.remove('active');
});
closeModal.addEventListener('click', () => {
    modalBg.classList.remove('active');
});



//FUNCTIONS
function getBooks() {
    outputList.innerHTML = '';
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (input.value === '') {
                modalBg.classList.add('active');
            } else {
                for (var i = 0; i < 10; i++) {
                    if (data.items[i].volumeInfo.authors == undefined) {
                        outputList.innerHTML += `<div class="book">
                                                <img src="${data.items[i].volumeInfo.imageLinks.thumbnail}"></img> 
                                                <div class="book-information">
                                                    <h1>${data.items[i].volumeInfo.title}</h1>
                                                    <h2>-</h2>
                                                    <a href="${data.items[i].volumeInfo.infoLink}"><button class="infoBtn">More info</button></a>
                                                </div>
                                            </div>`;
                    } else {
                        outputList.innerHTML += `<div class="book">
                                                <img src="${data.items[i].volumeInfo.imageLinks.thumbnail}"></img> 
                                                <div class="book-information">
                                                    <h1>${data.items[i].volumeInfo.title}</h1>
                                                    <h2>${data.items[i].volumeInfo.authors}</h2>
                                                    <a href="${data.items[i].volumeInfo.infoLink}"><button class="infoBtn">More info</button></a>
                                                </div>
                                            </div>`;
                    }

                }
            }
        })
        .catch(err => console.log('Not found'))
}
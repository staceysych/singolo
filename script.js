window.onload = function() {
    console.log('hello world');
    //navigation
    navigationScroll();
    addClickHandler('.navigation', '.navigation__link', 'active')

    //tags
    //addTagsClickHandler();
    addClickHandler('.portfolio__tags', '.tag', 'tag_selected');
    shuffleImagesOnTagClick('.web-design');
    shuffleImagesOnTagClick('.graphic-design');
    shuffleImagesOnTagClick('.artwork');
    tagAllImages('.tag__all');

    // картинки
    addClickHandler('.portfolio-images', '.block__img', 'block_bordered')

    // iPhone vertical button 
    toggleClassListOnClick('phone-button_vertical', 'black-screen_vertical', 'hidden');
    // iPhone horisontal button 
    toggleClassListOnClick('phone-button_horisontal', 'black-screen_horisontal', 'hidden');

    //SLIDER
    slider();

    //form 
    submitButton();
    closeButton();
}

//* ...................... Рандомные картинки

let arry = [1,2,3,4,5,6,7,8,9,10,11,12];
//* создаём функцию, которая считает рандомный номер
const shuffle = (arr) => {
    let newPosition, temp;
    for ( var i = arr.length-1; i > 0; i--) {
        newPosition = Math.floor(Math.random()*(i+1));
        temp = arr[i];
        arr[i] = arr[newPosition];
        arr[newPosition] = temp;
    }
    return arr;
}

//* создаём функцию, которая изменяет картинку согласно рандомному числу
const shuffleImagesOnTagClick = (tagClass) => {
    const tag = document.querySelector(tagClass);

    tag.addEventListener('click', () => {
        shuffle(arry);
        const images = document.querySelectorAll('.block__img');
            for ( var i = 0; i < images.length; i++) {
                images[i].src = 'assets/singolo2/img/' + arry[i] + '.jpg';
            }
    })
}

//* создаём функцию, которая возвращает все картинки на исходное положение
const tagAllImages = (tagClass) => {
    const tag = document.querySelector(tagClass);
    tag.addEventListener('click', () => {
        var y = 0;
        const images = document.querySelectorAll('.block__img');
            for ( var i = 1; i < images.length + 1; i++) {
                images[y].src = 'assets/singolo2/img/' + i + '.jpg';
                y++;
            }
    })
}

//* ........СЛАЙДЕР
const slider = () => {
    const sliderBox = document.querySelector('.slider__wrapper');
    const sliderImages = document.querySelectorAll('.slider__wrapper img');
    const arrowRight = document.getElementById('right-arrow');
    const arrowLeft = document.getElementById('left-arrow');

    // переменная, которая вычисляет номер слайда
    let countSlide = 1;

    //создаем переменную, которая содержит ширину нашей картинки
    const imageSize = sliderImages[0].clientWidth;
    // задаем стиль transform - traslate, который меняет положение элементов.
    sliderBox.style.transform = 'translateX('+(-imageSize*countSlide) + 'px)';

    arrowRight.addEventListener('click', ()=> {
        if(countSlide >= sliderImages.length -1) return;
        sliderBox.style.transition = 'transform 0.6s ease-in-out';
        countSlide++;
        sliderBox.style.transform = 'translateX('+(-imageSize*countSlide) + 'px)';
        //*убираем стили черного экрана
        if (countSlide === 2){
            document.getElementById('black-screen_vertical').style.display = 'none'
            document.getElementById('black-screen_horisontal').style.display = 'none'
        } else {
            document.getElementById('black-screen_vertical').style.display = 'block'
            document.getElementById('black-screen_horisontal').style.display = 'block'
        }
        document.getElementById('black-screen_vertical').classList.add('hidden');
        document.getElementById('black-screen_horisontal').classList.add('hidden');
        
    })

    arrowLeft.addEventListener('click', ()=> {
        if(countSlide <= 0) return;
        sliderBox.style.transition = 'transform 0.6s ease-in-out';
        countSlide--;
        sliderBox.style.transform = 'translateX('+(-imageSize*countSlide) + 'px)';
        //*убираем стили черного экрана
        if (countSlide === 0){
            document.getElementById('black-screen_vertical').style.display = 'none'
            document.getElementById('black-screen_horisontal').style.display = 'none'
        } else {
            document.getElementById('black-screen_vertical').style.display = 'block'
            document.getElementById('black-screen_horisontal').style.display = 'block'
        }
        document.getElementById('black-screen_vertical').classList.add('hidden');
        document.getElementById('black-screen_horisontal').classList.add('hidden');
    })

    sliderBox.addEventListener('transitionend', ()=> {
        if(sliderImages[countSlide].id === 'last-slide') {
            sliderBox.style.transition = 'none';
            countSlide =  1;
            sliderBox.style.transform = 'translateX('+(-imageSize*countSlide) + 'px)';
    }
        if (sliderImages[countSlide].id === 'first-slide') {
            sliderBox.style.transition = 'none';
            countSlide = sliderImages.length - 2;
            sliderBox.style.transform = 'translateX('+(-imageSize*countSlide) + 'px)';
        }
    })
}

//* ..................... Функция, которая изменяет стиль навигационного меню при прокурутке страницы
const navigationScroll = () => {
    document.addEventListener('scroll', onScroll);
}

const onScroll = (event) => {
    const header = document.querySelector('.header');
    const currentPosition = window.scrollY + header.offsetHeight;  
    
    //console.log(currentPosition)
    const sections = document.querySelectorAll('body>section');
    const links = document.querySelectorAll('.navigation a');

    sections.forEach((section) => {
        console.log('offsetTop=' + section.offsetTop);
        /* 
        * проверяем если наша позиция в данный момент находится в блоке-секции. т.е больше чем верх блока и меньше, чем низ блока 
        */
        if(section.offsetTop <= currentPosition  && (section.offsetTop + section.offsetHeight) > currentPosition) {
            links.forEach((link) => {
                link.classList.remove('active');
                /* 
                * Если id секции совпадает с href без значка #, то мы возвращаем стиль на эту ссылку 
                */
                if(section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('active');
                }
            })
        }
    })
}


//* ........................По нажатию изменям стили у элемента...........................
const addClickHandler = (parent, el, style ) => {
    document.querySelector(parent).addEventListener('click', (event) => {
        if(event.target.classList.contains(el.substr(1))) {
            let clickedLink = event.target;
            removeClassList(el, style);
            addClassList(clickedLink, style)
        }
        
    })
}
const removeClassList = (el, style) => {
    let links = document.querySelectorAll(el);
        links.forEach(link => {
            link.classList.remove(style);
        });
}
const addClassList = (clickedLink,style) => {
    clickedLink.classList.add(style);
}

//*......................Сортируем теги в блоке portfolio__tags...........................*/
const addTagsClickHandler = () => {
    document.querySelector('.portfolio__tags').addEventListener('click', (event)=>{
        //проверяем, что мы нажимаем именно на элемент в контейнере, а не на пустое место.
        if(event.target.classList.contains('tag')) {
            let clickedTag = event.target; //тег, на который мы нажимаем
            removeSelectedTags();
            selectClickedTag(clickedTag);
            if(clickedTag.innerText === 'All') {
                showAllImages();
            } else {
                filterImagesBySelectedTag(clickedTag.innerText);
            }
        }
        
    })
}
//функция, которая удаляет у каждого элемента стиль.
const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.portfolio__tags .tag');
    tags.forEach(tag => {
        tag.classList.remove('tag_selected')
    })
}
//функция, которая определяет стиль для выбранного элемента
const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('tag_selected'); //тег, на который мы нажимаем, присваиваем класс.
}
//функция, которая будет показывать все картинки портфолио блока.
const showAllImages = () => {
    let portfolioImages = document.querySelectorAll('.portfolio-images .block');
    portfolioImages.forEach(image => {
        image.classList.remove('block_hidden');
})
}
//функция, которая будет отображать только определенные картинки в зависимости от выбранного тега
const filterImagesBySelectedTag =(selectedTag) => {
    let portfolioImages = document.querySelectorAll('.portfolio-images .block');
    portfolioImages.forEach(image => {
        image.classList.add('block_hidden');
        //проверям если класс у картинки содердит первое слово из выбранного тега
        if(image.classList.contains(selectedTag.split(' ')[0])) {
            
            image.classList.remove('block_hidden');
        }
    })
}

//* ............включаем и выключаем black-screen у телефонов

const toggleClassListOnClick = (parentId, elId, style) => {
    document.getElementById(parentId).addEventListener('click', ()=>{
        document.getElementById(elId).classList.toggle(style)
    })
}

//* ............кнопка для откравки формы.
const submitButton = () => {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', (event) => {
        const name = document.getElementById('name').value.toString();
        const email = document.getElementById('email').value;
        if(name == '' || email == '') {
            document.querySelector('.message-block_required').classList.remove('invisible');
        }
        //передаем в переменную значения из инпута.
        const subject = document.getElementById('subject').value.toString();
        //передаем в переменную значения из инпута.
        const description = document.getElementById('description').value.toString();
        if(subject != ''){
            //записываем новый текст в наш документ. 
            document.getElementById('subject-result').innerText = 'Тема: ' + subject;
            document.getElementById('description-result').innerText = 'Описание: ' + description;
        } else {
            document.getElementById('subject-result').innerText = 'Без темы';
            document.getElementById('description-result').innerText = 'Без описания';
        }
        document.getElementById('message-block').classList.remove('invisible');
        //лишаем кнопку, возможности отправить данные.
        event.preventDefault();
    })
}
const closeButton = () => {
    const closeButton = document.querySelectorAll('.close-button');

    closeButton.forEach(el => el.addEventListener('click', () => {
        document.getElementById('subject-result').innerHTML = '';
        document.getElementById('description-result').innerHTML = '';
        document.querySelector('.form').reset();
        document.getElementById('message-block').classList.add('invisible');
        document.querySelector('.message-block_required').classList.add('invisible');
    }))
}




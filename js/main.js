
// Скролл к блоку учитывая фиксированный header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = 70; // Высота шапки
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Бургер-меню
function toggleModal() {
    const modal = document.getElementById('modal');
    const burger = document.querySelector('.burger');
    const display = modal.style.display === 'flex' ? 'none' : 'flex';

    modal.style.display = display;
    
    // Переключаем класс active для бургер-меню
    burger.classList.toggle('active');
}

// Равная ширина элементов меню
function adjustLetterSpacing() {
    const menuItems = document.querySelectorAll('.menu-item a');
    const maxLength = Math.max(...Array.from(menuItems).map(item => item.textContent.length));

    menuItems.forEach(item => {
        const currentLength = item.textContent.length;
        const letterSpacing = (maxLength - currentLength) * 0.9; // Измените множитель по необходимости
        item.style.letterSpacing = `${letterSpacing}px`;
    });
}
// Запускаем функцию при загрузке страницы
window.onload = adjustLetterSpacing;
// Также можно запустить ее при изменении размера окна, если требуется
window.onresize = adjustLetterSpacing;

// Слайдер фото
let currentSlides = {};
// Функция для настройки индикаторов
function setupIndicators(sliderClass) {
    const slides = document.querySelectorAll(`.slider.${sliderClass} .slide`);
    const indicatorsContainer = document.querySelector(`.slider.${sliderClass} .slider-indicators`);
    indicatorsContainer.innerHTML = ''; // Очистить предыдущие индикаторы

    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('slider-indicator');
        if (index === 0) {
            indicator.classList.add('active'); // Делаем первый индикатор активным
        }
        indicator.addEventListener('click', () => changeSlideTo(index, sliderClass));
        indicatorsContainer.appendChild(indicator);
    });
}
// Функция для перехода между слайдами
function changeSlide(direction, sliderClass) {
    if (!currentSlides[sliderClass]) {
        currentSlides[sliderClass] = 0;
        setupIndicators(sliderClass); // Настройка индикаторов при первом использовании
    }

    const slides = document.querySelectorAll(`.slider.${sliderClass} .slide`);
    const totalSlides = slides.length;

    currentSlides[sliderClass] = (currentSlides[sliderClass] + direction) % totalSlides;
    
    if (currentSlides[sliderClass] < 0) {
        currentSlides[sliderClass] += totalSlides; // Переход в конец
    }

    const offset = -currentSlides[sliderClass] * 100;
    document.querySelector(`.slider.${sliderClass} .slides`).style.transform = `translateX(${offset}%)`;

    updateIndicators(sliderClass);
}
// Функция для перехода на конкретный слайд
function changeSlideTo(index, sliderClass) {
    currentSlides[sliderClass] = index;
    const totalSlides = document.querySelectorAll(`.slider.${sliderClass} .slide`).length;

    if (index < 0) {
        currentSlides[sliderClass] += totalSlides; // Переход в конец
    } else if (index >= totalSlides) {
        currentSlides[sliderClass] = 0; // Начало
    }

    const offset = -currentSlides[sliderClass] * 100;
    document.querySelector(`.slider.${sliderClass} .slides`).style.transform = `translateX(${offset}%)`;

    updateIndicators(sliderClass);
}
// Функция для обновления индикаторов
function updateIndicators(sliderClass) {
    const indicators = document.querySelectorAll(`.slider.${sliderClass} .slider-indicator`);
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlides[sliderClass]);
    });
}
// Вызываем функцию настройки индикаторов для каждого слайдера при загрузке
document.addEventListener('DOMContentLoaded', () => {
    setupIndicators('slider-1'); // Вызов настраиваем индикаторы для слайдов
    setupIndicators('slider-2');
    setupIndicators('slider-3');
    setupIndicators('slider-4');
    setupIndicators('slider-5');
    setupIndicators('slider-6');
    setupIndicators('slider-7');
    setupIndicators('slider-8');
    setupIndicators('slider-9');
    setupIndicators('slider-10');
});

// Сброс активного слайда при скролле
let scrollTimeout; // Переменная для хранения таймера
// Сброс активного слайда при скролле
function resetSliders() {
    Object.keys(currentSlides).forEach(sliderClass => {
        currentSlides[sliderClass] = 0; // Возвращаем к первому слайду
        const offset = 0; // Сброс положения
        document.querySelector(`.slider.${sliderClass} .slides`).style.transform = `translateX(${offset}%)`;
        updateIndicators(sliderClass); // Обновляем индикаторы
    });
}
// Обработчик события прокрутки
document.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout); // Удаляем предыдущий таймер
    if (window.scrollY > 100) { // Установить порог в 100 пикселей
        scrollTimeout = setTimeout(resetSliders, 310); // Сбрасываем слайдеры через 300 мс после последней прокрутки
    }
});

// Модальное окно для фото
function openModal(img, sliderClass) {
    const modal = document.getElementById("modal-custom");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

function closeModal() {
    const modal = document.getElementById("modal-custom");
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("modal-custom");
    if (event.target == modal) {
        closeModal();
    }
}

// добавление стилей к классу кроме первого элемента
const titlePrices = document.querySelectorAll('.title_prices');

titlePrices.forEach((element, index) => {
    if (index > 0) {
        element.style.borderTop = '#777B95 1px solid';
        element.style.paddingTop = '30px';
    }
});

// Обновление даты
 const currentYear = new Date().getFullYear();
 document.getElementById("current-year").textContent = currentYear;



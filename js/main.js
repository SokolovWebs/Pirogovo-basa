
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
            behavior: 'smooth' // Анимация прокрутки
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

// Слайдер фото
let currentSlides = {};

function changeSlide(direction, sliderClass) {
    if (!currentSlides[sliderClass]) {
        currentSlides[sliderClass] = 0;
    }

    const slides = document.querySelectorAll(`.slider.${sliderClass} .slide`);
    const totalSlides = slides.length;

    currentSlides[sliderClass] = (currentSlides[sliderClass] + direction) % totalSlides;
    
    if (currentSlides[sliderClass] < 0) {
        currentSlides[sliderClass] += totalSlides; // Переход в конец
    }

    const offset = -currentSlides[sliderClass] * 100;
    document.querySelector(`.slider.${sliderClass} .slides`).style.transform = `translateX(${offset}%)`;
}

// Вызов функции при загрузке
adjustWidth();

// Вызов функции при изменении размера окна
window.addEventListener('resize', adjustWidth);


// Модальное окно 1
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

// Модальное окно 2
document.querySelectorAll('.card_price').forEach(function(card) {
    card.addEventListener('click', function() {
        const modal = document.getElementById("myModal2");
        const modalContent = modal.querySelector(".modal-content2");
        
        // Копируем HTML содержимое карточки в модальное окно
        modalContent.innerHTML = card.innerHTML;
        
        modal.style.display = "block"; // Показываем модальное окно

        const closeModal = document.getElementById("closeModal2");
        closeModal.onclick = function() {
            modal.style.display = "none"; // Закрываем модальное окно
        }
    });
});

// Обновление даты
 const currentYear = new Date().getFullYear();
 document.getElementById("current-year").textContent = currentYear;
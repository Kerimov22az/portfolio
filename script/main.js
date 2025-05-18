// const btnDarkMode = document.querySelector(".dark-mode-btn");

// btnDarkMode.onclick = function () {
//     btnDarkMode.classList.toggle("dark-mode-btn--active");
//   document.body.classList.toggle('light');
// }


gsap.registerPlugin(SplitText);

gsap.set("h1", { opacity: 1 });

let split = SplitText.create("#heading", { type: "chars" });
//now animate each character into place from 20px below, fading in:
gsap.from(split.chars, {
  y: 150,
  autoAlpha: 0,
  stagger: 0.03
});




const btnDarkMode = document.querySelector(".dark-mode-btn");

// Функция для применения темы
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.remove('light');
    btnDarkMode.classList.add("dark-mode-btn--active");
  } else {
    document.body.classList.add('light');
    btnDarkMode.classList.remove("dark-mode-btn--active");
  }
}

// Обработчик клика
btnDarkMode.onclick = function () {
  // Переключение класса кнопки
  btnDarkMode.classList.toggle("dark-mode-btn--active");
  
  // Проверка текущей темы и её смена
  if (document.body.classList.contains('light')) {
    // Переключение на тёмную тему
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  } else {
    // Переключение на светлую тему
    document.body.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
}

// При загрузке страницы читаем сохранённую тему
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // Можно задать тему по умолчанию, например, светлую
  applyTheme('light');
}


// После применения темы показываем страницу
document.body.classList.add('loaded');
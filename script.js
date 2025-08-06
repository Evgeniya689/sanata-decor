function scrollToTable() {
    const section = document.getElementById("zayavka");
    section.scrollIntoView({ behavior: "smooth" });
  }
  
  (function () {
    var squareWrapper = document.querySelector('.square-wrapper');
    var square = squareWrapper.querySelector('.square');
    square.classList.remove('square-transition');
  
    var observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (typeof getCurrentAnimationPreference === 'function' && !getCurrentAnimationPreference()) {
          return;
        }
  
        if (entry.isIntersecting) {
          square.classList.add('square-transition');
          return;
        }
  
        square.classList.remove('square-transition');
      });
    });
  
    observer.observe(squareWrapper);
  })();

  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    spaceBetween: -100,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 800,
      modifier: 1,
      slideShadows: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
  });

function sendForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const telegram = document.getElementById("telegram").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !phone || !telegram) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Пожалуйста, введите корректный адрес электронной почты.");
    return;
  }

  // Отправка данных в Telegram
  const message = `
📩 Новая заявка с сайта "Восход":
👤 ФИО: ${name}
📧 Email: ${email}
📱 Телефон: ${phone}
💬 Telegram: ${telegram}
  `;

  const TOKEN = "8135815901:AAGvHe4zyh-p5Q08B9eAATdEsi5aVio8CFE";
  const CHAT_ID = "553356311";
  const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  })
  .then(response => {
    if (response.ok) {
      alert("Ваши данные отправлены! Свяжемся с Вами в течение 2 дней. Спасибо за участие!");
      document.getElementById("participationForm").reset();
    } else {
      alert("Ошибка при отправке. Пожалуйста, попробуйте позже.");
    }
  })
  .catch(error => {
    alert("Сервер недоступен. Проверьте подключение или обратитесь к разработчику.");
    console.error(error);
  });
}

let $owl = $('.carousel-2');
    $owl.children().each( function( index ) {
    $(this).attr( 'data-position', index );
});
$(document).on('click', '.owl-item>div', function() {
    let $speed = 300;
    $owl.trigger('to.owl.carousel', [$(this).data( 'position' ), $speed] );
});    
$owl.owlCarousel({
    loop:true,
    center: true,
    stagePadding: 70,
    nav: true,
    dots: false,
    navText: ['&lsaquo;', '&rsaquo;'],
    responsive:{
        0:{items:1},
        600:{items:2},
        992:{items:3},
        1200:{items:4},
        1600:{items:5}            
    }
});

// Отправка формы
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

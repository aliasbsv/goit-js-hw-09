const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const feedbackFormState = 'feedback-form-state';

// Функція для збереження даних в localStorage
function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

// Функція для завантаження даних з localStorage
function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return null;
  }
}

// Обробник події input для оновлення та збереження formData
form.addEventListener('input', () => {
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  
  formData.email = email;
  formData.message = message;
  
  saveToLS(feedbackFormState, formData);
});

// Завантаження даних з localStorage при завантаженні сторінки та заповнення полів форми
window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS(feedbackFormState);
  
  if (data) {
    form.elements.email.value = data.email || '';
    form.elements.message.value = data.message || '';
    
    // Оновлення formData відповідно до завантажених даних
    formData.email = data.email || '';
    formData.message = data.message || '';
  }
});

// Обробник події submit для форми
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  
  if (email === '' || message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);  

    // Очищення formData та localStorage
    localStorage.removeItem(feedbackFormState);
    formData.email = '';
    formData.message = '';
    
    // Скидання полів форми
    form.reset();
  }
});





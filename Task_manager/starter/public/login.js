const loginForm = document.querySelector('.login-form');
const loginEmail = document.querySelector('.login-email');
const loginPassword = document.querySelector('.login-password');
const formAlert = document.querySelector('.form-alert');

const togglePasswordVisibility = (input, toggle) => {
  toggle.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text';
      toggle.textContent = 'Hide';
    } else {
      input.type = 'password';
      toggle.textContent = 'Show';
    }
  });
};

document.querySelectorAll('.toggle-password').forEach((toggle) => {
  togglePasswordVisibility(loginPassword, toggle);
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('/login', {
      email: loginEmail.value,
      password: loginPassword.value
    });
    formAlert.textContent = 'Login successful!';
    formAlert.style.color = 'green';
    formAlert.style.display = 'block';
  } catch (error) {
    formAlert.textContent = 'Login failed. Please try again.';
    formAlert.style.display = 'block';
  }
});

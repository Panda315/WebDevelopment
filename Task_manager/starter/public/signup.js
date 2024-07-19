const signupForm = document.querySelector('.signup-form');
const signupEmail = document.querySelector('.signup-email');
const signupPassword = document.querySelector('.signup-password');
const signupConfirmPassword = document.querySelector('.signup-confirm-password');
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

document.querySelectorAll('.toggle-password').forEach((toggle, index) => {
  if (index === 0) {
    togglePasswordVisibility(signupPassword, toggle);
  } else if (index === 1) {
    togglePasswordVisibility(signupConfirmPassword, toggle);
  }
});

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (signupPassword.value !== signupConfirmPassword.value) {
    formAlert.textContent = 'Passwords do not match';
    formAlert.style.display = 'block';
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/signup', {
      email: signupEmail.value,
      password: signupPassword.value
    });
    console.log(response)
    if(response.status === 200){
      formAlert.textContent = 'Sign-up successful!';
      formAlert.style.color = 'green';
      console.log("href huna baki")
      window.location.href = '/login';
    }
    else{
      formAlert.textContent = 'Sign-up unsuccessful!';
      formAlert.style.color = 'red';
    }
  } catch (error) {
    formAlert.textContent = 'Sign-up failed. Please try again.';
    formAlert.style.display = 'block';
  }
});

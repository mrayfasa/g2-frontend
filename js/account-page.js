function login() {
    // Mengambil elemen formulir login dan registrasi
    var loginForm = document.getElementById('login');
    var registerForm = document.getElementById('register');
    var btn = document.getElementById('btn');
    
    // Mengatur posisi formulir untuk tampilan login
    loginForm.style.left = '50px';
    registerForm.style.left = '450px';
    btn.style.left = '0';
  }
  
function register() {
  // Mengambil elemen formulir login dan registrasi
  var loginForm = document.getElementById('login');
  var registerForm = document.getElementById('register');
  var btn = document.getElementById('btn');
  
  // Mengatur posisi formulir untuk tampilan registrasi
  loginForm.style.left = '-400px';
  registerForm.style.left = '50px';
  btn.style.left = '110px';
}
  
  

 //Password di Login
function togglePassword() {
    var passwordField = document.getElementById('login-password');
    var toggleIcon = document.getElementById('toggle-icon');
    
    // Memungkinkan pengguna melihat/menyembunyikan kata sandi
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
      console.log('Halo');
    } else {
      passwordField.type = 'password';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    }
  }


  //Password di register
function togglePassword2() {
    var passwordField = document.getElementById('register-password');
    var toggleIcon = document.getElementById('toggle-icon2');
    
    // Memungkinkan pengguna melihat/menyembunyikan kata sandi
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
      console.log('Halo');
    } else {
      passwordField.type = 'password';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    }
  }

function submitLogin(e){
  var login_email = document.getElementById('login-email').value.trim();
  var login_password = document.getElementById('login-password').value.trim();
  const formValid = validateEmail(login_email) && validatePassword(login_password, 6, 28);
  console.log(formValid)
  if (formValid){
    e.preventDefault()
    AjaxRequest(API_URL + '/v1/auth/login', 'POST', {email:login_email, password:login_password}, (res) =>{
        setCookie('token', res.token, 1);
        window.location = 'homepage.html';
    })
  }
}
function submitRegister(e){
  var register_email = document.getElementById('register-email').value?.trim();
  var register_fullname = document.getElementById('register-fullname').value?.trim();
  var register_password = document.getElementById('register-password').value?.trim();
  var termsnconds = document.getElementById('termsnconds').checked
  const formValid = validateEmail(register_email) && validatePassword(register_password, 6, 28) & validateFullname(register_fullname) && termsnconds;
  if (formValid){
    e.preventDefault()
    
    AjaxRequest(API_URL + '/v1/auth/register', 'POST', {email:register_email, password:register_password, fullname: register_fullname}, (res) =>{
        window.location.reload()
    })
  }
}

function validateEmail(email){
  return email !== "" &&  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function validatePassword(password, minLen, maxLen){
  return password!== "" && password.length >= minLen && password.length <= maxLen;
}
function validateFullname(name){
  return name.length > 0;
}
      
    
  
  
 
  
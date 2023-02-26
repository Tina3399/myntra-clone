import { navbar } from '../Component/navbar.js';

let header = document.getElementById('home_navbar');
header.innerHTML = navbar();
const login_message = document.getElementById('login_message');
// RESPONSIVE NAVBAR CSS

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
  //Animate Links
  navLinks.classList.toggle('open');
  links.forEach((link) => {
    link.classList.toggle('fade');
  });

  //Hamburger Animation
  hamburger.classList.toggle('toggle');
});

const form = document.getElementById('form');

form.addEventListener('click', async (e) => {
  e.preventDefault();

  const payload = {
    email: form.email.value,
    pass: form.password.value,
  };

  await fetch('https://sore-rose-beaver-cape.cyclic.app/users/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      login_message.textContent = res.msg + '!';

      if (res.token) {
        console.log('successfullll');
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 3000);
      }

      localStorage.setItem('token', res.token);
      localStorage.setItem('loggedInUser', res.name);
    })
    .catch((err) => {
      console.log({ msg: 'Something went wrong' });
    });

  console.log(payload);
});

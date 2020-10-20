document.addEventListener("DOMContentLoaded", function() {
    
    const header = document.querySelector('header').offsetHeight;
    const footer = document.querySelector('footer').offsetHeight;
    const main = document.querySelector('main');
    const mainHeight = header + footer;
   main.style.minHeight = `calc(100vh - ${mainHeight}px)`;

   })
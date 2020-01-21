$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.tabs').tabs();
  });

  const show = document.querySelector('.test');



  const api = async () => {
    const r = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=155bc6fb09325aed51a899514754ed0a');
    const rd = await r.json();
    console.log(rd);
  };

  if(show) {
    show.addEventListener('click', api);
  }
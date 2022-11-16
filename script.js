'use strict';

// 스크롤에 따른 메뉴바 색상처리
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
console.log(navbarHeight);
document.addEventListener('scroll', () => {
    // console.log('이벤트가 발생됨.');
    // console.log(window.scrollY);
    if(window.scrollY > (navbarHeight*2)){
        navbar.classList.add('navbar--bold');
    } else {
        navbar.classList.remove('navbar--bold');
    }
})

// 화살표 누르면 이동 및 사라지기
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
const arrow = document.querySelector('.arrow-up')
arrow.addEventListener('click', ()=>{
    scrollIntoView('#home');
})
document.addEventListener('scroll', () => {
    if(window.scrollY > (homeHeight/2)){
        arrow.classList.remove('hiden');
    } else {
        arrow.classList.add('hiden');
    }
    home.style.opacity = 1 - window.scrollY / homeHeight;
})

// contact 버튼 누르면 이동
const contact = document.querySelector('.home__contact');
contact.addEventListener('click', ()=>{
    scrollIntoView('#contact');
})

// 메뉴선택에 따른 스크롤이동
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
    // console.log(e);
    const target = e.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    scrollIntoView(link);
})

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}
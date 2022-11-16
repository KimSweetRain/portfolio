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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
})


// 모바일 메뉴 버튼 설정
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
})



// 작업실 선택
const workBtnContainer = document.querySelector('.work_categories');
const projectContainer = document.querySelector('.work__project');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }
    const active = document.querySelector('.category__btn.selected');
    if(active != null){
        active.classList.remove('selected');
    }
    e.target.classList.add('selected');

    projectContainer.classList.add('anim-out')
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter == '*' || filter == project.dataset.type){
                project.classList.remove('invisible');
            } else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out')
    },300)
})


// 스크롤에 따른 메뉴 테두리

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work1',
    '#testimonials',
    '#contact'
];

const sections = sectionIds.map((id) => document.querySelector(id));
// console.log(sections)
const navItems = sectionIds.map((Id) => document.querySelector(`[data-link='${Id}']`))
// console.log(navItems)

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root : null,
    rootMargin : '0px',
    threshold : 0.3
}
const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            console.log('y');
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index)
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex =  index -1;
            }
            console.log(selectedNavIndex)
        }
    })
}


const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel',() => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (
        window.screenY + window.innerHeight === document.body.clientHeight
    ) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});
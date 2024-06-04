if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

const theme=window.localStorage.getItem('theme') || 'light'

const imageElement = document.querySelector('#header-img')
imageElement.src = `./assets/img/header-${theme}.png`

const themebutton = document.querySelector('#theme-button')
themebutton.src = `./assets/svg/button-${theme}.png`

const starimg1 = document.querySelector('#star-img1')
starimg1.src = `./assets/svg/star-${theme}.png`

const starimg2 = document.querySelector('#star-img2')
starimg2.src = `./assets/svg/star-${theme}.png`

const Frame = document.querySelector('#Frame')
Frame.src = `./assets/svg/Frame-${theme}.png`

const work = document.querySelector('#work')
work.src = `./assets/svg/work-${theme}.png`

const simple = document.querySelector('#simple')
simple.src = `./assets/svg/simple-${theme}.png`

const online = document.querySelector('#online')
online.src = `./assets/svg/simple-${theme}.png`

const imagegroup = document.querySelector('#group-img')
imagegroup.src = `./assets/img/group-${theme}.png`

const element1 =document.createElement('div')
element1.setAttribute('class', 'xx')
element1.textContent = '346'


const el = document.querySelector('#root')
el.appendChild(element1)


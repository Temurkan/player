const link = document.querySelector('head link')
const adjust = document.querySelector('.fa-adjust')

if (localStorage.getItem('mode') == 'true') {
    link.setAttribute('href', 'style.css')
} else {
    link.setAttribute('href', 'dark.css')
}

adjust.addEventListener('click', () => {

    if (localStorage.getItem('mode') == 'true') {
        link.setAttribute('href', 'dark.css')
        localStorage.setItem('mode', 'false')
    } else {
        link.setAttribute('href', 'style.css')
        localStorage.setItem('mode', 'true')
    }

})
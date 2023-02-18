const button = document.querySelector('#btn')

button.addEventListener('click', () => {
    alert(`Ширина экрана: ${window.screen.width}\nВысота экрана: ${window.screen.height}`)
})


console.log(window.innerWidth, window.innerHeight, document.documentElement.clientWidth, document.documentElement.clientHeight)


import { injectAll } from "./modular.js";

function randomNumber(min, max) {
    return min + Math.random() * max
}

function randomInteger(min, max) {
    return min + Math.floor(Math.random() * max)
}

function animateSquares() {
    const bg_left = document.getElementById("bg-left")
    const left_svg = bg_left.querySelector("svg")
    const left_squares = left_svg.querySelectorAll("path")

    const bg_right = document.getElementById("bg-right")
    const right_svg = bg_right.querySelector("svg")
    const right_squares = right_svg.querySelectorAll("path")

    function animateLoop(interval) {
        gsap.to(left_squares[randomInteger(0, left_squares.length)], {
            opacity: randomNumber(0.2, 1),
        })
        gsap.to(right_squares[randomInteger(0, right_squares.length)], {
            opacity: randomNumber(0.2, 1),
        })
        setTimeout(animateLoop, interval, interval);
    }

    animateLoop(10)
}

document.addEventListener("DOMContentLoaded", () => {
    injectAll().then(animateSquares)
})
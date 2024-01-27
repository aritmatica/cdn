const CLASS_NAME = "fancy-button"

function fancyButton(elem) {
    const flair = elem.getElementsByClassName("flair")[0]

    gsap.set(flair, {
        scale: 0,
    })

    function mouseEnter(e) {
        gsap.to(flair, {
            duration: 0.3,
            overwrite: "auto",
            scale: 1,
            ease: "none",
        })
    }

    let firstEnter = true
    function mouseUpdate(e) {
        const rect = elem.getBoundingClientRect()

        const mouseX = e.clientX - rect.x - (rect.width / 2)
        const mouseY = e.clientY - rect.y - (rect.height / 2)

        let dur = 0.3

        if (firstEnter) {
            firstEnter = false
            dur = 0
        }

        gsap.to(flair, {
            duration: dur,
            overwrite: "auto",
            x: mouseX,
            y: mouseY,

            ease: "none",
        })
    }

    function mouseLeave(e) {
        firstEnter = true
        gsap.to(flair, {
            duration: 0.1,
            overwrite: "auto",
            scale: 0,
            ease: "none",
        })
    }


    elem.addEventListener("mouseenter", mouseEnter)
    elem.addEventListener("mousemove", mouseUpdate)
    elem.addEventListener("mouseleave", mouseLeave)
}

function scanForButtons(parentElem) {
    const buttons = parentElem.getElementsByClassName(CLASS_NAME)
    for (let i = 0; i < buttons.length; i++) {
        const elem = buttons[i]
        fancyButton(elem)
    }
}

function start() {
    scanForButtons(document)
}

document.addEventListener("DOMContentLoaded", start)

export { fancyButton, scanForButtons }
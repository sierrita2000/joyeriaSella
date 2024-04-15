const cargarEventos = () => {
    const animarElemento = ( elemento ) => {
        const top = window.scrollY
        const screenHeight = screen.height
        const offset = elemento.offsetTop
        const height = elemento.offsetHeight

        if ( ( top + (screenHeight / 2) ) > ( offset - height ) ) return true
        else return false
    }

    const crearAnimacion = ( elemento, keyframes, options ) => {
        elemento.animate(keyframes, options)
    }

    window.addEventListener("scroll", () => {
        if ( document.querySelector('.inicio') != null ) {
            if ( animarElemento( document.querySelector('.inicio__categorias') ) ) {
                let delay = 300
                document.querySelectorAll(".categorias__categoria").forEach(categoria => {
                    crearAnimacion(categoria, { transform: "translateY(0)", opacity: "100%", offset:1 }, {
                                                                                                            duration: 1000,
                                                                                                            delay: delay,
                                                                                                            fill: "forwards"
                                                                                                        }
                    )
                    delay = delay + 300
                })
            }

            if ( animarElemento( document.querySelector(".informacion") )) {
                crearAnimacion( document.querySelector(".informacion h2"), { transform: "translateX(0)", opacity: "100%", offset:1 }, {
                                                                                                                                        duration: 1000,
                                                                                                                                        delay: 200,
                                                                                                                                        fill: "forwards"
                                                                                                                                    }
                )
                crearAnimacion( document.querySelector(".informacion p"), { transform: "translateX(0)", opacity: "100%", offset:1 }, {
                                                                                                                                        duration: 1000,
                                                                                                                                        delay: 400,
                                                                                                                                        fill: "forwards"
                                                                                                                                    }
                )
            }
        }

        if ( animarElemento( document.querySelector(".inicio__footer") ) ) {
            crearAnimacion( document.querySelector(".footer__informacion__correo"), { transform: "translateY(0)", opacity: "100%", offset:1 }, { duration: 800, delay: 300, fill: "forwards" })
            crearAnimacion( document.querySelector(".footer__informacion__telefono"), { transform: "translateY(0)", opacity: "100%", offset:1 }, { duration: 800, delay: 600, fill: "forwards" })
            let delay = 900
            document.querySelectorAll(".red_social").forEach(red => {
                crearAnimacion( red, { transform: "translateY(0)", opacity: "100%", offset:1 }, { duration: 800, delay: delay, fill: "forwards" })
                delay = delay + 200
            })
            crearAnimacion( document.querySelector(".footer__mapa iframe"), { transform: "translateY(0)", opacity: "100%", offset:1 }, { duration: 800, delay: 600, fill: "forwards" })
            crearAnimacion( document.querySelector(".footer__logo__logo"), { transform: "translateX(4rem)", opacity: "100%", offset:1 }, { duration: 800, delay: 600, fill: "forwards" })
        }
    })
}

window.onload = cargarEventos
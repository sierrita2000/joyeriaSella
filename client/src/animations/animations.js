/**
 * Anima un elemento del DOM.
 * @param {Element} elemento 
 * @returns 
 */
const animarElemento = ( elemento ) => {
    const top = window.scrollY //Marca el scroll en vertical que se hace en px. Toma como referencia el borde superior de la pantalla.
    const screenHeight = screen.height //Constante. Indica el largo la altura de la pantalla.
    const offset = elemento.offsetTop //Indica la distancia que hay desde el borde superior del elemento hasta el borde superior del componente.
    const height = elemento.offsetHeight //Constante. Indica el alto del elemento.

    if ( ( top + (screenHeight / 2) ) > ( offset - height ) ) return true
    else return false
}

/**
 * Anima un elemento, recibiendo el elemento, un array con las animaciones, y las opciones.
 * @param {Element} elemento 
 * @param {Array} keyframes 
 * @param {Object} options 
 */
const crearAnimacion = ( elemento, keyframes, options ) => {
    elemento.animate(keyframes, options)
}

const cargarEventos = () => {

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

// Al cargar la página en la pantalla, se crean los eventos de escucha de ciertos elementos.
window.onload = cargarEventos
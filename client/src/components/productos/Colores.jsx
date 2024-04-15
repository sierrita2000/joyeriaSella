
export default function Colores ({ color, setColor }) {

    return (
        <div className="producto__botones_colores">
            <button className={`boton_color oro ${color === 'oro' && 'color_seleccionado'}`} onClick={() => setColor('oro')} ></button>
            <button className={`boton_color plata ${color === 'plata' && 'color_seleccionado'}`} onClick={() => setColor('plata')} ></button>
        </div>
    )
}
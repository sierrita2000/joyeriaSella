import Categorias from "../components/Inicio/Categorias"
import HeroImage from "../components/Inicio/HeroImage"

export default function Inicio () {

    return (
        <div className="inicio">
            <HeroImage />
            <section className="informacion">
                <h2>NUESTRAS JOYAS</h2>
                <p>En nuestra exclusiva tienda de joyas, nos enorgullecemos de ofrecer una exquisita selección de pulseras, collares y anillos elaborados con los más finos materiales de plata y oro. Cada pieza ha sido cuidadosamente diseñada y fabricada por expertos artesanos, garantizando la máxima calidad y atención al detalle en cada creación. <br/><br/> Nuestros clientes pueden estar seguros de que al adquirir una joya de nuestra tienda, están invirtiendo en piezas duraderas y atemporales que realzarán su belleza y estilo personal. Ya sea para una ocasión especial o para el uso diario, nuestras joyas de plata y oro son el complemento perfecto para cualquier look, añadiendo un toque de elegancia y sofisticación a cada outfit. Descubre la belleza y la distinción que solo nuestras joyas pueden ofrecerte, y déjate cautivar por la calidad y la exquisitez de nuestros productos.</p>
            </section>
            <Categorias />
        </div>
    )
}
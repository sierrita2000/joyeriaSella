
export default function Footer () {

    return (
        <div className="inicio__footer">
            <section className="footer__informacion">
                <p className="footer__informacion__correo">joyeria_sella@sella.com</p>
                <p className="footer__informacion__telefono">+34 999 999 999</p>
                <section className="footer__informacion__redes">
                    <div className="red_social"><i className="fa-brands fa-instagram"></i></div>
                    <div className="red_social"><i className="fa-brands fa-tiktok"></i></div>
                    <div className="red_social"><i className="fa-brands fa-facebook-f"></i></div>
                </section>
            </section>
            <section className="footer__mapa">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.7634595911168!2d-3.6020568236692583!3d40.43623635445137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422fea8401b789%3A0x245d0d64dad50ec4!2sEstadio%20C%C3%ADvitas%20Metropolitano!5e0!3m2!1ses!2ses!4v1712133864446!5m2!1ses!2ses" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
            <section className="footer__logo">
                <div className="footer__logo__logo">
                    <img src="../../sella_logo.png" />
                </div>
            </section>
        </div>
    )
}
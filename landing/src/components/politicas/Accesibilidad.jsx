import React from 'react'
import "../../styles/App.css";
import "../../styles/politicas/Politica.css";
import HeaderSeccion from "../general/HeaderSeccion";
import ScrollArriba from "../general/ScrollArriba";

function AvisoLegal() {
  return (
    <>
    <ScrollArriba/>
    <HeaderSeccion nombre="Declaración de Accesibilidad" />
    <section className='politica d-flex-col'>

        <article className="politica--apartado">
            <p>En Lamarta, estamos comprometidos a hacer accesible nuestro sitio de acuerdo al  Real Decreto 1112/2018, de 7 de septiembre, sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público.</p>
            <p>La presente declaración de accesibilidad se aplica al sitio web https://lamarta.es/</p>
            <h2>SITUACIÓN DE CUMPLIMIENTO</h2>
            <p>En Lamarta estamos comprometidos con la accesibilidad de nuestro sitio web para que todos los usuarios, incluyendo personas con discapacidades, tengan las mismas condiciones de acceso a nuestro sitio web. Hemos trabajado arduamente para garantizar que nuestro sitio cumpla con los estándares de accesibilidad establecidos en las Directrices de Accesibilidad para el Contenido Web (WCAG) 2.1 Nivel AA.</p>
            <p>Nuestro sitio web incluye características de accesibilidad como texto alternativo para imágenes, navegación por teclado, etiquetas de formulario claras y opciones de contraste de color para garantizar que los usuarios con discapacidades visuales puedan acceder fácilmente a nuestro contenido. Además, nuestro sitio web es compatible con tecnologías de asistencia como lectores de pantalla y software de reconocimiento de voz.</p>
            <h2>PREPARACIÓN DE LA SIGUIENTE DECLARACIÓN DE ACCESIBILIDAD</h2>
            <p>La presente declaración fue preparada el 15 de junio de 2023.</p> 
            <p>El método empleado para preparar la declaración ha sido una autoevaluación llevada a cabo por los desarrolladores del sitio web.</p>
            <p>Continuaremos monitoreando y mejorando continuamente la accesibilidad de nuestro sitio web para asegurarnos de que sea fácilmente accesible para todos los usuarios. Si tiene alguna sugerencia o problema para mejorar nuestra accesibilidad, no dude en ponerse en contacto con nosotros.</p>
            <h2>Propiedad intelectual e industrial</h2>
            <p>Los derechos de propiedad intelectual del contenido de las páginas web, su diseño gráfico y códigos son titularidad de Grupo Lamarta SL y, por tanto, queda prohibida su reproducción, distribución, comunicación pública, transformación o cualquier otra actividad que se pueda realizar con los contenidos de sus páginas web ni aun citando las fuentes, salvo consentimiento por escrito de Grupo Lamarta SL. Todos los nombres comerciales, marcas o signos distintos de cualquier clase contenidos en las páginas web de la Empresa son propiedad de sus dueños y están protegidos por ley.</p>
            <h2>OBSERVACIONES Y DATOS DE CONTACTO</h2>
            <p>Puede realizar comunicaciones sobre requisitos de accesibilidad (artículo 10.2.a del RD 1112/2018), como, por ejemplo:</p>
            <ul>
                <li>Informar sobre cualquier posible incumplimiento por parte de este sitio web</li>
                <li>Transmitir otras dificultades de acceso al contenido</li>
                <li>Formular cualquier otra consulta o sugerencia de mejora relativa a la accesibilidad del sitio web
                    Escribiendo un email a grupolamarta@gmail.com o a través del número de teléfono (+34) 664 36 86 61.</li>
            </ul>
            <p>Puede presentar:</p>
            <ul>
                <li>Queja relativa al cumplimiento de los requisitos del RD 1112/2018 o</li>
                <li>Solicitud de Información accesible relativa a:</li>
            </ul>
            <p>Contenidos que están excluidos del ámbito de aplicación del RD 1112/2018 según lo establecido por el artículo 3, apartado 4</p> 
            <p>Contenidos que están exentos del cumplimiento de los requisitos de accesibilidad por imponer una carga desproporcionada.</p> 
            <p>En la Solicitud de información accesible, se debe concretar, con toda claridad, los hechos, razones y petición que permitan constatar que se trata de una solicitud razonable y legítima.</p> 
            <h2>PROCEDIMIENTO DE APLICACIÓN</h2>
            <p>Si una vez realizada una solicitud de información accesible o queja, esta hubiera sido desestimada, no se estuviera de acuerdo con la decisión adoptada, o la respuesta no cumpliera los requisitos contemplados en el artículo 12.5, la persona interesada podrá iniciar una reclamación. Igualmente se podrá iniciar una reclamación en el caso de que haya transcurrido el plazo de veinte días hábiles sin haber obtenido respuesta.</p> 
            <p>La reclamación puede ser presentada través de la Instancia Genérica de la Sede electrónica del Ministerio de Asuntos Económicos y Transformación Digital, así como en el resto de opciones recogidas en la Ley 39/ 2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas. Las reclamaciones serán recibidas y tratadas por la Subdirección General de Inspección de Servicios del Ministerio.</p> 
            <h2>CONTENIDO OPCIONAL</h2>
            <p>Este portal está diseñado para poder cambiar el tamaño del texto y el color, así como el fondo de la página mediante las opciones de configuración estándar de los navegadores.</p>
            <p>Si desea cambiar el tamaño de letra del texto en los principales navegadores gráficos utilice los siguientes menús:</p>
            <ul>
                <li>Internet Explorer, Mozilla y Firefox: Ver - Tamaño del texto</li>
                <li>Opera: Ver - Zoom</li>
                <li>Safari: Ver - Hacer el texto más grande</li>
                <li>Chrome: Controla la página actual - Tamaño del texto</li>
                <li>Para modificar el tamaño de todo en la página:
                    <ul>
                        <li>Ctrl + + para aumentarlo</li>
                        <li>Ctrl + - para aumentarlo</li>
                        <li>Ctrl + 0 restaura el tamaño original del texto</li>
                        <li>Si lo que quiere es anular la hoja de estilos o modificar el color del texto, puede consultar la página How to Change Text Size or Colors de la WAI, que se puede leer traducida al español en ¿Cómo cambiar el tamaño del texto o colores?</li>
                    </ul>
                </li>
            </ul> 
        </article>

    </section>
    </>
  )
}

export default AvisoLegal

import React from 'react'
import "../../styles/App.css";
import "../../styles/politicas/Politica.css";
import HeaderSeccion from "../general/HeaderSeccion";
import ScrollArriba from "../general/ScrollArriba";

function AvisoLegal() {
  return (
    <>
    <ScrollArriba/>
    <HeaderSeccion nombre="Política de Cookies" />
    <section className='politica d-flex-col'>

        <article className="politica--apartado">
            <h2>¿Qué es una cookie?</h2>
            <p>Una cookie es un pequeño fichero de texto que se almacena en su dispositivo cuando visita una página Web. Su utilidad es que la Web sea capaz de recordar su visita cuando vuelva a navegar por esa página. Las cookies suelen almacenar información de carácter técnico, preferencias personales, personalización de contenidos, estadísticas de uso, enlaces a redes sociales, acceso a cuentas de usuario, etc. El objetivo de la cookie es adaptar el contenido de la Web a su perfil y necesidades, sin cookies los servicios ofrecidos por cualquier página se verían mermados notablemente.</p>
            <p>Las cookies sólo podrán ser leídas por el servicio o aplicación que las ha emitido y en ningún caso son archivos ejecutables, ni pueden propagarse, ni contener un virus.</p>
            <p>¿Qué tipología de cookies hay?</p>

            <p>Según la entidad que las gestione:</p>
            <ul>
                <li>Cookies propias: Son aquellas cookies que se envían al equipo terminal del usuario desde un equipo o dominio gestionado por el grupo y desde el que se presta el servicio solicitado por el usuario.</li>
                <li>Cookies de tercero: Son aquellas cookies que se envían al equipo terminal del usuario desde un equipo o dominio gestionado o no por el grupo, siendo un tercero la que trata los datos obtenidos a través de las cookies.</li>
            </ul>

            <p>En función de su duración las cookies pueden ser:</p>
            <ul>
                <li>De sesión. Son un tipo de cookies diseñadas para recabar y almacenar datos mientras el usuario accede a una página Web. Estas cookies no quedan almacenadas en el ordenador del usuario cuando caduca la sesión o este cierra el navegador.</li>
                <li>Persistentes. Son un tipo de cookies en el que los datos siguen almacenados en el ordenador del usuario y pueden ser accedidos y tratados cuando el usuario abandona la página Web y cuando se vuelva a conectar a ella. Estas cookies pueden ser borradas en cualquier momento por el Usuario.</li>
            </ul>

            <p>En función de la finalidad para la que se traten los datos obtenidos a través de las cookies:</p>
            <ul>
                <li>Cookies técnicas (necesarias).</li>
                <p>Estas cookies son necesarias para que la página Web y sus funciones básicas puedan operar correctamente. Sin estas cookies no es posible poner a disposición determinados servicios, como la navegación segura, identificación del usuario, realizar la inscripción o participación en un evento.</p>

                <li>Cookies analíticas (estadística).</li>
                <p>Estas cookies recopilan información sobre el uso que se hace de la página Web, qué páginas se visitan más, con qué frecuencia, si dan mensajes de error. De ese modo podemos medir la actividad de nuestro sitio Web, por ejemplo para identificar las secciones más populares de nuestra Web. Estas cookies no recogen información que identifique al usuario, solo se emplea para mejorar el funcionamiento de una página Web.</p>

                <li>Cookies de personalización (preferencias).</li>
                <p>Estas cookies hacen posible que la página Web recuerde las preferencias, como el nombre de usuario, el idioma, ubicación geográfica, por tanto su finalidad es ofrecer funciones mejoradas y personales. Por ejemplo, nuestra página Web podría ofrecer información solo disponible en una ubicación geográfica, utilizando para ello una cookie que guardar la provincia en la que se encuentra el usuario Web. Tenga en cuenta que si deshabilita estas cookies, no podrá utilizar todas las funciones interactivas de nuestra página Web.</p>

                <li>Cookies de publicidad (marketing).</li>
                <p>Son aquéllas que permiten la gestión de los espacios publicitarios que hay en una página Web. Estas cookies se utilizan para mostrar los anuncios más relevantes de acuerdo a los intereses del usuario. También se usan para limitar el número de veces que el usuario ve un anuncio, así como para ayudar a medir la efectividad de una campaña publicitaria.</p>

                <li>Cookies de publicidad comportamental (marketing).</li>
                <p>Estas cookies almacenan información del comportamiento de los usuarios obtenida a través de la observación de sus hábitos de navegación, lo que permite la creación de perfiles basados en hábitos del usuario para mostrar publicidad en función del mismo.</p>
            </ul>
        </article>

        <article className="politica--apartado">
            <h2>¿Qué tipo de cookies utiliza GRUPO LAMARTA, S.L ?</h2>
            <p>Necesarias</p>
            <p>Estas cookies son necesarias para que la página Web funcione, por lo que no se pueden desactivar. Por lo general, solo se configuran en respuesta a sus acciones realizadas al solicitar servicios, como establecer sus preferencias de privacidad, iniciar sesión o completar formularios, esto último no ocurre en GRUPO LAMARTA, S.L porque no tenemos registro de usuarios, por lo tanto tampoco hay inicio de sesión de usuario, ni usamos formularios de recogida de datos.</p>

            <p>Preferencias</p>
            <p>Las cookies de preferencias permiten a la página Web recordar información que cambia la forma en que la página se comporta o el aspecto que tiene, como su idioma preferido o la región en la que usted se encuentra.</p>

            <p>Estadística</p>
            <p>Las cookies estadísticas ayudan a los propietarios de páginas Web a comprender cómo interactúan los visitantes con las páginas Web reuniendo y proporcionando información de forma anónima.</p>
        </article>

        <article className="politica--apartado">
            <h2>¿Qué cookies utiliza GRUPO LAMARTA, S.L ?</h2>
            <table>
                <thead>
                    <td>Nombre de cookie</td>
                    <td>Propósito</td>
                    <td>Caducidad</td>
                </thead>
                <tbody>
                    <tr>
                        <td>Google Analytics</td>
                        <td>Almacena cookies para poder elaborar estadísticas sobre el tráfico y volumen de visitas de esta web. Al utilizar este sitio web está consintiendo el tratamiento de información acerca de usted por Google. Por tanto, el ejercicio de cualquier derecho en este sentido deberá hacerlo comunicando directamente con Google.</td>
                        <td>No caduca</td>
                    </tr>
                </tbody>
            </table>
        </article>

        <article className="politica--apartado">
            <h2>Información detallada del tratamiento de los Datos Personales</h2>
            <p>Se recogen Datos Personales para las siguientes finalidades y utilizando los siguientes servicios:</p>
            <ul>
                <li>Estadísticas</li>
                <p>Los servicios contenidos en esta sección permiten al Titular monitorizar y analizar el tráfico web y pueden ser utilizados para rastrear el comportamiento del Usuario.</p>
            </ul>
        </article>

        <article className="politica--apartado">
            <h2>Google Analytics (Google Inc.)</h2>
            <p>Google Analytics es un servicio de análisis web prestado por Google Inc. (“Google”). Google utiliza los Datos recogidos para rastrear y examinar el uso de esta Página Web, para preparar informes de sus actividades y compartirlos con otros servicios de Google. Google puede utilizar los Datos recogidos para contextualizar y personalizar los anuncios de su propia red de publicidad.</p>
            <p>Datos Personales recogidos: Cookie y Datos de Uso. Lugar de tratamiento: EE.UU. – Política de privacidad (https://policies.google.com/privacy?hl=es) –Opt Out (https://tools.google.com/dlpage/gaoptout?hl=es)</p>
        </article>

        <article className="politica--apartado">
            <h2>Interacción con redes sociales y plataformas externas</h2>
            <p>Este tipo de servicios permiten interactuar con redes sociales u otras plataformas externas directamente desde las páginas de esta Página Web.</p>
            <p>Las interacciones y la información obtenida por esta Página Web siempre estarán sometidas a la configuración de privacidad del Usuario en cada red social.</p>
            <p>En caso de que se instale un servicio que permita interactuar con redes sociales, es posible que aunque los Usuarios no utilicen el servicio, éste recoja datos de tráfico web relativos a las páginas en las que estén instalados.</p>
            <p>Este tipo de servicios permiten visualizar contenidos alojados en plataformas externas directamente desde las páginas de esta Página Web e interactuar con estos.</p>
            <p>En caso de que se instale uno de estos servicios, es posible que aunque los Usuarios no utilicen el servicio, ésterecoja datos de tráfico web relativos a las páginas en las que estén instalados.</p>
        </article>

        <article className="politica--apartado">
            <h2>Widget Vídeo YouTube (Google Inc.)</h2>
            <p>YouTube es un servicio de visualización de vídeo prestado por Google Inc. que permite a esta Página Web incorporar tales contenidos en las propias páginas.</p>
            <p>Datos Personales recogidos: Cookie y Datos de Uso.</p>
            <p>Lugar de tratamiento: EE.UU. – https://www.youtube.com/intl/ALL_es/howyoutubeworks/user-settings/privacy/</p>
        </article>

        <article className="politica--apartado">
            <h2>Whatsapp (Whatsapp, LLC)</h2>
            <p>Whatsapp es una aplicación de mensajería instantánea para teléfonos inteligentes.</p>
            <p>Datos Personales recogidos: se recaba el número de teléfono móvil, nombre de perfil y de forma opcional, foto de perfil y alguna información personal</p>
            <p>Lugar del tratamiento: Estados Unidos – https://www.whatsapp.com/legal/privacy-policy/?lang=es</p>
        </article>

        <article className="politica--apartado">
            <h2>Widget Google Maps (Google Inc.)</h2>
            <p>Google Maps es un servicio de visualización de mapas prestado por Google Inc. que permite a esta Página Web incorporar tales contenidos en las propias páginas.</p>
            <p>Datos Personales recogidos: Cookie y Datos de Uso.</p>
            <p>Lugar de tratamiento: EE.UU. – https://policies.google.com/technologies/location-data?hl=en-US</p>
        </article>

        <article className="politica--apartado">
            <h2>Widget Instagram (Instagram, Inc.)</h2>
            <p>Instagram es un servicio de visualización de imágenes operado por Instagram, Inc. que permite a esta Aplicación integrar este contenido en sus propias páginas.</p>
            <p>Datos Personales recogidos: Cookies y Datos de uso.</p>
            <p>Lugar del tratamiento: Estados Unidos – https://help.instagram.com/519522125107875/?maybe_redirect_pol=0</p>
        </article>

        <article className="politica--apartado">
            <h2>¿Cómo administrar las cookies?</h2>
            <p>El usuario tiene la opción de permitir, bloquear o eliminar las cookies instaladas en su dispositivo a través del panel de configuración.</p>
            <p>Además, el usuario tiene la opción de permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su terminal. Para obtener más información, consulte las instrucciones y manuales de su navegador para ampliar esta información:</p>
            <ul>
                <li>Google Chrome: https://support.google.com/chrome/answer/95647?hl=es</li>
                <li>Mozilla Firefox: https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias?redirectslug=habilitar-y-deshabilitar-cookies-que-los-sitios-we&amp;redirectlocale=es</li>
                <li>Internet Explorer: https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d</li>
                <li>Safari: https://support.apple.com/es-es/guide/safari/sfri11471/mac</li>
                <li>Safari para IOS (iPhone y iPad): https://support.apple.com/es-es/HT201265</li>
                <li>Chrome para Android: https://support.google.com/chrome/answer/114662?hl=es&amp;visit_id=637400243735165235-3593560368&amp;rd=1</li>
            </ul>
            <p>No obstante, la inhabilitación de las cookies podría modificar el funcionamiento del sitio web. En caso de bloquear el uso de cookies en su navegador es posible que algunos servicios o funcionalidades del sitio web no estén disponibles.</p>
        </article>

        <article className="politica--apartado">
            <h2>Actualización de la política de cookies</h2>
            <p>En el caso de que las características o fines de uso de las cookies de esta página web sean modificadas, se le informará acerca de esos cambios con el fin de recabar nuevamente su consentimiento en aquellos casos en que fuese necesario.</p>
        </article>
    </section>
    </>
  )
}

export default AvisoLegal

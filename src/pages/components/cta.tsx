import Link from "next/link"

export default function Cta() {
    return (
        <section className="text-gray-600 body-font min-h-screen w-screen">
            <div className="container px-5 py-24  flex items-center justify-center">
                <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                    <img className="w-1/4 h-auto rounded-full overflow-hidden" src="Info.png" alt="" />
                    <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">No dudes mas y contacta a los profesionales en desarrollo</h1>
                    <a href="https://wa.me/50683297470" target="_blank" className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                    >Contactenos</a>
                </div>
            </div>
            <div className="container px-5 py-24  flex items-center justify-center">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                        Generador de palabras clave SEO
                    </h1>
                    <p>
                        Apartado el cual perimitira generar las palabras claves
                    </p>
                    <div className="h-1 w- bg-indigo-800 rounded"></div>
                </div>
                <nav>
                    <ul className="flex wrap-a">
                        <li><Link className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" href="../indexGPT">Generador de claves</Link></li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}
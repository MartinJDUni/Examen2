import Link from "next/link"

export default function Header() {
    return (
        <header id="Head" className="text-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img className="w-25 h-20" src="Logo.png" alt="" />
                </a>
                <nav id="Menu" className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <ul className="flex wrap-a">
                        <li className="m-4"> <Link href="../indexGPT">Generador de claves</Link></li>
                        <li className="m-4"> <Link href="/">Call to action</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
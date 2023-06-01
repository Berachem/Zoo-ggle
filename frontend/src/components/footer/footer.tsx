/// Footer.tsx
import Logo from "../../assets/images/zooggle_lion_logo_blue.png";

export default function Footer() {
    return (
       
        <section className="bg-white">
            <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                    <div className="px-5 py-2">
                        <a href="/" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                            Accueil
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="/jouer" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                            Jouer
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="mailto:zooggle@gmail.com" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                            Contact
                        </a>
                    </div>
                </nav>
                <div className="flex justify-center mt-8 space-x-6">
                    <img src={Logo} alt="Logo" className="w-8 h-8" />
                </div>
                <p className="mt-8 text-base leading-6 text-center text-gray-400">
                    © 2023 Zoo-ggle. All rights reserved.
                </p>
            </div>
        </section>

    );
}
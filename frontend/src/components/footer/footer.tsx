/// Footer.tsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/zooggle_lion_logo_blue.png";

export default function Footer() {
    return (
        <footer className="bg-gray-800">
            Salut les amis
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <a href="#" className="flex items-center py-4 px-2">
                            <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
                            <span className="font-semibold text-gray-500 text-lg">
                                Zoo-ggle
                            </span>
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-800 text-gray-100">
                    <div className="space-y-4 text-xs text-gray-400">
                        <h5 className="font-bold">A PROPOS</h5>
                        <p>Comment ça marche</p>
                        <p>Carrières</p>
                        <p>Investisseurs</p>
                        <p>Options de voyage</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
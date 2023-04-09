// tailwindCSS

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

export default function Page404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-9xl font-black text-white">404</h1>
            <h1 className="text-6xl mb-14 text-white">Page introuvable</h1>
            <Link to="/">
                <Button color="light-blue"  size="lg" >
                    Retourner à l'accueil
                </Button>
            </Link>
        </div>

       
        
    )
};




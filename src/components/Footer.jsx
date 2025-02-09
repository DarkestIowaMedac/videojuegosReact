import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-lg font-bold mb-2">
          GameCritique
        </p>
        <p className="text-sm mb-4">
          &copy; {new Date().getFullYear()} GameCritique. Todos los derechos reservados.
        </p>
        <p className="text-xs mb-4">
          <span property="dct:title">Games Critique</span> by <span property="cc:attributionName">DarkestIowa666</span> is licensed under 
          <a 
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" 
            target="_blank" 
            rel="license noopener noreferrer" 
            className="inline-block"
          >
            CC BY-NC-SA 4.0
            <img 
              className="h-5 inline-block ml-1 align-bottom" 
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" 
              alt="CC Icon" 
            />
            <img 
              className="h-5 inline-block ml-1 align-bottom" 
              src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" 
              alt="BY Icon" 
            />
            <img 
              className="h-5 inline-block ml-1 align-bottom" 
              src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" 
              alt="NC Icon" 
            />
            <img 
              className="h-5 inline-block ml-1 align-bottom" 
              src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" 
              alt="SA Icon" 
            />
          </a>
        </p> 
        <div className="flex justify-center space-x-6 mt-4">
          <a href="/about" className="hover:text-gray-400 transition duration-300">Sobre Nosotros</a>
          <a href="/contact" className="hover:text-gray-400 transition duration-300">Contacto</a>
          <a href="/privacy" className="hover:text-gray-400 transition duration-300">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
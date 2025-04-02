import {
  IoGlobeOutline,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
} from "react-icons/io5";

import navFooter from "../navFooter.json";

/* TODO: Remove duplicated functions */

const handleLanguageClick = () => {
    alert("Open Language Menu");
  };
  
  const handleCurrencyClick = () => {
    alert("Open Currency Menu");
  };

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-700 text-sm">
      <section className="container-7xl py-10 sm:grid sm:grid-cols-3 sm:gap-4">
        {navFooter.map((item, index) => (
          <div key={index}>
            {index != 0 && <hr className="border-gray-300 my-4 sm:hidden" />}
            <h3 className="font-bold text-lg">{item.category}</h3>
            <nav className="mt-4">
              <ul>
                {item.links.map((link, index) => (
                  <li key={index}>
                    <a className="block py-1" href={link.url}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ))}
      </section>

      <hr className="container-7xl border-gray-300" />

      <section className="container-7xl flex flex-col md:flex-row-reverse items-center justify-between gap-4 py-3">
        <nav>
          <ul className="flex items-center">
            <li>
              <button
                aria-label="Open language menu"
                className="btn-3 rounded-md flex items-center px-3 py-2 gap-2"
                onClick={() => handleLanguageClick()}
              >
                <IoGlobeOutline aria-hidden="false" />
                <span aria-hidden="false">English (US)</span>
              </button>
            </li>
            <li>
              <button
                aria-label="Open currency menu"
                className="btn-3 rounded-md flex items-center px-3 py-2 gap-2"
                onClick={() => handleCurrencyClick()}
              >
                <span aria-hidden="true">€ EUR</span>
              </button>
            </li>
            <li>
              <a
                className="btn-3 rounded-md block p-1 text-2xl"
                href="#facebook"
                aria-label="Facebook"
              >
                <IoLogoFacebook aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                className="btn-3 rounded-md block p-1 text-2xl"
                href="#twitter"
                aria-label="Twitter"
              >
                <IoLogoTwitter aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                className="btn-3 rounded-md block p-1 text-2xl"
                href="#instagram"
                aria-label="Instagram"
              >
                <IoLogoInstagram aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        <nav>
          <ul className="flex flex-col sm:flex-row items-center">
            <li>© 2025 Edalgrin</li>
            <li>
              <a className="block py-2 px-3" href="#Terms">
                Terms
              </a>
            </li>
            <li>
              <a className="block py-2 px-3" href="#Sitemap">
                Sitemap
              </a>
            </li>
            <li>
              <a className="block py-2 px-3" href="#Privacy">
                Privacy
              </a>
            </li>
            <li>
              <a className="block py-2 px-3" href="#Your-privacy-choices">
                Your privacy choices
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;

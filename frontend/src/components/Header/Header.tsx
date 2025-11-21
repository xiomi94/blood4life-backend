// components/Header/Header.tsx
import {useLocation, Link} from 'react-router-dom';
import Logo from "../../images/LogoShadow.webp";

function Header() {
  const location = useLocation();

  return (
    <div className="flex flex-row h-20 w-full bg-red-200 items-center justify-between">
      {(location.pathname === '/register' || location.pathname === '/registerbloodDonor' || location.pathname === '/registerhospital') ? (
        <>
          <div className="flex flex-row w-full justify-between p-3 items-center">
            <Link to="/index">
              <img src={Logo} alt="Logo" className="h-14 w-auto cursor-pointer hover:opacity-80 transition-opacity"/>
            </Link>
            <Link
              to="/index"
              className="inline-block items-center h-fit px-4 py-2 rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white transition-colors font-medium whitespace-nowrap"
            >
              Inicio
            </Link>
          </div>
        </>
      ) : (
        <>
          <div></div>
          {(location.pathname === '/index' || location.pathname === '/') && (
            <div className="flex items-center space-x-3 pr-4">
              <Link
                to="/login"
                className="inline-block items-center px-4 py-2 rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white transition-colors font-medium whitespace-nowrap"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="inline-block items-center px-4 py-2 rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white transition-colors font-medium whitespace-nowrap"
              >
                Registrarse
              </Link>
            </div>
          )}
          {(location.pathname === '/login' || location.pathname === '/registerbloodDonor' || location.pathname === '/registerhospital') && (
            <div className="flex items-center space-x-3 pr-4">
              <Link
                to="/index"
                className="inline-block items-center px-4 py-2 rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white transition-colors font-medium whitespace-nowrap"
              >
                Inicio
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Header;
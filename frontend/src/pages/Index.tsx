import Logo from "../images/LogoShadow.webp"
import {Link} from "react-router";

function Index() {
  return (
    <>
      <div className="flex flex-row justify-center aspect-auto">
        <img className="m-5 w-sm h-sm" src={Logo} alt="Logo"/>
      </div>
      <div className="flex flex-row items-center justify-around ">
        <li className="list-none">
          <Link to="/bloodDonors">
            <button
              type="button"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Donantes
            </button>
          </Link>
        </li>
        <li className="list-none">
          <Link to="/hospitals">
            <button
              type="button"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hospitales
            </button>
          </Link>
        </li>
      </div>
    </>
  )
}

export default Index;
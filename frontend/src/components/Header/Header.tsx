import User from "../../images/User.png";

function Header() {
  return (
    <>
      <div className="flex flex-row  h-20 w-full bg-red-200">
        <div className="w-full"/>
        <div className="content-center">
          Acceder
        </div>
        <img
          className="m-5"
          src={User}
          alt="User"/>
      </div>
    </>
  )
}

export default Header;
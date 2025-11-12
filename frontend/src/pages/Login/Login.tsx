import Logo from "../../images/LogoShadow.webp";
import LoginForm from "./../../components/LoginForm.tsx";


function Login() {
  return (
    <>
      <div className="flex flex-row justify-center aspect-auto">
        <img className="m-5 w-sm h-sm" src={Logo} alt="Logo"/>
      </div>
      <div className="flex flex-col items-center w-screen h-auto gap-4">
        <LoginForm/>
      </div>
    </>
  )
}

export default Login;
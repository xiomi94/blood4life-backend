function LoginForm() {
  return (
    <>
       <form className="flex flex-col w-[600px] h-auto rounded-xl text-2xl gap-2">
         Nombre de usuario
         <input type="text" className="border-white text-lg px-1 py-7px drop-shadow-md rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"/>
       </form>
      <form className="flex flex-col w-[600px] h-auto rounded-xl text-2xl gap-2">
         Contraseña
        <div className="flex flex-row">
        <input type="text" className="border-white text-lg px-1 py-7px drop-shadow-md rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"/>

        </div>
      </form>
      <button type="submit" className="text-white font-bold rounded-sm mt-8 px-5 py-2 drop-shadow-md bg-indigo-500">
        Iniciar sesión
      </button>
    </>
  )
}

export default LoginForm;
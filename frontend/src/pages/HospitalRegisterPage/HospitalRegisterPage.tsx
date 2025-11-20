import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import ImageUpload from "../../components/ImageUpload/ImageUpload.tsx";

interface Hospital {
  id: number;
  cif: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
}

interface HospitalFormData {
  cif: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const HospitalRegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<HospitalFormData>({
    cif: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentHospital, setCurrentHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    const hospitalData: Hospital = {
      id: 1,
      cif: 'A12345678',
      name: 'Hospital General',
      address: 'Calle Principal 123',
      email: 'hospital@ejemplo.com',
      phoneNumber: '+34 912 345 678'
    };
    setCurrentHospital(hospitalData);

    setFormData({
      cif: hospitalData.cif,
      name: hospitalData.name,
      address: hospitalData.address,
      email: hospitalData.email,
      phoneNumber: hospitalData.phoneNumber,
      password: ''
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentHospital) {
      alert('No hay datos del hospital disponibles');
      return;
    }

    setLoading(true);

    try {
      console.log('Actualizando hospital:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCurrentHospital(prev => prev ? {
        ...prev,
        cif: formData.cif,
        name: formData.name,
        address: formData.address,
        email: formData.email,
        phoneNumber: formData.phoneNumber
      } : null);

      alert('Datos del hospital actualizados exitosamente');
    } catch (error) {
      console.error('Error actualizando hospital:', error);
      alert('Error al actualizar los datos del hospital');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    if (currentHospital) {
      setFormData({
        cif: currentHospital.cif,
        name: currentHospital.name,
        address: currentHospital.address,
        email: currentHospital.email,
        phoneNumber: currentHospital.phoneNumber,
        password: ''
      });
    }
    setShowPassword(false);
  };

  if (!currentHospital) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando datos del hospital...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full items-center bg-gray-100 min-h-screen">
      <div className="flex flex-col w-11/12 max-w-6xl">

        {/* Sección Superior: Formulario e Imagen */}
        <div className="flex flex-col lg:flex-row gap-8 pt-10">

          {/* Formulario */}
          <div className="flex-1">
            <form
              onSubmit={handleUpdate}
              className="flex flex-col p-6 bg-gray-200 rounded-2xl drop-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Gestionar datos del hospital
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <div className="w-full">
                  <label htmlFor="cif" className="block text-md font-bold text-black mb-1">
                    CIF
                  </label>
                  <input
                    type="text"
                    id="cif"
                    name="cif"
                    value={formData.cif}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 bg-white drop-shadow"
                    placeholder="Ingrese el CIF *"
                  />
                </div>
                <div className="flex justify-center">
                  <div className="w-full">
                    <label htmlFor="name" className="w-fit block text-md font-bold text-black mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 bg-white drop-shadow"
                      placeholder="Ingrese el nombre *"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-end">
                  <div className="flex flex-col justify-end w-full">
                    <label htmlFor="address" className="block text-md font-bold text-black mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 bg-white drop-shadow"
                      placeholder="Ingrese la dirección *"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="block text-md font-bold text-black mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 bg-white drop-shadow"
                    placeholder="Ingrese el email"
                  />
                </div>
                <div className="flex justify-center">
                  <div className="w-full">
                    <label htmlFor="phoneNumber" className="block text-md font-bold text-black mb-1">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 bg-white drop-shadow"
                      placeholder="Ingrese el teléfono"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-end">
                  <div className="flex flex-col justify-end w-full">
                    <label htmlFor="password" className="block text-md font-bold text-black mb-1">
                      Contraseña
                    </label>
                    <div className="relative w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 bg-white drop-shadow pr-10"
                        placeholder="Ingrese la contraseña *"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                          ) : (
                            <svg className="h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed drop-shadow"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>) : 'Actualizar datos'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Restablecer
                </button>
              </div>
            </form>
          </div>

          {/* Componente de Imagen */}
          <div className="lg:w-96">
            <ImageUpload/>
          </div>
        </div>

        {/* Información Actual del Hospital */}
        <div className="flex flex-col w-full h-fit pt-10 drop-shadow">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Información actual del hospital</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase">CIF</h3>
                  <p className="text-lg font-semibold text-gray-900">{currentHospital.cif}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase">Nombre</h3>
                  <p className="text-lg font-semibold text-gray-900">{currentHospital.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase">Dirección</h3>
                  <p className="text-lg font-semibold text-gray-900">{currentHospital.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase">Email</h3>
                  <p className="text-lg font-semibold text-gray-900">{currentHospital.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase">Teléfono</h3>
                  <p className="text-lg font-semibold text-gray-900">{currentHospital.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de Inicio */}
          <div className="flex flex-col items-center m-5">
            <li className="list-none">
              <Link to="/index">
                <button
                  type="button"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Inicio
                </button>
              </Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegisterPage;
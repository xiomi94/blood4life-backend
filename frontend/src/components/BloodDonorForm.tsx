import type {BloodDonor} from "../models/BloodDonor.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import LabelForm from "./LabelForm.tsx";
import Button from "./Button.tsx";


interface Props {
  bloodDonor?: BloodDonor | null;
  onSubmit: (data: BloodDonor) => void;
  onCancel: () => void;
}

export default function BloodDonorForm(props: Props) {
  const [formData, setFormData] = useState<BloodDonor>({
    dni: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
  });

  useEffect(() => {
    if (props.bloodDonor) {
      setFormData({...props.bloodDonor});
    } else {
      setFormData({
        dni: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        password: '',
      });
    }
  }, [props.bloodDonor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(formData);
  }

  const buttonCancelRender = props.bloodDonor ? <Button onButtonClick={props.onCancel}>Cancelar</Button> : <></>
  const passwordInputRender = !props.bloodDonor ? <><LabelForm>Contraseña:</LabelForm>
    <input name='password' value={formData.password} onChange={handleChange} placeholder='Contraseña' type='password' required/></> : <></>

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <LabelForm>Dni:</LabelForm>
      <input name='dni' value={formData.dni} onChange={handleChange} placeholder='DNI' required/>
      <LabelForm>Nombre:</LabelForm>
      <input name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Nombre' required/>
      <LabelForm>Apellidos:</LabelForm>
      <input name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Apellidos' required/>

      <LabelForm>Genero:</LabelForm>
      <select name='gender' value={formData.gender} onChange={handleChange} required>
        <option value=''>Seleccione género</option>
        <option value='M'>Masculino</option>
        <option value='F'>Femenino</option>
        <option value='N'>No quiero especificarlo</option>
      </select>

      <LabelForm>Email:</LabelForm>
      <input name='email' value={formData.email} onChange={handleChange} placeholder='Email' type='email' required/>
      <LabelForm>Telefono:</LabelForm>
      <input name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} placeholder="Teléfono" required/>
      <LabelForm>Fecha de nacimiento:</LabelForm>
      <input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" required/>
      { passwordInputRender }

      <Button type='submit'>
        {props.bloodDonor ? 'Actualizar donante' : 'Registrar donante'}
      </Button>
      {buttonCancelRender}
    </form>
  )

}
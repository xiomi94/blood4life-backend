import Button from "./Button.tsx";
import type {BloodDonor} from "../models/BloodDonor.ts";

interface Props {
  bloodDonor: BloodDonor,
  onClickEdit: (bloodDonor: BloodDonor) => void,
  onClickDelete: (bloodDonor: BloodDonor) => void
}

function BloodDonorTableItem({bloodDonor, onClickEdit, onClickDelete}: Props) {

  const handleEditTableButton = () => {
    onClickEdit(bloodDonor);
  }



  const handleDeleteTableButton = () => {
    onClickDelete(bloodDonor);
  }

  return (
    <tr>
      <td className="border text-center">{bloodDonor.dni}</td>
      <td className="border text-center">{bloodDonor.firstName}</td>
      <td className="border text-center">{bloodDonor.lastName}</td>
      <td className="border text-center">
        <Button onButtonClick={() => handleEditTableButton()}>Editar</Button>
        <Button backgroundColor='red-500' textColor="white" onButtonClick={() => handleDeleteTableButton()}>Borrar</Button>
      </td>
    </tr>
  )
}

export default BloodDonorTableItem
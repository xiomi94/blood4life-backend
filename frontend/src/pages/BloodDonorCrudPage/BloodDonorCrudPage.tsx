import {useEffect, useState} from 'react'
import {bloodDonorService} from "../../services/bloodDonorService.ts";
import type {BloodDonor} from "../../models/BloodDonor.ts";
import BloodDonorTableItem from "../../components/BloodDonorTableItem.tsx";
import BloodDonorForm from "../../components/BloodDonorForm.tsx";


function BloodDonorCrudPage() {

  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>([]);
  const [selectedBloodDonor, setSelectedBloodDonor] = useState<null | BloodDonor>(null);

  const onBloodDonorTableItemClickEdit = (bloodDonor: BloodDonor) => {
    setSelectedBloodDonor(bloodDonor);
  }

  const onBloodDonorTableItemClickDelete = (bloodDonor: BloodDonor) => {
    bloodDonorService.delete(bloodDonor.id!).then(() => {
      const newStateBloodDonors = bloodDonors.filter((bloodDonorIterate) => {
        return bloodDonorIterate.id != bloodDonor.id
      });
      setBloodDonors(newStateBloodDonors)
    })
  }

  const bloodDonorFormOnSubmit = (data: BloodDonor) => {
    console.log(data);
  }

  const bloodDonorFormOnCancel = () => {
    setSelectedBloodDonor(null)
  }

  const bloodDonorRenderList = bloodDonors.map((bloodDonor) => {
    return <BloodDonorTableItem key={bloodDonor.id} bloodDonor={bloodDonor} onClickEdit={onBloodDonorTableItemClickEdit}
                                onClickDelete={onBloodDonorTableItemClickDelete}/>
  })

  useEffect(() => {
    bloodDonorService.getAll().then((response) => {
      setBloodDonors(response.data);
    })
  }, []);

  return (
    <div className="min-w-6xl max-w-6xl">
      <BloodDonorForm onCancel={bloodDonorFormOnCancel} onSubmit={bloodDonorFormOnSubmit}
                      bloodDonor={selectedBloodDonor}/>
      <table className="w-full border border-collapse">
        <thead>
        <tr>
          <th className="border">dni</th>
          <th className="border">firstName</th>
          <th className="border">lastName</th>
          <th className="border">Acciones</th>
        </tr>
        </thead>
        <tbody>
        {bloodDonorRenderList}
        </tbody>
      </table>
    </div>
  )

}

export default BloodDonorCrudPage
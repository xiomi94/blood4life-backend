import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router';
import BloodDonorCrudPage from "./pages/BloodDonorCrudPage/BloodDonorCrudPage.tsx";
import HospitalCrudPage from "./pages/HospitalCrudPage/HospitalCrudPage.tsx";

function App() {

  return (
    <>
      <main className="flex justify-center">
        <BrowserRouter>
          <Routes>
            <Route path='/bloodDonors' element={<BloodDonorCrudPage/>}/>
            <Route path='/hospitals' element={<HospitalCrudPage/>}/>
          </Routes>
        </BrowserRouter>
      </main>

    </>
  )
}

export default App

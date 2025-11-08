import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router';
import BloodDonorCrudPage from "./pages/BloodDonorCrudPage/BloodDonorCrudPage.tsx";
import HospitalCrudPage from "./pages/HospitalCrudPage/HospitalCrudPage.tsx";
import Index from "./pages/Index.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {

  return (
    <>
      <main>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Index/>}/>
            <Route path='/index' element={<Index/>}/>
            <Route path='/bloodDonors' element={<BloodDonorCrudPage/>}/>
            <Route path='/hospitals' element={<HospitalCrudPage/>}/>
          </Routes>
        </BrowserRouter>
        <Footer/>
      </main>
    </>
  )
}

export default App

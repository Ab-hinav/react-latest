import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PetAdoption from './pages/adoptionForm';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import SubmittedForm from './pages/submittedForm';

export type PetData = {
  name: string,
  type: string,
  breed: string,
  age: number,
  yourName: string,
  email: string,
  phone: string,
}


function App() {

  const [petData, setPetData] = useState<PetData[]>([]);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/adoptionform" replace />} />
        <Route path="/adoptionform" element={< PetAdoption setData={setPetData} />} />
        <Route path="/submit" element={<SubmittedForm data={petData} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App

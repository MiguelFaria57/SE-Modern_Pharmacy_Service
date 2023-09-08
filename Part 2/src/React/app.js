import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import PrescriptionManager from './prescription_manager';
import FaceRecognition from './face_recognition';
import Payment from './payment';
import Robot from './robot';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/prescription_manager" element={<PrescriptionManager />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment/face_recognition" element={<FaceRecognition />} />
      <Route path="/robot" element={<Robot />} />
    </Routes>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IsUserLoggedIn from './isuserloggedin';
import Logout from './logout';
import Prescription from './prescriptions';
import medicines from './medicines';

const PrescriptionManager = () => {
    const loggedIn = IsUserLoggedIn();

    const navigate = useNavigate();
    const gotoLogin = () => {
      navigate('/login');
    };
    const gotoPayment = () => {
        navigate('/payment');
    };

    const [showPrescription, setShowPrescription] = useState(false); // State variable to control the visibility
    const handleShowPrescription = () => {
        setShowPrescription(!showPrescription); // Set the visibility to true when the button is clicked
        if (!showPrescription)
            navigate('/prescription_manager');
    };

    const [selectedVersionsArray, setSelectedVersionsArray] = useState([]);
    const handleSelectedVersions = (versionsArray) => {
        setSelectedVersionsArray(versionsArray);
    };

    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        let totalPrice = 0;
    
        selectedVersionsArray.forEach((version) => {
          const medicine = medicines.find((item) => item.id === version.medicineId);
          if (medicine) {
            const { original_price, generic_price } = medicine;
            const pd_price = version.version === 'original' ? original_price : version.version === 'generic' ? generic_price : 0;
            totalPrice += pd_price;
          }
        });
    
        setTotalPrice(totalPrice);
      }, [selectedVersionsArray, showPrescription]);

      return (
        <>
          <div>
            {loggedIn ? (
              <button onClick={Logout}>Logout</button>
            ) : (
              <button onClick={gotoLogin}>Login</button>
            )}
            <br />
            <h1>Prescription Manager</h1>
            <p>This is where you can see prescriptions, select types of medicines and proceed to payment.</p>
          </div>
      
          <div>
            <br />
            {loggedIn ? (
              <>
                <button onClick={handleShowPrescription}>Scan Prescription</button>
                {showPrescription && <Prescription onSelectedVersions={handleSelectedVersions} />}
                {showPrescription && (
                  <>
                    <br />
                    <br />
                    <h2>Purchase Details</h2>
                    <ul>
                      {selectedVersionsArray.map((version, index) => {
                        const medicine = medicines.find((item) => item.id === version.medicineId);
                        if (medicine) {
                          const { original, original_price, generic, generic_price } = medicine;
                          const pd_name = version.version === 'original' ? original : version.version === 'generic' ? generic : '';
                          const pd_price = version.version === 'original' ? original_price : version.version === 'generic' ? generic_price : 0;
      
                          return (
                            <li key={index}>
                              Medicine ID: {version.medicineId}, Version: {version.version}, Name: {pd_name}, Price: {pd_price}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                    <h4>Total: {totalPrice.toFixed(2)}</h4>
                    <br />
                    <br />
                    <button onClick={gotoPayment}>Payment</button>
                  </>
                )}
              </>
            ) : (
              <p>You are not logged in</p>
            )}
          </div>
        </>
    );
}

export default PrescriptionManager;

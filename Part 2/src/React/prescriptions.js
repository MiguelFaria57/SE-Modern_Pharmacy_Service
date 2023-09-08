import React, { useEffect, useState, useMemo } from 'react';
import medicines from './medicines';


const Prescription = ({ onSelectedVersions }) => {
    /*const medicines = useMemo(() => [
        { id: 0, original: 'Painsolv', generic: 'Ibuprofen', generic_price: 5.9, original_price: 8.75 },
        { id: 1, original: 'Hypertex', generic: 'Amlodipine', generic_price: 11.5, original_price: 15.25 },
        { id: 2, original: 'Ceflora', generic: 'Cefuroxime', generic_price: 10.3, original_price: 12.9 },
        { id: 3, original: 'Xylocin', generic: 'Lidocaine', generic_price: 8.7, original_price: 10.5 },
        { id: 4, original: 'Allercet', generic: 'Cetirizine', generic_price: 5.75, original_price: 7.6 },
        // Add more medicine objects as needed
    ], []);*/

    const prescriptions = useMemo(() => [
        {
            id: 0,
            name: 'Prescription 1',
            medicines: [
                { medicine: medicines[0], version: 'original' },
                { medicine: medicines[2], version: 'original' },
            ],
        },
        {
            id: 1,
            name: 'Prescription 2',
            medicines: [
                { medicine: medicines[1], version: 'original' },
                { medicine: medicines[3], version: 'original' },
                { medicine: medicines[4], version: 'original' },
            ],
        },
        {
            id: 2,
            name: 'Prescription 3',
            medicines: [
                { medicine: medicines[4], version: 'original' },
            ],
        },
        // Add more prescription objects as needed
    ], []);

    // Get random prescription
    const [randomPrescription, setRandomPrescription] = useState(null);
    // Select medicine version
    const [selectedVersions, setSelectedVersions] = useState({});
    
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * prescriptions.length);
        const selectedPrescription = prescriptions[randomIndex];
        setRandomPrescription(selectedPrescription);
    }, [prescriptions]);
    
    useEffect(() => {
        if (randomPrescription) {
            const versionsArray = randomPrescription.medicines.map(({ medicine }) => ({
            prescriptionId: randomPrescription.id,
            medicineId: medicine.id,
            version: selectedVersions[`${randomPrescription.id}-${medicine.id}`],
            }));
            onSelectedVersions(versionsArray);
        }
    }, [randomPrescription, selectedVersions, onSelectedVersions]);

    const handleVersionSelect = (prescriptionId, medicineId, version, medicines) => {
        setSelectedVersions((prevVersions) => ({
          ...prevVersions,
          [`${prescriptionId}-${medicineId}`]: version
        }));
    };
    
    if (!randomPrescription) {
        return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>{randomPrescription.name}</h2>
        <h3>Medicines:</h3>
        <ul>
          {randomPrescription.medicines.map(({ medicine }) => {
            const selectedVersion = selectedVersions[`${randomPrescription.id}-${medicine.id}`];
  
            return (
              <li key={medicine.id}>
                <p>Medicine ID: {medicine.id}</p>
                <p>Original: {medicine.original} - {medicine.original_price}€</p>
                <p>Generic: {medicine.generic} - {medicine.generic_price}€</p>
                <p>
                  <label>
                    <input
                      type="radio"
                      value="original"
                      checked={selectedVersion === 'original'}
                      onChange={() => handleVersionSelect(randomPrescription.id, medicine.id, 'original', medicines)}
                    />
                    Original
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      type="radio"
                      value="generic"
                      checked={selectedVersion === 'generic'}
                      onChange={() => handleVersionSelect(randomPrescription.id, medicine.id, 'generic', medicines)}
                    />
                    Generic
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
};

export default Prescription;

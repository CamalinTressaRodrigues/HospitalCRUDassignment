const express = require('express');
const router = new express.Router();

const fs = require('fs');
var hospitalDetails = require('../hospitalData.json');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//function to save data
function saveData() {
    try {
        fs.writeFileSync('hospitalData.json', JSON.stringify(hospitalDetails, null, 2), 'utf-8');
    }
    catch (err) {
        console.error('Cannot save data', err);
    }
}

//Read all data
router.get('/', (req, res) => {
    res.json(hospitalDetails);
});

//Write new Hospital data
router.post('/add', (req, res) => {
    const newHospital = req.body;
    hospitalDetails.push(newHospital);
    saveData();
    res.status(201).json(newHospital);
});

// update Hospital Data by adding name of hospital in the url 
router.put('/:name', (req, res) => {
    const hospitalName = req.params.name;
    const updatedData = req.body;
    
    const index = hospitalDetails.findIndex(hospital => hospital.HospitalName === hospitalName);

    if (index === -1) return res.status(404).send('Hospital not Found');
    hospitalDetails[index] = { ...hospitalDetails[index], ...updatedData };
    saveData();
    res.json(hospitalDetails[index]);
});

//delete single hospital data by name
router.delete('/:name', (req, res) => {
    const hospitalName = req.params.name;

    const index = hospitalDetails.findIndex(hospital => hospital.HospitalName === hospitalName);

    if (index === -1) return res.status(404).send('Hospital not Found');
    const deleteHospital = hospitalDetails.splice(index, 1);
    saveData();
    res.json(deleteHospital[0]);
});

module.exports = router;
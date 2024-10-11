const express = require('express');
const fs = require('fs');
const csv = require('csv');
const router = express.Router();
const body = require('body-parser');
const path = require('path');
const { convertArrayToCSV } = require('convert-array-to-csv');

router.use(body.json())
router.use(body.urlencoded({ extended: true }));

router.post('/customers' , async(req,res)=>{
    try {
        const file = path.join(__dirname , '../csv_folder/customer.csv');

        const headers = ['Customer_name' , 'Customer_address' , 'Customer_contact_1' , 'Customer_contact_2' , 'Customer_company_name']
        const dataarray = req.body.map((ele)=>{
          return [ele[8],ele[6],ele[4],ele[2],ele[2]]
        })

       
        
          fs.stat(file, (err, stats) => {
            if (err) {
              console.error('Error getting file information:', err);
            } else {
              if (stats.isFile()) {
                console.log('File is a regular file.');
              } else if (stats.isDirectory()) {
                console.log('File is a directory.');
              } else {
                console.log('File is of unknown type.');
              }
            }
          });

           const csvarray = convertArrayToCSV(dataarray,{
            header : headers , separator : ','
           })

          fs.writeFile(file, csvarray, (err) => {
            if (err) {
              console.error('Error writing JSON file:', err);
            } else {
              console.log('JSON file written successfully!');
            }
          });
        //await fs.writeFile(file , dat)
        // res.status(200).send('تم تحديث العملاء');
        //console.log(req.body);
        return res.status(200).send({message : 'تم تحديث البيانات'});
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router

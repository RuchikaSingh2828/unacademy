import open from 'open';
import readline from 'readline';
import fetch from 'node-fetch';
import { url } from 'inspector';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const createURL = (flag, param) => {
  switch(flag) {
    case 'states' : 
        return 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
    case 'districts' : 
      return `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${param}`;
    case 'centers_by_districts':
      return `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${param.district_id}&date=${param.date}`; // date=31-03-2021
    default: return null;
  }
}

const getStateObject = (list, name) => list.states?.filter(item => item.state_name === name)
const getDistrictObject = (list, name) => list.districts?.filter(item => item.district_name === name)

const APIResponse = async (flag, param) => {
  const url = createURL(flag, param);
  const response = await fetch(url);
  const resData = await response.json();
  return resData
}



// const statesList = getState(statesListObject);
const statesListObject = await APIResponse('states');



// const selectedState = '';
console.log(statesListObject);
rl.question("Enter the state name from above to see the available disctricts for vaccination ::   ", async function(selectedState){
  const [selectedStateOBJ] = getStateObject(statesListObject, selectedState);
  const districtList = await APIResponse('districts', selectedStateOBJ.state_id)
  console.log(districtList);
  rl.question("Enter the district name from the above list to see the vaccination centers  ::  ", async function(selectedDistrict){
    const [selectedDistrictOBJ] = getDistrictObject(districtList, selectedDistrict);
    console.log(selectedDistrictOBJ)
    rl.question("Enter the date(dd-mm-yyyy) to see avalble slots for Vaccination :: ", async function(date) {
      const centers = await APIResponse('centers_by_districts', { district_id: selectedDistrictOBJ.district_id, date });
      console.log(centers);
      rl.close();
    })
  })
  
})


// response.then(res => res.json()).then(json => {
//   console.log(json)
// })

// open('www.google.com')

/**
 * 
 * - Try to fetch all districts of a state
 * - for each state filter the centers the vaccine of your choice
 * -  you may ask the user as well for inout via - node index.mjs --vaccine=covishield
 * - filter each data point based on whether the user wants free or paid vaccination
 * - send an email to the user periodically {user should be able ti subscribe}
 * - for email use "node mailer"
 * - for periodic sending of mail need to use cron job
 * 
 * 
 * 
 */
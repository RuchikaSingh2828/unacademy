var User = {
  name: 'Niranjan',
  Address: {
    presonal: {
      city: 'bangalore',
      area: 'HSR Layut',
    },
    office: {
      city: 'Bangalore',
      area: {
        landmark: 'Electronic city',
        pincode: '500017',
      },
    },
  },
};

const createObjStr = (emptyStr, pastParent, key) => {
  if (emptyStr) {
    let emptyStrArr = emptyStr.split('_');
    const presentParent =
      emptyStrArr.length > 1 ? emptyStrArr[emptyStrArr.length - 2] : null;
    debugger;
    const indexOfParent = emptyStrArr.indexOf(pastParent);
    if (pastParent && pastParent === presentParent) {
      emptyStrArr.pop();
    }

    emptyStr = emptyStrArr.length > 0 ? emptyStrArr.join('_') : emptyStr;
  }
  emptyStr = `${emptyStr}_${key}`;
  return emptyStr;
};

const objectChaining = (objParam, ObjectName) => {
  const emptyObj = {};
  // let emptyStr = ObjectName;

  const returnFunction = (data, emptyStr, pastParent) => {
    for (let key in data) {
      emptyStr = createObjStr(emptyStr, pastParent, key);
      if (data[key] instanceof Object) {
        returnFunction(data[key], emptyStr, key);
      } else {
        emptyObj[emptyStr] = data[key];
      }
    }
    return emptyObj;
  };

  return returnFunction(objParam, ObjectName, ObjectName);
};

console.log(objectChaining(User, 'User'));

const result = {
  User_Address_office_area_landmark: 'Electronic city',
  User_Address_office_area_pincode: '500017',
  User_Address_office_city: 'Bangalore',
  User_Address_presonal_area: 'HSR Layut',
  User_Address_presonal_city: 'bangalore',
  User_name: 'Niranjan',
};

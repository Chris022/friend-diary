const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:8080';

export function daysLeftAPI(callback){
    axios.get('/daysLeft')
    .then(function (response) {
      console.log(response);
      callback(response.data.daysleft);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

export function textGetAPI(date,callback1,callback2){
    axios.get('/days/'+date)
    .then(function (response) {
      if(Object.values(response.data).length > 0){
        callback1(response.data.dataKay);
        callback2(response.data.dataChris);
      }else{
        callback1("");
        callback2("");
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

export function saveTextAPI(text1, text2,date){
    axios.post('/days',{
        date: date,
        dataChris: text2,
        dataKay: text1
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}


export function getToDoAPI(callback){
  axios.get('/toDo')
  .then(function (response) {
    callback(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

export function deleteToDoAPI(id){
  axios.delete('/toDo',{
    data:{
      id: id
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

export function addToDo(text){
  axios.post('/toDo',{
      toDo: text
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}


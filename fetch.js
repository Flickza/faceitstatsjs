import { API_KEY } from './config.js';

$.ajax
({
  type: "GET",
  url: "https://open.faceit.com/data/v4/players?nickname=flickza",
  dataType: 'json',
  headers: {
    "Authorization" : API_KEY
  },
  success: function (data){
    console.log(data);
  }
});
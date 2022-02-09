
var input = document.querySelector('.inputText');
var nameText = document.querySelector('#name');
var temp = document.querySelector('#temp');
var icon = document.querySelector('#icon');
var condition = document.querySelector('#condition');
var windSpeed = document.querySelector('#windSpeed');
var button= document.querySelector('.submit');


button.addEventListener('click', function(name){

fetch('https://api.weatherapi.com/v1/current.json?key=b3ec654ba3b54de5b9a193627220902&q='+input.value+'&aqi=no')
.then(response => response.json())
.then(data => {
  var nameData = data['location']['name'];
  var regionData = data['location']['region'];
  var tempData = data['current']['temp_c'];
  var conditionData = data['current']['condition']['text'];
  var windSpeedData = data['current']['wind_mph'];

  nameText.innerHTML = "Location: " + nameData + ", " + regionData;
  input.value ="";

  temp.innerHTML = "Temperature(°C): " + tempData + "°C";
  condition.innerHTML = conditionData;

  windSpeed.innerHTML = "WindSpeed(mph): " + windSpeedData; 

})

.catch(err => alert("Wrong city name!"));
})
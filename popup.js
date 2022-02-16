
var input = document.querySelector('.inputText');
var nameText = document.querySelector('#name');
var temp = document.querySelector('#temp');
var img = document.querySelector('#weatherIcon');
var condition = document.querySelector('#condition');
var windSpeed = document.querySelector('#windSpeed');
var button= document.querySelector('.submit');

button.addEventListener('click', function(){

fetch('https://api.weatherapi.com/v1/current.json?key=b3ec654ba3b54de5b9a193627220902&q='+input.value+'&aqi=no')
.then(response => response.json())
.then(data => {
  var nameData = data['location']['name'];
  var regionData = data['location']['region'];
  var tempData = data['current']['temp_c'];
  var conditionData = data['current']['condition']['text'];
  var windSpeedData = data['current']['wind_mph'];
  var icon = data['current']['condition']['icon'];

  nameText.innerHTML = "Location: " + nameData + ", " + regionData;
  input.value ="";

  temp.innerHTML = "Temperature(°C): " + tempData + "°C";
  condition.innerHTML = conditionData;

  windSpeed.innerHTML = "WindSpeed(mph): " + windSpeedData; 
  img.style.display = "block";
  img.src = "https:" + icon;

})

.catch(err => alert("Wrong city name, please try again."));
})

/********** Content Script & Message Passing ***********/

// Action Buttons
var blank_button = document.querySelector('.blank');
var collect_button = document.querySelector('.collect');
var display_button = document.querySelector('.display');

// Textboxes
var sunrise_box = document.querySelector('#sunrise')
var sunset_box = document.querySelector('#sunset')
var visibility_box = document.querySelector('#visibility')
var humidity_box = document.querySelector('#humidity')


function blank(){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {message: "blank_out_info"});
   });
}

function collect(){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {message: "collect_and_display"});
   });
}

function display() {
  chrome.storage.local.get(['sunrise', 'sunset', 'humidity', 'visibility'], (result) => {
    sunrise_box.innerHTML = "Sunrise: "+ result.sunrise +" am";
    sunset_box.innerHTML = "Sunset: "+result.sunset+" pm";
    visibility_box.innerHTML = "Visibility: "+result.visibility+" km";
    humidity_box.innerHTML = "Humidity: "+ result.humidity + "%";


  })
}

blank_button.addEventListener('click', () => {
  console.log("i am sending blank")
  blank()
})

collect_button.addEventListener('click', () => {
  console.log('we are clickling collect');
  collect();
})

display_button.addEventListener('click', () => {
  console.log("we are displaying the information"); 
  display();
})


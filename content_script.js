/*
1. capture information from the weather network
2. display that information in the popup
*/
console.log("we are on the content script")

  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('hello');
    console.log(request);
    if(request.message == "blank_out_info"){
        console.log('we are getting the request');
        blank_out_info();
    }

    if(request.message == "collect_and_display"){
        console.log('we are getting the collect');
       collect_sunrise(); 
    }
}
)

// collecting information requires timeout

function collect_sunrise(){
    var sunrise = document.querySelector("#obs_secondary_data > div:nth-child(1) > div > div:nth-child(4) > span.value");
    var sunset = document.querySelector("#obs_secondary_data > div:nth-child(1) > div > div:nth-child(8) > span.value");
    var visibility = document.querySelector("#obs_secondary_data > div:nth-child(1) > div > div:nth-child(3) > span.value");
    var humidity = document.querySelector("#obs_secondary_data > div:nth-child(1) > div > div:nth-child(2) > span.value");

    chrome.storage.local.set({sunrise: sunrise.innerHTML, sunset: sunset.innerHTML, visibility: visibility.innerHTML,
    humidity: humidity.innerHTML}, () => {
        console.log(sunrise.innerHTML);
        console.log(sunset.innerHTML);
        console.log(visibility.innerHTML);
        console.log(humidity.innerHTML);
    })

    console.log(sunrise)
}

// blank out information

function blank_out_info(){
    var temperature = document.querySelector("#obs_data > div:nth-child(1) > div > span");
    var windspeed = document.querySelector("#obs_secondary_data > div:nth-child(1) > div > div:nth-child(5) > span.value")
    var feels_like = document.querySelector("#obs_data > div:nth-child(1) > div > div.c-obs-area__stackunits > p > span.value");

    temperature.innerHTML = "0"
    windspeed.innerHTML = "0"
    feels_like.innerHTML = "0"
}

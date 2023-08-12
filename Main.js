// document.addEventListener('DOMContentLoaded', ()=>{
//     function fetchData() {
//         fetch('https://api.weatherapi.com/v1/forecast.json?key=309ab7b7481746a7958133225230208&q=cairo&days=3')
//         .then(resp => resp.json())
//         .then(data=> showData(data) )
//       }

//       function showData(data) {
//         console.log();
//         const location = Object.entries(data.location);
//         const current = Object.entries(data.current);
//         const location = Object.entries(data.location);
//         console.log(location);


//       }

//           fetchData();
//         })


//fetch api
async function search(city) {
    if (city == null) {

        city = "london"
    }
    
    let apiData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=309ab7b7481746a7958133225230208&q=${city}&days=3`);
    if (apiData.ok && 400 != apiData.status) {
        // console.log(apiData);
        let data = await apiData.json();
        // console.log(data);

        displayCurrent(data.location, data.current),
        displayAnother(data.forecast.forecastday)
    }
}

//seach for city
document.getElementById("search").addEventListener("keyup", city => {
    search(city.target.value)
});


//static data
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function displayCurrent(location, current) {
    if (current != null) {
        var dateFormat = new Date(current.last_updated.replace(" ", "T"));//use to change data format
        

        let firstBoxData = `
                <div class="day-one col-md-4">
                        <div class="head p-3 d-flex justify-content-between">
                        <span id="day">${days[dateFormat.getDay()]}</span>
                        <span id="date">${dateFormat.getDate() + monthNames[dateFormat.getMonth()]}</span>
                            
                        </div>
                        <div class="body p-4">
                            <p id="location">${location.name}</p>
                            <span id="temperature">${current.temp_c}<sup>o</sup>C</span>
                            <img src="https:${current.condition.icon}" alt="" class="w-25" >
                                <p id="condition">${current.condition.text}</p>
                                <div class="foot p-2">
                                    <img src="assets/Images/icon-umberella@2x.png" alt="">
                                    <span>20%</span>
                                    <img src="assets/Images/icon-wind@2x.png" alt="">
                                    <span>18km/h</span>
                                    <img src="assets/Images/icon-compass@2x.png" alt="">
                                    <span>East</span>
                                </div>
                        </div>
                    </div>
        `;
        document.getElementById("weather-show").innerHTML = firstBoxData;
    }
}
function displayAnother(otherDay) {
    let OtherboxData = "";
    for (let i = 1; i < otherDay.length; i++)
        // <div class="custom">${a[e].day.condition.text}</div>\n        </div>\n        </div>`;
        OtherboxData += `
    <div class="day-tow col-md-4 text-center">
    <div class="head py-3">
        <span>${days[new Date(otherDay[i].date.replace(" ", "T")).getDay()]}</span>
    </div>
    <div class="body" id="body-tow">
        <img src="https:${otherDay[i].day.condition.icon}" alt="">
        <p id"degree">${otherDay[i].day.maxtemp_c}<sup>o</sup>C</p>
        <p>${otherDay[i].day.mintemp_c}<sup>o</sup></p>
        <span id="cond">${otherDay[i].day.condition.text}</span>

    </div>
</div>
    `
    document.getElementById("weather-show").innerHTML += OtherboxData
}
search("cairo");

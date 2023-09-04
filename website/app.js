// Personal API Key for OpenWeatherMap API(Applicaple only in USA)
let baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "&APPID=68d21c179d594e472cf83304e729c3b1&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Attach a click event listener to the "generate" element
document.getElementById("generate").addEventListener("click", handleButtonClick);
function handleButtonClick(e){
    const zipCode =  document.getElementById('zip').value;
    let userFeelings = document.getElementById("feelings").value;
      url = baseURL+zipCode+apiKey;
    // Call the API
    fetchDataFromAPI(url)

        // Prepares data for POST, calls the POST
        .then(function (weatherData) {
            const temper = weatherData.main.temp;
                console.log("Weather data from the API: ", weatherData);
                // Post weather data, including temperature, date, and user feelings
                postData("/add", {temperature: temper, date: newDate, userResponse: userFeelings,
                  });     
        })
         // Calls to update the site with latest entry
               // updateUI(degreeSystem);
               .then(() => updateUI());

    };
      
    

    // Function to get the current date
function getCurrentDate() {
    return new Date();
  }

//fetching data from the dynamic url of api
async function fetchDataFromAPI(url) {
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
}
    // Async POST
/* Function to POST data */
// Async POST
const postData = async (url , data = {}) => {
	console.log("post weather data: ", data);
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});

	try {
		const newData = await response.json();
		console.log("post res: ", newData);
	} catch (error) {
		console.log("error", error);
	}
};
// Updates the website's latest entry card
// Add weather date, temperature, feelings
async function updateUI() {
    const response = await fetch('/all');
    const newEntry = await response.json();
    document.getElementById('date').innerHTML = `Date: ${newEntry.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${newEntry.temperature}`;
    document.getElementById('content').innerHTML = `Feelings: ${newEntry.userResponse}`;
}

  
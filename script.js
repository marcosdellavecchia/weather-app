window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature-section");
  let temperatureSpan = document.querySelector(".temperature-section span");
  let humiditySpan = document.querySelector(".humidity-percentage");
  let windSection = document.querySelector(".wind-section");
  let windUnit = document.querySelector(".wind-unit");
  let windSpan = document.querySelector(".wind-speed");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a1a5bfb741db21c335c4b3b1c0bc034b&lang=es`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //API's default temperature unit is Kelvin, so we get it and then convert to Celsius
          const temperature = Math.floor(data.main.temp - 273.15);
          //API's summary is lowercase, so we get it and then capitalize the first letter
          const summary =
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1);
          const location = data.name;
          const humidity = data.main.humidity;
          //API's default wind speed is set to meters/sec, so we get it and convert to kilometers/hour
          const wind = Math.floor(data.wind.speed * 3.6);
          let icon = data.weather[0].icon;

          //Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = location;
          humiditySpan.textContent = humidity;
          windSpan.textContent = wind;

          //Formula for farenheit
          let farenheit = (temperature + 32) * (9 / 5);

          //Formula for miles/hour
          let mph = wind * 1.60934;

          //Change temperature Celsius/Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°C") {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = Math.floor(farenheit);
            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = temperature;
            }
          });
          //Change wind speed kmh/mph
          windSection.addEventListener("click", () => {
            if (windUnit.textContent === "km/h") {
              windUnit.textContent = "mp/h";
              windSpan.textContent = Math.floor(mph);
            } else {
              windUnit.textContent = "km/h";
              windSpan.textContent = wind;
            }
          });

          // Replace default API icon names with Skycon's names
          switch (icon) {
            case "01d":
              icon = "CLEAR_DAY";
              break;
            case "01n":
              icon = "CLEAR_NIGHT";
              break;
            case "02d":
              icon = "PARTLY_CLOUDY_DAY";
              break;
            case "02n":
              icon = "PARTLY_CLOUDY_NIGHT";
              break;
            case "03d":
              icon = "CLOUDY";
              break;
            case "03n":
              icon = "CLOUDY";
              break;
            case "04d":
              icon = "CLOUDY";
              break;
            case "04n":
              icon = "CLOUDY";
              break;
            case "09d":
              icon = "RAIN";
              break;
            case "09n":
              icon = "RAIN";
              break;
            case "10d":
              icon = "RAIN";
              break;
            case "10n":
              icon = "RAIN";
              break;
            case "11d":
              icon = "RAIN";
              break;
            case "11n":
              icon = "RAIN";
              break;
            case "13d":
              icon = "SNOW";
              break;
            case "13n":
              icon = "SNOW";
              break;
            case "50d":
              icon = "FOG";
              break;
            case "50n":
              icon = "FOG";
              break;
          }
          //set Icon
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  } //IF statement ends here

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon;
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

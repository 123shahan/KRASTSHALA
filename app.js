document.addEventListener('DOMContentLoaded', () => {
const apiKey = 'f071f8adcd09d07901fe65b42a629d69';  
const searchButton = document.getElementById('search-button');
  const locationInput = document.getElementById('location-input');
  const locationDisplay = document.getElementById('location');
  const temperatureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const weatherIconDisplay = document.getElementById('weather-icon');
  const dateTimeDisplay = document.getElementById('date-time');
  const errorMessage = document.getElementById('error-message');
  const toggleModeButton = document.getElementById('toggle-mode');

  if (searchButton && locationInput) {
    searchButton.addEventListener('click', () => {
      const location = locationInput.value.trim();
      if (location) {
        fetchWeather(location);
      } else {
        showError('Please enter a location.');
      }
    });
  }

  if (toggleModeButton) {
    toggleModeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  async function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        displayWeather(data);
      } else {
        throw new Error(data.message || 'Location not found');
      }
    } catch (error) {
      showError(error.message);
    }
  }

  function displayWeather(data) {
    const { name, main, weather, dt } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
    const date = new Date(dt * 1000);

    if (locationDisplay) locationDisplay.textContent = name;
    if (temperatureDisplay) temperatureDisplay.textContent = `Temperature: ${temperature}°C`;
    if (descriptionDisplay) descriptionDisplay.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    if (weatherIconDisplay) {
      weatherIconDisplay.src = icon;
      weatherIconDisplay.alt = description;
    }
    if (dateTimeDisplay) dateTimeDisplay.textContent = `Date and Time: ${date.toLocaleString()}`;
    if (errorMessage) {
      errorMessage.textContent = '';
      errorMessage.style.display = 'none';
    }
  }

  function showError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
    if (locationDisplay) locationDisplay.textContent = '';
    if (temperatureDisplay) temperatureDisplay.textContent = '';
    if (descriptionDisplay) descriptionDisplay.textContent = '';
    if (weatherIconDisplay) weatherIconDisplay.src = '';
    if (dateTimeDisplay) dateTimeDisplay.textContent = '';
  }
});
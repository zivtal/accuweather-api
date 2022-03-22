## OVERVIEW
Write a simple, responsive, web app in Vue(version 2 or 3) that shows the weather of some city. The user should be able to search for a city and save it to favorites (locally, a server is not required). We expect to see 2 pages in this app. (weather page and favorites page).

## API
The API that you’ll use for this app is [AccuWeather API](https://developer.accuweather.com/). Please signup and create a new app in order to get an API key. You will use 3 endpoints: [location autocomplete](https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/autocomplete) for the search field, [get current weather](https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D) and [5-day daily forecast](https://developer.accuweather.com/accuweather-forecast-api/apis/get/forecasts/v1/daily/5day/%7BlocationKey%7D).
Please read those API docs. NOTE: this API is limited to 50 requests per day. our recommendation is to save the responses and use them locally during development.

## SPECS
1. Create a header with navigation icons/links/buttons for the main and favorites screen.
2. The main screen (weather details) will be composed of a search field to search a location’s weather by city name. And below it, the current weather and a 5-day forecast of the searched location. A location should have an indication if it’s already saved in favorites, and a button to add/remove from favorites (it can be the same button).
3. Display Tel Aviv weather by default.
4. Favorites screen will be composed of a list of favorite locations. Each location should have an ID, name and current weather. Clicking on a favorite will navigate to the main screen showing the details of that location.
5. Searching should be done in English letters only.
6. State management (Vuex) is a must!
7. Responsive design is a must!
8. Error handling is a must!
9. Set the default location by using the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API). you will need another API endpoint for this: [get location key by lat/lon](https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/geoposition/search).
10. Add dark/light theme support (add toggle button in the header).
11. Add Celsius/Fahrenheit toggle button.

export const Keys =
{
    FIREBASE_KEY: 'AIzaSyBqeQ8wDUJ_EIcU8NWYK5ydKiR77I4M75E',
    WEATHER_KEY: '5f386d0eea792de8e4b3a55cbe7680e4'
}

export const WSPath =
{
    URL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Keys.FIREBASE_KEY}`,
    URL_DB: 'https://todo1app-default-rtdb.firebaseio.com/',
    URL_WEATHER: 'http://api.openweathermap.org/data/2.5/weather?',
    URL_WEATHER_LAT: 'lat=',
    URL_WEATHER_LOT: '&lon=',
    URL_WEATHER_UNITS: '&units=metric',
    URL_WEATHER_API: '&APPID=',
}

export const ServicePath =
{
    USER: `${WSPath.URL_DB}users/`,
    JSON: '.json',
    AUTH: '?auth='
}

export const UserPath =
{
    AUTHENTICATE_USER: `${ServicePath.USER}/authenticate`,
}
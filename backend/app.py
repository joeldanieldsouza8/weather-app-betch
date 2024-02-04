from typing import Any
from fastapi import FastAPI # Import the FastAPI class from the fastapi module 
from fastapi.middleware.cors import CORSMiddleware # Enable CORS (Cross-Origin Resource Sharing) for the API server to allow requests from the React app running on a different server (port) to access the API server running on a different port (server) 
import requests # Make HTTP requests to websites and APIs
from dotenv import load_dotenv # Load the .env file 
import os # Operating System dependent functionality 

load_dotenv()  # Load the .env file

app = FastAPI()

# Set up CORS
origins = [
    "http://localhost:3000",  # React server
    "http://localhost:5173",  # Vite server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/weather") # is a decorator that tells FastAPI that the function below it should be used to handle GET requests to the '/weather' path.
def get_current_weather(city: str) -> dict[str, Any]:
    api_key: str | None = os.getenv("API_KEY")
    request_url: str = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(request_url)

    if response.status_code != 200:
        return {"error": "Could not fetch weather data"}

    weather_data = response.json()
    return {
        "city": weather_data['name'],
        "temperature": weather_data['main']['temp'],
        "feels_like": weather_data['main']['feels_like'],
        "description": weather_data['weather'][0]['description']
    }

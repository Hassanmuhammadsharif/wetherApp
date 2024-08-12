let search = document.getElementById('search');
let btn = document.getElementById('btn');
let API_KEY = "fdd996f56256fae99c9874fefdb2086f";
let box = document.querySelector('.box');

function fetchData() {
    if (search.value.trim() === "") {
        box.innerHTML = `
            <p class="Error">Please Input a City name</p>
        `;
    } else {
        box.innerHTML = `<p>loading.....</p>`;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_KEY}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => showData(data))
            .catch((err) => {
                box.innerHTML = `<img src="./image/cancel.png"/>`;
                console.log(err);
            });
    }
    search.value = '';
}

let body = document.querySelector('body');

function showData(data) {
    console.log(data);

    const { country } = data.sys;
    const { temp } = data.main;
    let updatedTemp = Math.floor(temp);
    let { main, icon, id } = data.weather[0];
    let urlImg;

    if (id >= 200 && id <= 232) {
        urlImg = './image/thunderstorm.png';
        body.className += ' bg thunderstorms';
    } else if (id >= 300 && id <= 321) {
        urlImg = './image/drizzle.png';
        body.className += ' bg drizzle';
    } else if (id >= 500 && id <= 531) {
        urlImg = './image/rain.png';
        body.className += ' bg rain';
    } else if (id >= 600 && id <= 622) {
        urlImg = './image/snow.png';
        body.className += ' bg snow';
    } else if (id >= 701 && id <= 781) {
        urlImg = './image/cloudy.png';
        body.className += ' bg cloudy';
    } else if (id >= 801 && id <= 804) {
        urlImg = './image/clouds.png';
        body.className += ' bg clouds';
    } else {
        urlImg = './image/sun.png';
        body.className += ' bg sun';
    }

    box.innerHTML = `
        <img src="${urlImg}"/>
        <p>${data.name}, ${country}</p>
        <h1>${updatedTemp} <sup>0</sup>C</h1>
        <p>${main}</p>
    `;
}

search.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        fetchData();
    }
});

btn.addEventListener('click', fetchData);

let currentLoc = document.querySelector('.location');

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            let Currenturl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
            fetch(Currenturl)
                .then((res) => res.json())
                .then((data) => showData(data))
                .catch((err) => {
                    box.innerHTML = `<img src="./image/internet.png"/>`;
                    console.log(err);
                });
        },
        (error) => {
            const { message } = error;
            box.innerHTML = `<p class="Error">${message}</p>`;
        }
    );
}

currentLoc.addEventListener('click', getCurrentLocation);

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    const url = 'http://localhost:3000/weather?address=' + location;

    msgOne.textContent = 'loading ...';
    msgTwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then(data => {
            if (data.error) {
            } else {
                // console.log(data);
                search.value = '';
                msgOne.textContent = data.city + 'has the temperature ';
                msgTwo.textContent = data.temperature + 'weather is ' + data.weather_descriptions;
            }
        })
    });
});
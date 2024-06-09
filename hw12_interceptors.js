const axios = require('axios');

axios.interceptors.request.use(
    function (config) {
        console.log('Запрос через interceptors:');
        console.log('URL:', config.url);
        console.log('Метод:', config.method);
        return config;
    },
    function (error) {
        console.log('Ошибка запроса:', error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        console.log('Ответ через interceptors:');
        console.log('Данные:', response.data);
        console.log('Статус:', response.status);
        return response;
    },
    function (error) {
        console.log('Ошибка ответа:', error);
        return Promise.reject(error);
    }
);

async function checkGetPost() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
    console.log('Данные get запроса:', response.data);
}
checkGetPost()


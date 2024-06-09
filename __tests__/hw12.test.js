//створити 5 запитів за допомогою методів GET, POST
//обовязково має бути перевірка респонсу - response status, data на коректність знідно докементації по АПІ

const axios = require('axios');

test('check GET /posts/1', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
    expect(response.status).toBe(200)
    expect(response.data).toHaveProperty('userId', 'id', 'title', 'body')
    expect(response.data.userId).toEqual(1)
    expect(response.data.id).toBeLessThanOrEqual(10)
    expect(response.data.title).toBeDefined()
    expect(response.data.body).toBeDefined()
})

test('check GET /posts/2', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/2')
    expect(response.status).toBe(200)
    expect(response.data).toHaveProperty('userId', 'id', 'title', 'body')
    expect(response.data.userId).toEqual(1)
    expect(response.data.id).toEqual(2)
    expect(response.data.title).toEqual('qui est esse')
    expect(response.data.body).toEqual('est rerum tempore vitae\n' +
        'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
        'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
        'qui aperiam non debitis possimus qui neque nisi nulla')
})

test('check GET /posts/3', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/3')
    expect(response.status).toBe(200)
    expect(response.data).toHaveProperty('userId', 'id', 'title', 'body')
    expect(response.data.userId).toEqual(1)
    expect(response.data.id).toEqual(3)
    expect(response.data.title).toEqual('ea molestias quasi exercitationem repellat qui ipsa sit aut')
    expect(response.data.body).toEqual('et iusto sed quo iure\n' +
        'voluptatem occaecati omnis eligendi aut ad\n' +
        'voluptatem doloribus vel accusantium quis pariatur\n' +
        'molestiae porro eius odio et labore et velit aut')
})

test('POST new /posts', async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        body: JSON.stringify({
            id: 101,
            title: 'A Light Exists in Spring',
            body: 'A Color stands abroad. On Solitary Fields. That Science cannot overtake. But Human Nature feels.',
            userId: 11,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    expect(response.status).toBe(201)
});

test('POST new /posts', async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        body: JSON.stringify({
            id: 102,
            title: 'Miss River Snail',
            body: 'A spoiled snail turns into a wayward woman. The fleeting shelf life. Dates her love. Bestowed upon you each.',
            userId: 11,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    expect(response.status).toBe(201)
});

const { UsersController } = require('../../src_framework/controllers/UsersController')

const usersController = new UsersController();

test('Get curret user profile', async () => {
    await usersController.login()
    const res = await usersController.getUserProfile()
    expect(res.status).toBe(200)
    expect(res.data.data.name).toBe('Julia')
})
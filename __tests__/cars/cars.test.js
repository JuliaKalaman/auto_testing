const { CarsController } = require('../../src_framework/controllers/CarsController')

const carsContrroller = new CarsController()


describe('Check Cars API', () => {
    beforeAll(async () => {
        await carsContrroller.login()
    })

    afterAll(async () => {
        const carsResponse = await carsContrroller.getCars()
        const carIds = carsResponse.data.data.map((c) => c.id)
        for (const carId of carIds) {
            await carsContrroller.deleteCarById(carId)
        }
    })

    test('User can get all cars', async () => {
        const carsResponse = await carsContrroller.getCars()
        expect(carsResponse.status).toBe(200)
    })

    test('User can create a new car', async () => {
        let carsResponse = await carsContrroller.getCars()
        const carList = [...carsResponse.data.data]
        const newCarResponse = await carsContrroller.createCar(1, 1, 12000)
        carsResponse = await carsContrroller.getCars()
        const newCarList = carsResponse.data.data
        expect(newCarList.length).toBe(carList.length + 1)
        expect(newCarList.find((car) => car.id === newCarResponse.data.data.id)
        ).toBeDefined()
    })
})

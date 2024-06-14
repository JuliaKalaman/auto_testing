const { CarsController } = require('../src/controllers/CarsController')

const carsController = new CarsController()

describe('Check Cars API', () => {
    beforeAll(async () => {
        await carsController.login()
    })

    afterEach(async () => {
        const carsResponse = await carsController.getCars()
        const carIds = carsResponse.data.data.map((car) => car.id)
        for (const carId of carIds) {
            await carsController.deleteCar(carId)
        }
    })

    test('Creating all brands & all models', async () => {
        const responseAllCars = await carsController.getCarsModels()
        for (eachCar of responseAllCars.data.data) {
            const sixDigitNumber = Math.floor(100000 + Math.random() * 900000)
            const allBrandsAndModels = await carsController.createCar(eachCar.carBrandId, eachCar.id, sixDigitNumber)
            expect(allBrandsAndModels.data.status).toBe('ok')
            expect(allBrandsAndModels.data.data.id).toBeDefined()
            expect(allBrandsAndModels.data.data.carBrandId).toBe(eachCar.carBrandId)
            expect(allBrandsAndModels.data.data.carModelId).toBe(eachCar.id)
        }
    })

    test('Creating a new Audi', async () => {
        const responseAudi = await carsController.createCar(1, 1, 10000)
        expect(responseAudi.data.status).toBe('ok')
        expect(responseAudi.data.data.brand).toBe('Audi')
    })

    test('Creating a new BMW', async () => {
        const responseBmw = await carsController.createCar(2, 6, 20000)
        expect(responseBmw.data.status).toBe('ok')
        expect(responseBmw.data.data.brand).toBe('BMW')
    })

    test('Creating a new Ford', async () => {
        const responseFord = await carsController.createCar(3, 12, 30000)
        expect(responseFord.data.status).toBe('ok')
        expect(responseFord.data.data.brand).toBe('Ford')
    })

    test('Creating a new Porsche', async () => {
        const responsePorsche = await carsController.createCar(4, 18, 40000)
        expect(responsePorsche.data.status).toBe('ok')
        expect(responsePorsche.data.data.brand).toBe('Porsche')
    })

    test('Creating a new Fiat', async () => {
        const responseFiat = await carsController.createCar(5, 19, 50000)
        expect(responseFiat.data.status).toBe('ok')
        expect(responseFiat.data.data.brand).toBe('Fiat')
    })

    test('Negative check for creating a car with a non-existent BRAND', async () => {
        const invalidBrandId = -1
        const response = await carsController.createCar(invalidBrandId, 1, 60000)
        expect(response.data.status).not.toBe('ok')
        expect(response.data.message).toBeDefined()
    })

    test('Negative checking for creating a car with a non-existent MODEL', async () => {
        const invalidModelId = -1
        const response = await carsController.createCar(1, invalidModelId, 70000)
        expect(response.data.status).not.toBe('ok')
        expect(response.data.message).toBeDefined()
    })

    test('Negative checking for creating a car with an invalid MILEAGE value', async () => {
        const invalidMileage = -12345
        const response = await carsController.createCar(1, 1, invalidMileage)
        expect(response.data.status).toBe('error')
        expect(response.data.message).toBe('Mileage has to be from 0 to 999999')
    })
})

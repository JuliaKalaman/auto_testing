const { BaseController } = require("./BaseController");

class CarsController extends BaseController {
    constructor() {
        super()
        this.API_CARS = '/cars'
        this.API_CARS_ID = '/cars/{id}'
    }

    async getCars() {
        return this.get(this.API_CARS)
    }

    async createCar(carBrandId, carModelId, mileage) {
        return this.post(this.API_CARS, {
            carBrandId,
            carModelId,
            mileage,
        })
    }
    async deleteCarById(id) {
        return this.delete(this.API_CARS_ID.replace('{id}', id))
    }

}

module.exports.CarsController = CarsController
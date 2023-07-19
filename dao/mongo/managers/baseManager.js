

export default class BaseManager {
    constructor(model) {
        this.model = model
    }

    // Retrieve all objects from the model.
    get = () => this.model.find().lean();

    // Retrieve an object from the model by its ID (id).
    getObjectById = id => this.model.findById(id).lean();

    // Retrieve an object from the model based on a specific parameter (param).
    getBy = param => this.model.findOne(param).lean();

    // Create a new object in the model with the provided data (object).
    create = object => this.model.create(object);

    // Update an object in the model by its ID (id) with the provided data (object).
    update = (id, object) => this.model.findByIdAndUpdate(id, { $set: object });

    // Delete an object from the model based on a specific parameter (param).
    delete = id => this.model.findByIdAndDelete(id);
};
export default class BaseController {
    constructor(service) {
        this.service = service;
    }

    // Retrieve all objects from the service.
    getObjects = async (req, res) => {
        try {
            const result = await this.service.getAllObjects();
            if (!result) return res.sendNotFound();
            res.sendSuccessWithPayload(result);
        } catch (error) {
            res.sendInternalError(error);
        }
    }

    // Retrieve an object from the manager by its ID (id).
    getObjectById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.service.getObjectById({ _id: id });
            if (!result) return res.sendNotFound();
            res.sendSuccessWithPayload(result);
        } catch (error) {
            res.sendInternalError(error);
        }
    }

    // Retrieve objects from the manager based on a specific attribute and value.
    getObjectBy = async (req, res) => {
        const { attribute, value } = req.params;
        const query = {};
        query[attribute] = value;
        try {
            const result = await this.service.getObjectByParam(query);

            if ( result === null || result.length === 0) return res.sendSuccess("Sorry, there are no objects with those specifications.");
            res.sendSuccessWithPayload(result);
        } catch (error) {
            res.sendInternalError(error);
        }
    }

    // Update an object in the manager by its ID (id) with the provided data (req.body).
    updateObject = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.service.updateObject(id, req.body);
            if (!result) return res.sendNotFound();
            res.sendSuccess("Updated");
        } catch (error) {
            res.sendInternalError(error);
        }
    }

    // Delete an object from the manager by its ID (id).
    deleteObject = async (req, res) => {
        const { id } = req.params;
        try {
            console.log(this.service)
            const result = await this.service.deleteObject(id);
            if (!result) return res.sendNotFound();
            res.sendSuccess("Deleted");
        } catch (error) {
            res.sendInternalError(error);
        }
    }
}

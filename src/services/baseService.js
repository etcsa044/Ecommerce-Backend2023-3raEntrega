/**
 * Base service class providing CRUD operations for objects managed by a manager.
 */
export default class BaseService {
    /**
     * Create a new BaseService instance.
     * @param {Manager} manager - The manager responsible for handling the objects.
     */
    constructor(manager) {
        this.manager = manager;
    }

    /**
     * Retrieve all objects.
     * @returns {Promise<Array>} A promise resolving to an array of objects.
     */
    getAllObjects = () => this.manager.get();

    /**
     * Retrieve an object by its unique identifier (ID).
     * @param {string} id - The ID of the object to retrieve.
     * @returns {Promise<Object|null>} A promise resolving to the retrieved object, or null if not found.
     */
    getObjectById = id => this.manager.getObjectById(id);

    /**
     * Retrieve an object based on a specified parameter.
     * @param {any} param - The parameter used for querying the object.
     * @returns {Promise<Object|null>} A promise resolving to the retrieved object, or null if not found.
     */
    getObjectByParam = param => this.manager.getBy(param);

    /**
     * Create a new object.
     * @param {Object} object - The object to create.
     * @returns {Promise<Object>} A promise resolving to the created object.
     */
    createObject = object => this.manager.create(object);

    /**
     * Update an existing object by its unique identifier (ID).
     * @param {string} id - The ID of the object to update.
     * @param {Object} object - The updated object data.
     * @returns {Promise<Object|null>} A promise resolving to the updated object, or null if not found.
     */
    updateObject = (id, object) => this.manager.update(id, object);

    /**
     * Delete an object by its unique identifier (ID).
     * @param {string} id - The ID of the object to delete.
     * @returns {Promise<boolean>} A promise resolving to true if the object was deleted successfully, or false otherwise.
     */
    deleteObject = id => this.manager.delete(id);
}
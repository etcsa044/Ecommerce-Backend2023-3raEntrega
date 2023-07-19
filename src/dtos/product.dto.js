

export default class CreateProductDTO {
    constructor(product){
        this.code = product.code,
        this.title = product.title,
        this.price = product.price,
        this.description = product.description || "No product description"
    }
}
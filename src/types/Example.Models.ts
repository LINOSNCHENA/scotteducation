import { CarouselCartItem, IOrder, IProduct } from "./models.eshop";

export const egOrder: IOrder = {
    id: "",
    user_id: "",
    quantity: 0,
    total: 0,
    status: "pending",
    created_at: "",
    // product_id: "",
    products: []
}

export const egProduct: IProduct = {
    // id: 0,
    name: "",
    price: 0,
    description: "",
    image_url: "",
    id: ""
}

export const egCart: CarouselCartItem = {
    // product_id: 0,
    user_id: "",
    quantity: 0,
    product_id: ""
}
import { CarouselCartItem, IOrder, IProduct } from "./models.eshop";

export const egOrder: IOrder = {
    id: "",
    user_id: "",
    quantity: 0,
    total: 0,
    status: "pending",
    created_at: "",
    products: []
}

export const egProduct: IProduct = {
    name: "",
    price: 0,
    description: "",
    image_url: "",
    id: ""
}

export const egCart: CarouselCartItem = {
    user_id: "",
    quantity: 0,
    product_id: ""
}
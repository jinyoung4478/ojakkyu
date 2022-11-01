import { model } from "mongoose";
import { itemSchema } from "../schemas/product-schema.js";

const Item = model("users", itemSchema);


export class ItemModel {

    async create(itemInfo) {
        const createdNewUser = await Item.create(itemInfo);
        return createdNewUser;
    }

}

const itemModel = new ItemModel();

export { itemModel };

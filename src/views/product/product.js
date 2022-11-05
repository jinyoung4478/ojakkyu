import * as Api from "../utils/api.js";
import { clientSideInclude } from "../utils/useful-functions.js";

clientSideInclude();
const res = Api.get('/api/product:productId',"test-2");
console.log(res)
console.log(window.location,"asdasdasdasd",window.location.href,"d=d=d=d=d==d=d=")
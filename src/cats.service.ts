import { Injectable } from "@nestjs/common";
import { Cat } from "./cat";

@Injectable()
export class CatService {
    getCat(): Cat{
        return {
            'name': 'cat',
            'age': 12,
            'breed': 'angora',
            'color': 'orange'
        };
    }


}
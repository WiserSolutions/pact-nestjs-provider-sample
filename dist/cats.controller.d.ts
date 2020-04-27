import { Cat } from "./cat";
import { CatService } from "./cats.service";
export declare class CatsController {
    private catsService;
    constructor(catsService: CatService);
    getCat(): Cat;
}

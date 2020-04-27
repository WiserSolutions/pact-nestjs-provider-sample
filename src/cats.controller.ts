import { Controller, Get } from "@nestjs/common";
import { Cat } from "./cat";
import { CatService } from "./cats.service";
import { get } from "http";

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatService){}
    @Get()
    getCat(): Cat{
        return this.catsService.getCat();
    }
}
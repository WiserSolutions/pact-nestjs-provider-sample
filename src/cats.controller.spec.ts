import { CatsController } from "./cats.controller"
import { async } from "rxjs/internal/scheduler/async";
import { TestingModule, Test } from "@nestjs/testing";
import { Cat } from "./cat";
import { CatService } from "./cats.service";

describe ('Cat Controller test', ()=> {
    let catsController: CatsController;
    let catService: CatService;

    beforeEach(async ()=> { 
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [CatsController],
            providers: [CatService],
          }).compile();
          catsController = await moduleRef.resolve(CatsController);
          catService = moduleRef.get<CatService>(CatService);
    });

    describe("Cat Controller main test",()=>{

        it('Get single mocked  cat', async ()=> {
            const result: Cat = {
              'name': 'cat',
              'age': 12,
              'breed': 'angora'
            };
            jest.spyOn(catsController, 'getCat').mockImplementation(()=> result);
            expect (catsController.getCat()).toMatchObject(result);
          });
    });
})
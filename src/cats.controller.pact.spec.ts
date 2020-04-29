import { CatsController } from "./cats.controller"
import { async } from "rxjs/internal/scheduler/async";
import { TestingModule, Test } from "@nestjs/testing";
import { Cat } from "./cat";
import { CatService } from "./cats.service";
import { Verifier } from '@pact-foundation/pact-node';
import path = require("path");

describe('Pact Verification', () => {

  let catsController: CatsController;
  let catService: CatService;

  const pactBrokerUrl = process.env.PACT_BROKER_URL || 'http://localhost:8080';
  const pactBrokerUsername = process.env.PACT_BROKER_USERNAME || 'pact_workshop';
  const pactBrokerPassword = process.env.PACT_BROKER_PASSWORD || 'pact_workshop';


  const catExample: Cat = {
    'name': 'cat',
    'age': 12,
    'breed': 'angora'
  };

  const providerBrokerOpts = {
    logLevel: "debug",
    providerBaseUrl: "http://localhost:3000",
    pactFilesOrDirs: ['./pacts/'],
    pactBrokerUrl: pactBrokerUrl,
    pactBrokerUsername: pactBrokerUsername,
    pactBrokerPassword: pactBrokerPassword,
    provider: 'catsPovider',
    enablePending: true,
    publishVerificationResult: true,
    providerVersion:'1.0.0',
    tags: ['prod', 'test'],
    stateHandlers:{
      'I have a single cat': ()=>{
        return Promise.resolve(catExample);
      },
      'I have a single cat object': ()=>{
        return Promise.resolve(catExample);
      }
    }
  };


beforeEach(async ()=> { 
      const moduleRef: TestingModule = await Test.createTestingModule({
          controllers: [CatsController],
          providers: [CatService],
        }).compile();
        catsController = await moduleRef.resolve(CatsController);
        catService = moduleRef.get<CatService>(CatService);
        console.log(pactBrokerUrl);
        console.log(pactBrokerPassword);
        console.log(pactBrokerUsername);
  });


  describe('verify the provider', () => {
    it('should verify the provider', async () => {
      return new Verifier(providerBrokerOpts).verify().finally(() => {
        console.log('verification ran')
      });
    });
  });

})
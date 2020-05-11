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
  const providerVersion = process.env.PROVIDER_VERSION || '1.0.0';
  const providerUrl = process.env.PROVIDER_URL || "http://localhost:3050";
  let publishVerification = false;
  if(process.env.PUBLISH_VERIFICATION ){
    publishVerification = true;
  }


  const catExample: Cat = {
    'name': 'cat',
    'age': 12,
    'breed': 'angora'
  };

  const providerBrokerOpts = {
    logLevel: "trace",
    providerBaseUrl: providerUrl,
    pactFilesOrDirs: ['./pacts/'],
    pactBrokerUrl: pactBrokerUrl,
    pactBrokerUsername: pactBrokerUsername,
    pactBrokerPassword: pactBrokerPassword,
    provider: 'catsProvider',
    enablePending: true,
    verbose:true,
    publishVerificationResult: publishVerification,
    providerVersion:providerVersion,
    consumerVersionTag: ['prod', 'test'],
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
        console.log(providerVersion);
  });


  describe('verify the provider', () => {
    it('should verify the provider', async () => {
      return new Verifier(providerBrokerOpts).verify().finally(() => {
        console.log('Verification Ran')
      });
    });
  });

})
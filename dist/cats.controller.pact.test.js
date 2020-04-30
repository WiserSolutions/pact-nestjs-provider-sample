"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cats_controller_1 = require("./cats.controller");
const testing_1 = require("@nestjs/testing");
const cats_service_1 = require("./cats.service");
const pact_node_1 = require("@pact-foundation/pact-node");
describe('Pact Verification', () => {
    let catsController;
    let catService;
    const pactBrokerUrl = process.env.PACT_BROKER_URL || 'http://localhost:8080';
    const pactBrokerUsername = process.env.PACT_BROKER_USERNAME || 'pact_workshop';
    const pactBrokerPassword = process.env.PACT_BROKER_PASSWORD || 'pact_workshop';
    const providerVersion = process.env.PROVIDER_VERSION || '1.0.0';
    const catExample = {
        'name': 'cat',
        'age': 12,
        'breed': 'angora'
    };
    const providerBrokerOpts = {
        logLevel: "trace",
        providerBaseUrl: "http://localhost:3000",
        pactFilesOrDirs: ['./pacts/'],
        pactBrokerUrl: pactBrokerUrl,
        pactBrokerUsername: pactBrokerUsername,
        pactBrokerPassword: pactBrokerPassword,
        provider: 'catsProvider',
        enablePending: true,
        publishVerificationResult: true,
        providerVersion: providerVersion,
        tags: ['prod', 'test'],
        stateHandlers: {
            'I have a single cat': () => {
                return Promise.resolve(catExample);
            },
            'I have a single cat object': () => {
                return Promise.resolve(catExample);
            }
        }
    };
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            controllers: [cats_controller_1.CatsController],
            providers: [cats_service_1.CatService],
        }).compile();
        catsController = await moduleRef.resolve(cats_controller_1.CatsController);
        catService = moduleRef.get(cats_service_1.CatService);
        console.log(pactBrokerUrl);
        console.log(pactBrokerPassword);
        console.log(pactBrokerUsername);
        console.log(providerVersion);
    });
    describe('verify the provider', () => {
        it('should verify the provider', async () => {
            return new pact_node_1.Verifier(providerBrokerOpts).verify().finally(() => {
                console.log('verification ran');
            });
        });
    });
});
//# sourceMappingURL=cats.controller.pact.test.js.map
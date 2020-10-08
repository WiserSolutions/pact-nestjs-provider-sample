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
    const providerUrl = process.env.PROVIDER_URL || "http://localhost:3050";
    let publishVerification = true;
    if (process.env.PUBLISH_VERIFICATION) {
        publishVerification = true;
    }
    const catExample = {
        'name': 'cat',
        'age': 12,
        'breed': 'angora',
        'color': 'orange'
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
        verbose: true,
        publishVerificationResult: publishVerification,
        providerVersion: providerVersion,
        consumerVersionTag: ['prod', 'test'],
        stateHandlers: {
            'I have a single cat with color': () => {
                return Promise.resolve(catExample);
            },
            'I have a single cat object with color': () => {
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
                console.log('Verification Ran');
            });
        });
    });
});
//# sourceMappingURL=cats.controller.pact.test.js.map
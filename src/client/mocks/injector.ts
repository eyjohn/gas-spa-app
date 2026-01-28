import { serverMock } from './server-mock';

// Define the GAS types locally for the shim
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GasCallback = (result: any, userObject?: any) => void;

class GasRunner {
    private _successHandler: GasCallback | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _failureHandler: ((error: Error, userObject?: any) => void) | undefined;

    withSuccessHandler(handler: GasCallback): GasRunner {
        this._successHandler = handler;
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    withFailureHandler(handler: (error: Error, userObject?: any) => void): GasRunner {
        this._failureHandler = handler;
        return this;
    }

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return new Proxy(this, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            get: (target: any, prop: string | symbol) => {
                if (prop in target) {
                    return target[prop];
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return (...args: any[]) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const mockFunc = (serverMock as any)[prop];
                    if (!mockFunc) {
                        console.warn(`Mock function '${String(prop)}' not found in serverMock.`);
                        return;
                    }

                    setTimeout(async () => {
                        try {
                            const result = await mockFunc(...args);
                            if (self._successHandler) {
                                self._successHandler(result, null);
                            }
                        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
                            if (self._failureHandler) {
                                self._failureHandler(error, null);
                            } else {
                                console.error('GAS Mock Error (no failure handler):', error);
                            }
                        }
                    }, 100);
                };
            }
        });
    }

    // Index signature to satisfy TS for dynamic proxy methods
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// Inject into window
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).google = {
    script: {
        run: new GasRunner(),
        host: {
            close: () => console.log('Mock host.close()'),
            setHeight: (h: number) => console.log(`Mock host.setHeight(${h})`),
            setWidth: (w: number) => console.log(`Mock host.setWidth(${w})`),
            editor: {
                focus: () => console.log('Mock host.editor.focus()'),
            }
        }
    }
};

console.log('GAS Mocks Injected');

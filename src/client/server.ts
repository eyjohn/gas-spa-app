import { ServerAPI } from '../types/api';

/**
 * A promise-based wrapper for google.script.run
 */
type Promisified<T> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : never;
};

// We proxy the calls to google.script.run and wrap them in Promises
export const server = new Proxy({} as Promisified<ServerAPI>, {
    get: (_, prop: string | symbol) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (...args: any[]) => {
            return new Promise((resolve, reject) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const run = (window as any).google?.script?.run;

                if (!run) {
                    reject(new Error('google.script.run not found. Are you running in GAS or is the mock injector loaded?'));
                    return;
                }

                const runner = run
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .withSuccessHandler((res: any) => resolve(res))
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .withFailureHandler((err: any) => reject(err));

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (runner as any)[prop](...args);
            });
        };
    },
});

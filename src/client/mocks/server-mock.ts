import { ServerAPI } from '../../types/api';

export const serverMock: ServerAPI = {
    doGet: () => null as unknown as GoogleAppsScript.HTML.HtmlOutput,
    getEnvInfo: () => {
        return 'Local (Mock)';
    },
};

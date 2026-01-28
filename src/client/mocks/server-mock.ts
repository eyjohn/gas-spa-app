import { ServerAPI } from '../../types/api';

export const serverMock: ServerAPI = {
    doGet: (_e: GoogleAppsScript.Events.DoGet) => null as unknown as GoogleAppsScript.HTML.HtmlOutput,
    getEnvInfo: () => {
        return 'Local (Mock)';
    },
};

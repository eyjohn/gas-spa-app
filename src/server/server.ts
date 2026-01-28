import { ServerAPI } from '../types/api';

export class Server implements ServerAPI {
    doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
        void e;
        return HtmlService.createHtmlOutputFromFile('index')
            .setTitle('React App')
            .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }

    getEnvInfo(): string {
        return 'Production (GAS)';
    }
}

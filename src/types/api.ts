export interface ServerAPI {
    // Define your public GAS functions here.
    doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput;
    getEnvInfo(): string;
}

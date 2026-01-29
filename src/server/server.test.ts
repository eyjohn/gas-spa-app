import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Server } from './server';

describe('Server', () => {
    let server: Server;

    beforeEach(() => {
        server = new Server();
    });

    it('should return correct environment info', () => {
        expect(server.getEnvInfo()).toBe('Production (GAS)');
    });

    it('should handle doGet', () => {
        // Mock HtmlService global
        const mockSetXFrameOptionsMode = vi.fn();
        const mockSetTitle = vi.fn().mockReturnValue({ setXFrameOptionsMode: mockSetXFrameOptionsMode });
        const mockCreateHtmlOutputFromFile = vi.fn().mockReturnValue({ setTitle: mockSetTitle });

        vi.stubGlobal('HtmlService', {
            createHtmlOutputFromFile: mockCreateHtmlOutputFromFile,
            XFrameOptionsMode: { ALLOWALL: 'ALLOWALL' }
        });

        // Mock event object
        const e = {} as GoogleAppsScript.Events.DoGet;

        server.doGet(e);

        expect(mockCreateHtmlOutputFromFile).toHaveBeenCalledWith('index');
        expect(mockSetTitle).toHaveBeenCalledWith('React App');
        expect(mockSetXFrameOptionsMode).toHaveBeenCalledWith('ALLOWALL');
    });
});

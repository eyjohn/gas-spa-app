import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as serverModule from './server';

// Mock the server module
vi.mock('./server', () => ({
    server: {
        getEnvInfo: vi.fn(),
    },
}));

describe('App', () => {
    it('renders initial state and fetches env info', async () => {
        // Setup mock return value
        const mockGetEnvInfo = vi.mocked(serverModule.server.getEnvInfo);
        mockGetEnvInfo.mockResolvedValue('Test Environment');

        render(<App />);

        // Check for static text
        expect(screen.getByText(/Material UI Vite App/i)).toBeInTheDocument();

        // Check loading state (optional, might be too fast)
        // expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

        // Check async result
        await waitFor(() => {
            expect(screen.getByText(/Test Environment/i)).toBeInTheDocument();
        });
    });
});

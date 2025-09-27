declare global {
    interface Window {
        __ENV__?: { API_BASE?: string };
    }
}
export {};
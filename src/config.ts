const processModule = require('process');
export const API_BASE: string =
    (window.__ENV__ && window.__ENV__.API_BASE) ||
    (processModule.env.REACT_APP_API_BASE ?? processModule.env.VITE_API_BASE) ||
    '/api';
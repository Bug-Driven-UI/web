// example https://github.com/vitrivdolkom/wolf-bank-frontend/blob/main/src/utils/api/instance.ts
export default {
  client: {
    input: { target: './admin.yaml' },
    output: {
      mode: 'single',
      schemas: './generated/api/admin/models',
      client: 'react-query',
      target: './generated/api/admin/requests',
      prettier: true,
      override: {
        mutator: {
          path: './src/utils/api/instance.ts',
          name: 'getInstance'
        }
      }
    }
  }
};

// example https://github.com/vitrivdolkom/wolf-bank-frontend/blob/main/src/utils/api/instance.ts
export default {
  admin: {
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
  },
  engine: {
    input: { target: './engine.yaml' },
    output: {
      mode: 'single',
      schemas: './generated/api/engine/models',
      client: 'react-query',
      target: './generated/api/engine/requests',
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

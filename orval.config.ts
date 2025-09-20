// example https://github.com/vitrivdolkom/wolf-bank-frontend/blob/main/src/utils/api/instance.ts
export default {
  client: {
    input: { target: './example-apiV2.yaml' },
    output: {
      mode: 'tags-split',
      schemas: './generated/api/models',
      client: 'react-query',
      target: './generated/api/requests',
      prettier: true
      // override: {
      //   mutator: {
      //     path: './src/utils/api/instance.ts',
      //     name: 'getInstance'
      //   }
      // }
    }
  }
};

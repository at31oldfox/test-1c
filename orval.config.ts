import { defineConfig, Options } from 'orval';

export default defineConfig({
  backend: {
    mutator: {
      path: 'packages/api/src/interceptor.ts',
      name: 'customInstance',
    },
    output: {
      mode: 'tags-split',
      target: 'packages/api/src/codegen/client.ts',
      schemas: 'packages/api/src/codegen/models',
      client: 'react-query',
      mock: false,
      clean: true,
      override: {
        query: {
          useInfinite: false,
          useQuery: false,
          useMutation: false,
        },
      },
    },
    input: {
      target: 'openapi.json',
      override: {
        transformer: 'packages/api/src/transformer.ts',
      },
      validation: false,
    },
    hooks: {
      afterAllFilesWrite: ['eslint --fix'],
    },
  } as Options,
});

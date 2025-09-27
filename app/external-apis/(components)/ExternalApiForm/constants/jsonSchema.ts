import type { JSONSchema7 } from 'json-schema';

export const EXTERNAL_API_SCHEMA_JSON_SCHEMA: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Schema (no-$ref, depth=2)',
  description:
    'Универсальная схема типов (object, array, string, number) без $ref. Поддерживается вложенность object/array до 2 уровней.',
  oneOf: [
    {
      type: 'object',
      additionalProperties: false,
      required: ['type', 'properties'],
      properties: {
        type: { const: 'object' },
        properties: {
          type: 'object',
          description: 'Словарь свойств объекта (имя поля -> схема).',
          additionalProperties: {
            oneOf: [
              {
                type: 'object',
                additionalProperties: false,
                required: ['type', 'properties'],
                properties: {
                  type: { const: 'object' },
                  properties: {
                    type: 'object',
                    description: 'Словарь свойств объекта (имя поля -> схема).',
                    additionalProperties: {
                      oneOf: [
                        {
                          type: 'object',
                          additionalProperties: false,
                          required: ['type'],
                          properties: {
                            type: { const: 'string' }
                          }
                        },
                        {
                          type: 'object',
                          additionalProperties: false,
                          required: ['type'],
                          properties: {
                            type: { const: 'number' }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                type: 'object',
                additionalProperties: false,
                required: ['type', 'items'],
                properties: {
                  type: { const: 'array' },
                  items: {
                    oneOf: [
                      {
                        type: 'object',
                        additionalProperties: false,
                        required: ['type'],
                        properties: {
                          type: { const: 'string' }
                        }
                      },
                      {
                        type: 'object',
                        additionalProperties: false,
                        required: ['type'],
                        properties: {
                          type: { const: 'number' }
                        }
                      }
                    ]
                  }
                }
              },
              {
                type: 'object',
                additionalProperties: false,
                required: ['type'],
                properties: {
                  type: { const: 'string' }
                }
              },
              {
                type: 'object',
                additionalProperties: false,
                required: ['type'],
                properties: {
                  type: { const: 'number' }
                }
              }
            ]
          }
        }
      }
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['type', 'items'],
      properties: {
        type: { const: 'array' },
        items: {
          oneOf: [
            {
              type: 'object',
              additionalProperties: false,
              required: ['type', 'properties'],
              properties: {
                type: { const: 'object' },
                properties: {
                  type: 'object',
                  description: 'Словарь свойств объекта (имя поля -> схема).',
                  additionalProperties: {
                    oneOf: [
                      {
                        type: 'object',
                        additionalProperties: false,
                        required: ['type'],
                        properties: {
                          type: { const: 'string' }
                        }
                      },
                      {
                        type: 'object',
                        additionalProperties: false,
                        required: ['type'],
                        properties: {
                          type: { const: 'number' }
                        }
                      }
                    ]
                  }
                }
              }
            },
            {
              type: 'object',
              additionalProperties: false,
              required: ['type', 'items'],
              properties: {
                type: { const: 'array' },
                items: {
                  oneOf: [
                    {
                      type: 'object',
                      additionalProperties: false,
                      required: ['type'],
                      properties: {
                        type: { const: 'string' }
                      }
                    },
                    {
                      type: 'object',
                      additionalProperties: false,
                      required: ['type'],
                      properties: {
                        type: { const: 'number' }
                      }
                    }
                  ]
                }
              }
            },
            {
              type: 'object',
              additionalProperties: false,
              required: ['type'],
              properties: {
                type: { const: 'string' }
              }
            },
            {
              type: 'object',
              additionalProperties: false,
              required: ['type'],
              properties: {
                type: { const: 'number' }
              }
            }
          ]
        }
      }
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['type'],
      properties: {
        type: { const: 'string' }
      }
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['type'],
      properties: {
        type: { const: 'number' }
      }
    }
  ]
};

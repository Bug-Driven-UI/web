import type { JSONSchema7 } from 'json-schema';

import type { Component } from '@/generated/api/admin/models';

const BASE_COMPONENT: Record<string, JSONSchema7> = {
  id: {
    type: 'string'
  },
  interactions: {
    type: 'array',
    items: {
      type: 'object',
      description: 'Базовая модель взаимодействия.',
      required: ['type', 'actions'],
      properties: {
        type: {
          type: 'string',
          enum: ['onClick', 'onShow']
        },
        actions: {
          type: 'array',
          items: {
            required: ['type'],
            description: 'Вызываемое действие при взаимодействии',
            oneOf: [
              {
                type: 'object',
                required: ['type', 'name'],
                properties: {
                  type: {
                    const: 'command'
                  },
                  name: {
                    type: 'string',
                    description: 'Название команды, которую нужно исполнить'
                  },
                  params: {
                    description: 'Передаваемые параметры для исполнения команды',
                    additionalProperties: true
                  }
                }
              },
              {
                type: 'object',
                required: ['type', 'screenName'],
                properties: {
                  type: {
                    const: 'updateScreen'
                  },
                  screenName: {
                    type: 'string',
                    description: 'Название экрана'
                  },
                  screenNavigationParams: {
                    description: 'Передаваемые параметры для исполнения команды',
                    additionalProperties: true
                  }
                }
              },
              {
                type: 'object',
                required: ['type', 'screenName'],
                properties: {
                  type: {
                    const: 'navigateTo'
                  },
                  screenName: {
                    type: 'string',
                    description: 'Название экрана'
                  },
                  screenNavigationParams: {
                    description: 'Передаваемые параметры для исполнения команды',
                    additionalProperties: true
                  }
                }
              },
              {
                type: 'object',
                required: ['type'],
                properties: {
                  type: {
                    const: 'navigateBack'
                  }
                }
              }
            ]
          }
        }
      }
    }
  },
  paddings: {
    type: 'object',
    required: ['left', 'right', 'bottom', 'top'],
    properties: {
      left: {
        type: 'integer',
        default: 0
      },
      right: {
        type: 'integer',
        default: 0
      },
      bottom: {
        type: 'integer',
        default: 0
      },
      top: {
        type: 'integer',
        default: 0
      }
    },
    additionalProperties: false
  },
  margins: {
    type: 'object',
    required: ['left', 'right', 'bottom', 'top'],
    properties: {
      left: {
        type: 'integer',
        default: 0
      },
      right: {
        type: 'integer',
        default: 0
      },
      bottom: {
        type: 'integer',
        default: 0
      },
      top: {
        type: 'integer',
        default: 0
      }
    },
    additionalProperties: false
  },
  width: {
    required: ['type'],
    description: 'Полиморфный размер',
    oneOf: [
      {
        type: 'object',
        properties: {
          type: {
            const: 'fixed'
          },
          value: {
            type: 'integer'
          }
        },
        required: ['type', 'value']
      },
      {
        type: 'object',
        properties: {
          type: {
            const: 'weighted'
          },
          fraction: {
            type: 'number'
          }
        },
        required: ['fraction', 'type']
      },
      {
        type: 'object',
        properties: {
          type: {
            const: 'matchParent'
          }
        },
        required: ['type']
      },
      {
        type: 'object',
        properties: {
          type: {
            const: 'wrapContent'
          }
        },
        required: ['type']
      }
    ]
  },
  height: {
    required: ['type'],
    description: 'Полиморфный размер',
    oneOf: [
      {
        type: 'object',
        properties: {
          type: {
            const: 'fixed'
          },
          value: {
            type: 'integer'
          }
        },
        required: ['type', 'value']
      },
      {
        type: 'object',
        properties: {
          type: {
            const: 'weighted'
          },
          fraction: {
            type: 'number'
          }
        },
        required: ['fraction', 'type']
      },
      {
        type: 'object',
        properties: {
          type: {
            const: 'matchParent'
          }
        },
        required: ['type']
      },
      {
        type: 'object',
        properties: {
          type: {
            const: 'wrapContent'
          }
        },
        required: ['type']
      }
    ]
  },
  backgroundColor: {
    type: 'object',
    required: ['token'],
    properties: {
      token: {
        type: 'string'
      }
    },
    additionalProperties: false
  },
  border: {
    type: 'object',
    required: ['color', 'thickness'],
    properties: {
      color: {
        type: 'object',
        required: ['token'],
        properties: {
          token: {
            type: 'string'
          }
        },
        additionalProperties: false
      },
      thickness: {
        type: 'integer'
      }
    }
  },
  shape: {
    type: 'object',
    required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    properties: {
      type: {
        type: 'string',
        enum: ['roundedCorners']
      },
      topRight: {
        type: 'integer',
        default: 0
      },
      topLeft: {
        type: 'integer',
        default: 0
      },
      bottomRight: {
        type: 'integer',
        default: 0
      },
      bottomLeft: {
        type: 'integer',
        default: 0
      }
    }
  }
};

const TEXT_WITH_STYLE: JSONSchema7 = {
  type: 'object',
  required: ['text', 'colorStyle', 'textStyle'],
  properties: {
    text: {
      type: 'string'
    },
    textStyle: {
      type: 'object',
      required: ['token'],
      properties: {
        token: {
          type: 'string'
        }
      },
      additionalProperties: false
    },
    colorStyle: {
      type: 'object',
      required: ['token'],
      properties: {
        token: {
          type: 'string'
        }
      },
      additionalProperties: false
    }
  }
};

export const COMPONENTS_JSON_SCHEMA: Record<Component['type'], JSONSchema7> = {
  box: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Box',
    type: 'object',
    properties: {
      type: {
        const: 'box'
      },
      ...BASE_COMPONENT
    },
    required: ['height', 'id', 'interactions', 'type', 'width'],
    additionalProperties: false
  },
  row: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Row (inline-only, no $ref, children ignored)',
    type: 'object',
    properties: {
      type: {
        const: 'row'
      },
      ...BASE_COMPONENT
    },
    required: ['height', 'id', 'interactions', 'type', 'width'],
    additionalProperties: false
  },
  column: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Column (inline-only, no $ref, children ignored)',
    type: 'object',
    properties: {
      type: {
        const: 'column'
      },
      ...BASE_COMPONENT
    },
    required: ['height', 'id', 'interactions', 'type', 'width'],
    additionalProperties: false
  },
  text: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Text',
    type: 'object',
    properties: {
      type: {
        const: 'text'
      },
      ...BASE_COMPONENT,
      textWithStyle: TEXT_WITH_STYLE
    },
    required: ['colorStyle', 'height', 'id', 'interactions', 'text', 'textStyle', 'type', 'width']
  },
  image: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Image',
    type: 'object',
    properties: {
      type: {
        const: 'image'
      },
      ...BASE_COMPONENT,
      imageUrl: {
        type: 'string'
      },
      badge: {
        required: ['type'],
        oneOf: [
          {
            type: 'object',
            properties: {
              type: {
                const: 'badgeWithImage'
              },
              imageUrl: {
                type: 'string'
              }
            },
            required: ['imageUrl', 'type']
          },
          {
            type: 'object',
            properties: {
              type: {
                const: 'badgeWithText'
              },
              textWithStyle: TEXT_WITH_STYLE
            },
            required: ['textWithStyle', 'type']
          }
        ]
      }
    },
    required: ['height', 'id', 'imageUrl', 'interactions', 'type', 'width']
  },
  input: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Input',
    type: 'object',
    properties: {
      type: {
        const: 'input'
      },
      ...BASE_COMPONENT,
      textWithStyle: TEXT_WITH_STYLE,
      mask: {
        type: 'string',
        enum: ['phone']
      },
      rightIcon: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          type: {
            const: 'image'
          },
          ...BASE_COMPONENT,
          imageUrl: {
            type: 'string'
          },
          badge: {
            required: ['type'],
            oneOf: [
              {
                type: 'object',
                properties: {
                  type: {
                    const: 'badgeWithImage'
                  },
                  imageUrl: {
                    type: 'string'
                  }
                },
                required: ['imageUrl', 'type']
              },
              {
                type: 'object',
                properties: {
                  type: {
                    const: 'badgeWithText'
                  },
                  textWithStyle: TEXT_WITH_STYLE
                },
                required: ['textWithStyle', 'type']
              }
            ]
          }
        },
        required: ['height', 'id', 'imageUrl', 'interactions', 'type', 'width']
      },
      regex: {
        type: 'string',
        enum: ['email']
      },
      placeholder: {
        type: 'object',
        required: ['text', 'textStyle', 'colorStyle'],
        properties: {
          textWithStyle: TEXT_WITH_STYLE
        },
        additionalProperties: false
      },
      hint: {
        type: 'object',
        required: ['text', 'textStyle', 'colorStyle'],
        properties: {
          textWithStyle: TEXT_WITH_STYLE
        },
        additionalProperties: false
      }
    },
    required: [
      'colorStyle',
      'height',
      'id',
      'interactions',
      'rightIcon',
      'text',
      'textStyle',
      'type',
      'width'
    ],
    additionalProperties: false
  },
  spacer: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Spacer',
    type: 'object',
    properties: {
      type: {
        const: 'spacer'
      },
      ...BASE_COMPONENT
    },
    required: ['height', 'id', 'interactions', 'type', 'width']
  },
  progressBar: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'ProgressBar',
    type: 'object',
    properties: {
      type: {
        const: 'progressBar'
      },
      ...BASE_COMPONENT
    },
    required: ['height', 'id', 'interactions', 'type', 'width']
  },
  switch: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Switch',
    type: 'object',
    properties: {
      type: {
        const: 'switch'
      },
      ...BASE_COMPONENT
    },
    required: ['height', 'id', 'interactions', 'type', 'width']
  },
  button: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Button',
    type: 'object',
    properties: {
      type: {
        const: 'button'
      },
      ...BASE_COMPONENT,
      textWithStyle: TEXT_WITH_STYLE,
      enabled: {
        type: 'boolean'
      }
    },
    required: ['enabled', 'height', 'id', 'interactions', 'textWithStyle', 'type', 'width']
  },
  stateful: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'StatefulComponent',
    type: 'object',
    properties: {
      type: {
        const: 'stateful'
      },
      ...BASE_COMPONENT
    },
    required: ['height', 'id', 'interactions', 'type', 'width'],
    additionalProperties: false
  },
  dynamicRow: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'DynamicRow',
    type: 'object',
    properties: {
      type: {
        const: 'dynamicRow'
      },
      ...BASE_COMPONENT,
      itemsData: {
        type: 'string',
        description: 'Выражение, откуда подтягивать данные'
      },
      itemAlias: {
        type: 'string',
        description: 'Алиас, для ссылки на данные'
      },
      itemTemplateName: {
        type: 'string',
        description: 'Название шаблона для заполнения ответа от команды (если указан)'
      }
    },
    required: [
      'height',
      'id',
      'interactions',
      'itemAlias',
      'itemTemplateName',
      'itemsData',
      'type',
      'width'
    ],
    additionalProperties: false
  },
  dynamicColumn: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'DynamicColumn',
    type: 'object',
    properties: {
      type: {
        const: 'dynamicColumn'
      },
      ...BASE_COMPONENT,
      itemsData: {
        type: 'string',
        description: 'Выражение, откуда подтягивать данные'
      },
      itemAlias: {
        type: 'string',
        description: 'Алиас, для ссылки на данные'
      },
      itemTemplateName: {
        type: 'string',
        description: 'Название шаблона для заполнения ответа от команды (если указан)'
      }
    },
    required: [
      'height',
      'id',
      'interactions',
      'itemAlias',
      'itemTemplateName',
      'itemsData',
      'type',
      'width'
    ],
    additionalProperties: false
  }
};

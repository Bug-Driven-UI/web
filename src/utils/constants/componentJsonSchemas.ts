import type { JSONSchema7 } from 'json-schema';

import type { Component } from '@/generated/api/admin/models';

// todo actualize schemas with swagger
export const COMPONENT_JSON_SCHEMAS: Record<Component['type'], JSONSchema7> = {
  row: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Row',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type', 'interactions', 'width', 'height'],
    properties: {
      id: { type: 'string' },
      type: { const: 'row' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      }
    }
  },
  box: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Box',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type', 'interactions', 'width', 'height'],
    properties: {
      id: { type: 'string' },
      type: { const: 'box' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      }
    }
  },
  column: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Column',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type', 'interactions', 'width', 'height'],
    properties: {
      id: { type: 'string' },
      type: { const: 'column' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      }
    }
  },
  text: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Text',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type', 'interactions', 'width', 'height', 'textWithStyle'],
    properties: {
      id: { type: 'string' },
      type: { const: 'text' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      },
      textWithStyle: { type: 'object' }
    }
  },
  image: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Image',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type', 'interactions', 'width', 'height', 'imageUrl'],
    properties: {
      id: { type: 'string' },
      type: { const: 'image' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      },
      imageUrl: { type: 'string' },
      badge: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'textWithStyle'],
        properties: {
          type: { const: 'badge' },
          imageUrl: { type: 'string' },
          textWithStyle: { type: 'object' }
        }
      }
    }
  },
  spacer: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Spacer',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type', 'interactions', 'width', 'height'],
    properties: {
      id: { type: 'string' },
      type: { const: 'spacer' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      }
    }
  },
  progressBar: {
    $schema: 'http-schema.org/draft-07/schema#',
    title: 'ProgressBar',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type', 'interactions', 'width', 'height'],
    properties: {
      id: { type: 'string' },
      type: { const: 'progressBar' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      }
    }
  },
  switch: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Switch',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type', 'interactions', 'width', 'height'],
    properties: {
      id: { type: 'string' },
      type: { const: 'switch' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      }
    }
  },
  button: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Button',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'type', 'interactions', 'width', 'height', 'textWithStyle', 'enabled'],
    properties: {
      id: { type: 'string' },
      type: { const: 'button' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      },
      textWithStyle: { type: 'object' },
      enabled: { type: 'boolean' }
    }
  },
  dynamicColumn: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'DynamicColumn',
    type: 'object',
    additionalProperties: false,
    required: [
      'id',
      'type',
      'interactions',
      'width',
      'height',
      'itemsData',
      'itemAlias',
      'itemTemplateId'
    ],
    properties: {
      id: { type: 'string' },
      type: { const: 'dynamicColumn' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      },
      itemsData: { type: 'string' },
      itemAlias: { type: 'string' },
      itemTemplateId: { type: 'string', format: 'uuid' }
    }
  },
  dynamicRow: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'DynamicRow',
    type: 'object',
    additionalProperties: false,
    required: [
      'id',
      'type',
      'interactions',
      'width',
      'height',
      'itemsData',
      'itemAlias',
      'itemTemplateId'
    ],
    properties: {
      id: { type: 'string' },
      type: { const: 'dynamicRow' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      },
      itemsData: { type: 'string' },
      itemAlias: { type: 'string' },
      itemTemplateId: { type: 'string', format: 'uuid' }
    }
  },
  stateful: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'StatefulComponent',
    type: 'object',
    additionalProperties: true,
    required: ['id', 'type', 'interactions', 'width', 'height'],
    properties: {
      id: { type: 'string' },
      type: { const: 'stateful' },
      interactions: { type: 'array', items: { type: 'object' } },
      paddings: { type: 'object' },
      margins: { type: 'object' },
      width: { type: 'object' },
      height: { type: 'object' },
      backgroundColor: { type: 'object' },
      border: {
        type: 'object',
        additionalProperties: false,
        required: ['color', 'thickness'],
        properties: {
          color: { type: 'object' },
          thickness: { type: 'integer' }
        }
      },
      shape: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        properties: {
          type: { type: 'string', enum: ['roundedCorners'] },
          topRight: { type: 'integer', default: 0 },
          topLeft: { type: 'integer', default: 0 },
          bottomRight: { type: 'integer', default: 0 },
          bottomLeft: { type: 'integer', default: 0 }
        }
      }
    }
  }
  // todo
  // input: {
  //   $schema: 'http://json-schema.org/draft-07/schema#',
  //   title: 'Input (textField)',
  //   type: 'object',
  //   additionalProperties: false,
  //   required: ['id', 'type', 'interactions', 'width', 'height', 'textWithStyle', 'rightIcon'],
  //   properties: {
  //     id: { type: 'string' },
  //     type: { const: 'textField' },
  //     interactions: { type: 'array', items: { type: 'object' } },
  //     paddings: { type: 'object' },
  //     margins: { type: 'object' },
  //     width: { type: 'object' },
  //     height: { type: 'object' },
  //     backgroundColor: { type: 'object' },
  //     border: {
  //       type: 'object',
  //       additionalProperties: false,
  //       required: ['color', 'thickness'],
  //       properties: {
  //         color: { type: 'object' },
  //         thickness: { type: 'integer' }
  //       }
  //     },
  //     shape: {
  //       type: 'object',
  //       additionalProperties: false,
  //       required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
  //       properties: {
  //         type: { type: 'string', enum: ['roundedCorners'] },
  //         topRight: { type: 'integer', default: 0 },
  //         topLeft: { type: 'integer', default: 0 },
  //         bottomRight: { type: 'integer', default: 0 },
  //         bottomLeft: { type: 'integer', default: 0 }
  //       }
  //     },
  //     textWithStyle: { type: 'object' },
  //     mask: { type: 'string' },
  //     rightIcon: {
  //       title: 'Embedded Image (for rightIcon)',
  //       type: 'object',
  //       additionalProperties: false,
  //       required: ['id', 'type', 'interactions', 'width', 'height', 'imageUrl'],
  //       properties: {
  //         id: { type: 'string' },
  //         type: { const: 'image' },
  //         interactions: { type: 'array', items: { type: 'object' } },
  //         paddings: { type: 'object' },
  //         margins: { type: 'object' },
  //         width: { type: 'object' },
  //         height: { type: 'object' },
  //         backgroundColor: { type: 'object' },
  //         border: {
  //           type: 'object',
  //           additionalProperties: false,
  //           required: ['color', 'thickness'],
  //           properties: {
  //             color: { type: 'object' },
  //             thickness: { type: 'integer' }
  //           }
  //         },
  //         shape: {
  //           type: 'object',
  //           additionalProperties: false,
  //           required: ['type', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
  //           properties: {
  //             type: { type: 'string', enum: ['roundedCorners'] },
  //             topRight: { type: 'integer', default: 0 },
  //             topLeft: { type: 'integer', default: 0 },
  //             bottomRight: { type: 'integer', default: 0 },
  //             bottomLeft: { type: 'integer', default: 0 }
  //           }
  //         },
  //         imageUrl: { type: 'string' },
  //         badge: {
  //           type: 'object',
  //           additionalProperties: false,
  //           required: ['type', 'textWithStyle'],
  //           properties: {
  //             type: { const: 'badge' },
  //             imageUrl: { type: 'string' },
  //             textWithStyle: { type: 'object' }
  //           }
  //         }
  //       }
  //     },
  //     regex: { type: 'string', enum: ['EMAIL'] },
  //     placeholder: {
  //       type: 'object',
  //       additionalProperties: false,
  //       required: ['textWithStyle'],
  //       properties: { textWithStyle: { type: 'object' } }
  //     },
  //     hint: {
  //       type: 'object',
  //       additionalProperties: false,
  //       required: ['textWithStyle'],
  //       properties: { textWithStyle: { type: 'object' } }
  //     }
  //   }
  // }
};

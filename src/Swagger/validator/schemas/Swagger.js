export default {
  $id: '$Swagger',
  type: 'object',
  required: ['explorerPath', 'publicDir', 'baseUrl'],
  errorMessage: {
    required: {
      explorerPath: 'Swagger needs a path where it will be served in the browser.',
      publicDir: 'Swagger needs a folder path where its assets will be in placed.',
      baseUrl: 'Swagger needs to know the base url of the API for making API calls.'
    },
    properties: {
      explorerPath: 'Explorer path should be in the format /<path_name>.',
      publicDir: 'Expecting a public directory where swagger-ui files will be placed. eg: public.',
      baseUrl: 'Base URL should be in correct URL format.',
      title: 'Title must be a string that is not less than 3 characters.',
      description: 'Description must be a string that is not less than 5 characters.',
      version: 'Version must be a string.',
    }
  },
  properties: {
    explorerPath: {
      type: 'string',
      // eslint-disable-next-line no-useless-escape
      pattern: '^\/.+'
    },
    publicDir: {
      file: true
    },
    baseUrl: {
      anyOf: [
        {
          type: 'string',
          // ^(http|https):\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{4})?$
          pattern: '^(http|https):\\/\\/\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{4})?$'
        },
        {
          type: 'string',
          // ^(http|https):\/\/[a-zA-Z]+\.[a-zA-Z]{3,8}(:\d{4})?$
          pattern: '^(http|https):\\/\\/[a-zA-Z]+\\.[a-zA-Z]{3,8}(:\\d{4})?$'
        },
        {
          type: 'string',
          // ^(http|https):\/\/localhost(:\d{4})?$
          pattern: '^(http|https):\\/\\/localhost(:\\d{4})?$'
        }
      ]
    },
    title: {
      type: 'string',
      minLength: 3
    },
    description: {
      type: 'string',
      minLength: 5
    },
    version: {
      type: 'string'
    },
    security: {
      type: 'object',
      patternProperties: {
        [`^[a-zA-Z0-9\\.\\-_]+$`]: {
          oneOf: [
            {
              type: 'object',
              required: ['type', 'name', 'in'],
              properties: {
                type: {
                  type: 'string',
                  enum: ['apiKey']
                },
                name: {
                  type: 'string'
                },
                in: {
                  type: 'string',
                  enum: ['header', 'query', 'cookie']
                },
                description: {
                  type: 'string'
                }
              },
              patternProperties: {
                [`^x-`]: {}
              },
              additionalProperties: false
            },
            {
              type: 'object',
              required: ['scheme', 'type'],
              properties: {
                scheme: {
                  type: 'string'
                },
                bearerFormat: {
                  type: 'string'
                },
                description: {
                  type: 'string'
                },
                type: {
                  type: 'string',
                  enum: ['http']
                }
              }
            }
          ]
        }
      }
    }
  }
}
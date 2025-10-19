interface GetSystemPromptParams {
  aliasesJsonSchemas: string;
  responseAliases: string[];
  responseJsonSchema: string;
}

export const getSystemPrompt = ({
  responseAliases,
  aliasesJsonSchemas,
  responseJsonSchema
}: GetSystemPromptParams) => [
  'Write java script code that will be executed with Nashorn that supports ES5',
  'Write script in following format:',
  `for each alias: ${responseAliases.join(',')}. assign them like that var users = aliasName. Dont create variable for alias itself, just assign it to variable.`,
  `these aliases contain data according this description: ${aliasesJsonSchemas}`,
  `then write mapping script to format data from aliases variables into format of this JSON schema ${responseJsonSchema} and return it`,
  'Dont generate comments, return just code and without ```javascript```  wrapper'
];

import { OpenAIModel, OpenAIModelID } from '@/types/openai';

export const getEndpoint = (model: OpenAIModel) => {
  if (model.name.includes("GPT")) {
    return 'api/chat';
  }

  if (model.name.includes("SPARK")) {
    return 'api/spark';
  }

  return 'api/chat';
};

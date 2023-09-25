import { OPENAI_API_TYPE } from '../utils/app/const';

export interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}

export enum OpenAIModelID {
  SPARK_1_5 = 'spark-v-1-5',
  SPARK_2 = 'spark-v-2',
  GPT_3_5 = 'gpt-3.5-turbo',
  GPT_3_5_AZ = 'gpt-35-turbo',
  GPT_4 = 'gpt-4',
  GPT_4_32K = 'gpt-4-32k',
}

// in case the `DEFAULT_MODEL` environment variable is not set or set to an unsupported model
export const fallbackModelID = OpenAIModelID.GPT_3_5;

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
  [OpenAIModelID.SPARK_1_5]: {
    id: OpenAIModelID.SPARK_1_5,
    name: 'SPARK-1.5',
    maxLength: 8192,
    tokenLimit: 8192,
  },
  [OpenAIModelID.SPARK_2]: {
    id: OpenAIModelID.SPARK_2,
    name: 'SPARK-2.0',
    maxLength: 8192,
    tokenLimit: 8192,
  },
  [OpenAIModelID.GPT_3_5]: {
    id: OpenAIModelID.GPT_3_5,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.GPT_3_5_AZ]: {
    id: OpenAIModelID.GPT_3_5_AZ,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.GPT_4]: {
    id: OpenAIModelID.GPT_4,
    name: 'GPT-4',
    maxLength: 24000,
    tokenLimit: 8000,
  },
  [OpenAIModelID.GPT_4_32K]: {
    id: OpenAIModelID.GPT_4_32K,
    name: 'GPT-4-32K',
    maxLength: 96000,
    tokenLimit: 32000,
  },
};

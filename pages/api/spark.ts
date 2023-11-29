// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import {
  SPARK_API_KEY,
  SPARK_API_SECRET,
  SPARK_APP_ID,
} from '@/utils/app/const';

import { ModelVersion, SparkClient } from 'spark-node-sdk';

const ChatDomain = {
  [ModelVersion.V3]: 'generalv3',
};

export const config = {
  runtime: 'edge',
};

export default async function handler(req: any) {
  const body = await req.json();
  const { model, messages, uid, parameters } = body as {
    model: { id: ModelVersion };
    messages: [];
    uid: string;
    parameters: object;
  };
  let client = new SparkClient(SPARK_APP_ID, SPARK_API_KEY, SPARK_API_SECRET);
  const url = client.getAuthorizationUrl(model.id);
  let params = {
    header: {
      app_id: SPARK_APP_ID,
      uid: uid,
    },
    parameter: {
      chat: {
        domain: ChatDomain[model.id],
        ...parameters,
      },
    },
    payload: {
      message: {
        text: messages,
      },
    },
  };
  return new Response(
    JSON.stringify({
      url,
      params,
    }),
  );
}

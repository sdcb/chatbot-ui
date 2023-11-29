export function* chatAsStreamAsync(
  url: string,
  params?: any,
  abortController?: AbortController,
) {
  let ws = new WebSocket(url);
  ws.onopen = () => {
    ws.send(JSON.stringify(params));
  };

  let end = false;

  do {
    const waitForMessage: Promise<any> = new Promise((resolve) => {
      ws.onmessage = (event) => {
        function close() {
          ws.close();
        }

        const resp = JSON.parse(event.data) as any;
        if (resp.header.code !== 0) {
            resolve({
              text: `Error! code: ${resp.header.code}, sid: ${resp.header.sid}, message: ${resp.header.message}`
            });
            end = true;
            close();
            return;
        }
        

        const text = resp.payload.choices.text
          .map((t: any) => t.content)
          .join(' ');
        const result = {
          text,
          uasge: resp.payload.usage?.text || null,
        };

        resolve(result);
        if (resp.header.status === 2) {
          close();
          end = true;
        }
      };
    });
    yield waitForMessage;
  } while (!abortController?.signal.aborted && !end);

  if (ws.readyState === 1) {
    ws.close();
  }
}

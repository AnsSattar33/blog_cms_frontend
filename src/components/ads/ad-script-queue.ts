type AdLoadTask = () => Promise<void>;

const queue: AdLoadTask[] = [];
let isProcessing = false;
const idleCallbacks: Array<() => void> = [];

async function processQueue(): Promise<void> {
  if (isProcessing) return;
  isProcessing = true;

  while (queue.length > 0) {
    const task = queue.shift();
    if (task) {
      await task();
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }

  isProcessing = false;
  idleCallbacks.splice(0).forEach((cb) => cb());
}

export function enqueueAdLoad(task: AdLoadTask): void {
  queue.push(task);
  void processQueue();
}

export function onAdQueueIdle(callback: () => void): void {
  if (!isProcessing && queue.length === 0) {
    callback();
    return;
  }
  idleCallbacks.push(callback);
}

export function loadHighPerformanceAd(
  container: HTMLElement,
  options: { adKey: string; width: number; height: number }
): Promise<void> {
  return new Promise((resolve) => {
    enqueueAdLoad(
      () =>
        new Promise((innerResolve) => {
          const optionsScript = document.createElement("script");
          optionsScript.text = `atOptions = ${JSON.stringify({
            key: options.adKey,
            format: "iframe",
            height: options.height,
            width: options.width,
            params: {},
          })};`;

          const invokeScript = document.createElement("script");
          invokeScript.src = `https://www.highperformanceformat.com/${options.adKey}/invoke.js`;
          invokeScript.async = false;

          invokeScript.onload = () => {
            innerResolve();
            resolve();
          };
          invokeScript.onerror = () => {
            innerResolve();
            resolve();
          };

          container.replaceChildren(optionsScript, invokeScript);
        })
    );
  });
}

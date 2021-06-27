export function getPromiseMock() {
  let resolveFn: (value: any | PromiseLike<any>) => void = () => { };
  let rejectFn: (reason?: any | PromiseLike<any>) => void = () => { };
  const promise: Promise<any> = new Promise((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  }) as Promise<any>;

  return { resolveFn, rejectFn, promise };
}

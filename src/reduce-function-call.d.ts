declare module "reduce-function-call" {
  function reduceFunctionCall(
    string: string,
    functionRE: string | RegExp,
    callback: (body: string, functionIdentifier: string) => void
  ): string;

  export default reduceFunctionCall;
}

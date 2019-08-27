import { FetchInterceptor } from "./interceptor"

export const createFetch = (Interceptor: FetchInterceptor) => {
  return async (host: string, option?: RequestInit) => {
    if (option === undefined) {
      option = {}
    }
    const input = await Interceptor.useReqInterceptor(host, option)
    let response

    response = fetch(input.host, input.newoption)

    return Interceptor.useResInterceptor(response)
  }
}

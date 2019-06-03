import { FetchInterceptor } from "./interceptor/interceptor";
import { createFetch } from "./interceptor/createfetch";
import { User } from '../localStorage';

let FetchInterceptor1 = new FetchInterceptor();

FetchInterceptor1.addReqInterceptor(async (option: RequestInit) => {
  const token = await User.get('token');
  console.log('拦截器');
  option.headers = { ...option.headers, "Authorization": `Bearer ${token}`, };
})

export const newFetch = createFetch(FetchInterceptor1);
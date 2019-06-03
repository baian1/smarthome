import { UserStorage } from "./user";

export const User = new UserStorage();

export const userinit = async () => {
  const id = await User.get('id');
  const token = await User.get('token');
  const devices = await User.get('devices');
  return ({
    id,
    token,
    devices: devices || [],
  })
}
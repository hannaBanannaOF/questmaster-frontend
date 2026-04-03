import { getUserInfo } from '../infra/user.api';

export async function getUserInfoUseCase() {
  return await getUserInfo();
}

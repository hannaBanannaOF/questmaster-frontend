import { UserInfo } from './domain/user.types';
import { UserInfoResponse } from './infra/dto.types';

export const mapUserInfo = (response: UserInfoResponse): UserInfo => ({
  username: response.username,
  name: response.name,
  surname: response.surname,
});

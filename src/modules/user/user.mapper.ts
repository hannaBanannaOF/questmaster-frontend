import { UserInfo } from './domain/user.types';
import { UserInfoResponse } from './infra/dto.types';

export function mapUserInfo(response: UserInfoResponse): UserInfo {
  return {
    username: response.username,
    name: response.name,
    surname: response.surname,
  };
}

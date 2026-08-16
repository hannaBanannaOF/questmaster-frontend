import { UserInfo } from '../domain';
import { UserInfoResponse } from './dto.types';

export const mapUserInfo = (response: UserInfoResponse): UserInfo => ({
  username: response.username,
  name: response.name,
  surname: response.surname,
});

import { ApiProperty } from '@nestjs/swagger';
import { UserInfo } from './user-info.type';

export class AuthResponse {
  @ApiProperty({ description: 'JWT access token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ description: 'User information', type: UserInfo })
  user: UserInfo;
}


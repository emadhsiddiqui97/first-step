import { ApiProperty } from '@nestjs/swagger';

export class UserInfo {
  @ApiProperty({ description: 'User ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: 'User name', example: 'John Doe', nullable: true, required: false })
  name: string | null;
}


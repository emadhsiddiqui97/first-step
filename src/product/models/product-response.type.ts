import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty({ description: 'Product unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Product title', example: 'Vintage Camera' })
  title: string;

  @ApiProperty({ description: 'Product description', example: 'A beautiful vintage camera in excellent condition', nullable: true, required: false })
  description: string | null;

  @ApiProperty({ description: 'Product price', example: 299.99 })
  price: number;

  @ApiProperty({ description: 'Product image URL', example: 'https://example.com/image.jpg', nullable: true, required: false })
  imageUrl: string | null;

  @ApiProperty({ description: 'Product category', example: 'Electronics', nullable: true, required: false })
  category: string | null;

  @ApiProperty({ description: 'Available stock quantity', example: 10 })
  stock: number;

  @ApiProperty({ description: 'Seller user ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  sellerId: string;

  @ApiProperty({ description: 'Product creation timestamp', example: '2025-12-25T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Product last update timestamp', example: '2025-12-25T12:00:00.000Z' })
  updatedAt: Date;
}


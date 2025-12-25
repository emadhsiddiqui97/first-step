import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './models/create-product.dto';
import { UpdateProductDto } from './models/update-product.dto';
import { ProductResponse } from './models/product-response.type';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: createProductDto.sellerId },
    });
    if (!user) {
      throw new BadRequestException(`User with ID ${createProductDto.sellerId} not found`);
    }
    const product = await this.prisma.product.create({
      data: {
        title: createProductDto.title,
        description: createProductDto.description,
        price: createProductDto.price,
        imageUrl: createProductDto.imageUrl,
        category: createProductDto.category,
        stock: createProductDto.stock ?? 0,
        sellerId: createProductDto.sellerId,
      },
    });
    return this.mapToResponse(product);
  }

  async findAll(): Promise<ProductResponse[]> {
    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products.map((product) => this.mapToResponse(product));
  }

  async findOne(id: string): Promise<ProductResponse> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.mapToResponse(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponse> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    if (updateProductDto.sellerId) {
      const user = await this.prisma.user.findUnique({
        where: { id: updateProductDto.sellerId },
      });
      if (!user) {
        throw new BadRequestException(`User with ID ${updateProductDto.sellerId} not found`);
      }
    }
    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
    return this.mapToResponse(product);
  }

  async remove(id: string): Promise<void> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.prisma.product.delete({
      where: { id },
    });
  }

  private mapToResponse(product: {
    id: string;
    title: string;
    description: string | null;
    price: any;
    imageUrl: string | null;
    category: string | null;
    stock: number;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
  }): ProductResponse {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      category: product.category,
      stock: product.stock,
      sellerId: product.sellerId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}


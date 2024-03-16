import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/product-category.entity';
import { Product } from 'src/entities/product.entity';
import { Brackets, Repository } from 'typeorm';
import { FieldRepo } from './enums/field-repo';
import { CategoryChildren } from 'src/entities/product-category-children';
import { Color } from 'src/entities/product-color.entity';
import { Size } from 'src/entities/product-size.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductGroup } from 'src/entities/product-group.entity';

import { QueryProductDto } from './dto/query-product.dto';
import { Sort } from './enums/sort-by';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(CategoryChildren)
    private readonly categoryChildrenRepo: Repository<CategoryChildren>,

    @InjectRepository(Size)
    private readonly sizeRepo: Repository<Size>,

    @InjectRepository(Color)
    private readonly colorRepo: Repository<Color>,

    @InjectRepository(ProductGroup)
    private readonly ProductGroupRepo: Repository<ProductGroup>,
  ) {}

  async getAll(field: FieldRepo, dto?: QueryProductDto) {
    let datas;

    //GET CATEGORY
    if (field === FieldRepo.CATEGORY) {
      datas = await this.categoryRepo.find({
        relations: {
          children: true,
        },
      });
    }

    //GET AND QUERY PRODUCT
    if (field === FieldRepo.PRODUCT) {
      const { color, size, sortBy, order, search } = dto;

      const orderBy = order.toUpperCase() as 'ASC' | 'DESC';

      const queryBuilder = this.productRepo.createQueryBuilder('product');

      // SortBy Price
      sortBy &&
        sortBy === Sort.PRICE &&
        queryBuilder.orderBy({
          price: orderBy,
        });

      // SortBy Color - Size
      color &&
        queryBuilder.where('color.name = :colorName', { colorName: color });
      size && queryBuilder.andWhere('size.size IN (:size)', { size });

      // Search name - category
      search &&
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where('LOWER(product.name) LIKE LOWER(:search)', {
              search: `%${search}%`,
            });
            qb.orWhere('LOWER(category.name) LIKE LOWER(:search)', {
              search: `%${search}%`,
            });
            qb.orWhere('LOWER(categoryChild.name) LIKE LOWER(:search)', {
              search: `%${search}%`,
            });
          }),
        );

      datas = await queryBuilder
        .innerJoinAndSelect('product.color', 'color')
        .innerJoinAndSelect('product.sizes', 'size')
        .innerJoinAndSelect('product.category', 'category')
        .innerJoinAndSelect('product.categoryChild', 'categoryChild')
        .innerJoinAndSelect('product.colorVariations', 'colorVariations')
        .innerJoinAndSelect('product.productGroup', 'productGroup')
        .getMany();
    }

    //GET CATEGORY
    if (field === FieldRepo.PRODUCT_GROUP) {
      datas = await this.ProductGroupRepo.find({
        relations: {
          products: true,
        },
      });
    }

    return datas;
  }

  async create(dto, field: FieldRepo) {
    let datas;

    //CREATE CATEGORY
    if (field === FieldRepo.CATEGORY) {
      const categoryDto = dto as CreateCategoryDto;
      datas = this.categoryRepo.create(categoryDto);
      await this.categoryRepo.save(datas);
    }

    //CREATE CATEGORY CHILD
    if (field === FieldRepo.CATEGORY_CHILDREN) {
      datas = this.categoryChildrenRepo.create(dto);
      await this.categoryChildrenRepo.save(datas);
    }

    //CREATE PRODUCT
    if (field === FieldRepo.PRODUCT) {
      const productList = await Promise.all(
        dto.map(async (dto) => {
          return this.productRepo.create({
            ...dto,
            colorVariations: Array.isArray(dto.colorVariationIds)
              ? dto.colorVariationIds.map((colorId) => ({ id: colorId }))
              : [],
            sizes: Array.isArray(dto.sizeIds)
              ? dto.sizeIds.map((sizeId) => ({ id: sizeId }))
              : [],
          });
        }),
      );

      datas = await this.productRepo.save(productList);
    }

    //CREATE COLOR
    if (field === FieldRepo.COLOR) {
      datas = this.colorRepo.create(dto);
      await this.colorRepo.save(datas);
    }

    //CREATE SIZE
    if (field === FieldRepo.SIZE) {
      datas = this.sizeRepo.create(dto);
      await this.sizeRepo.save(datas);
    }

    //CREATE PRODUCT GROUP
    if (field === FieldRepo.PRODUCT_GROUP) {
      datas = this.ProductGroupRepo.create(dto);
      await this.ProductGroupRepo.save(datas);
    }

    return datas;
  }

  async getById(id: string, field: FieldRepo) {
    let data;
    if (field === FieldRepo.PRODUCT) {
      data = await this.productRepo.findOne({
        relations: {
          category: true,
          color: true,
          productGroup: true,
          colorVariations: true,
          sizes: true,
        },
        where: {
          id,
        },
      });
    }
    return data;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Brackets, Repository } from 'typeorm';
import { FieldRepo } from './enums/field-repo';
import { Category } from 'src/entities/product-category';
import { Color } from 'src/entities/product-color.entity';
import { Size } from 'src/entities/product-size.entity';
import { ProductGroup } from 'src/entities/product-group.entity';

import { QueryProductDto } from './dto/query-product.dto';
import { Sort } from './enums/sort-by';
import { Material } from 'src/entities/product-material';
import { Collection } from 'src/entities/product-collection.entity';
import { CreateCollection } from './dto/create-collection.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,

    @InjectRepository(Size)
    private readonly sizeRepo: Repository<Size>,

    @InjectRepository(Color)
    private readonly colorRepo: Repository<Color>,

    @InjectRepository(ProductGroup)
    private readonly ProductGroupRepo: Repository<ProductGroup>,
  ) {}

  async getAll(field: FieldRepo, dto?: QueryProductDto, param?: string) {
    let datas;

    //GET CATEGORY
    if (field === FieldRepo.COLLECTION) {
      datas = await this.collectionRepo.find({
        relations: {
          children: true,
        },
      });
    }

    //GET CATEGORY PARAM
    if (field === FieldRepo.CATEGORY && param != undefined) {
      datas = await this.categoryRepo.find({
        where: { collection: { name: param } },
      });
    }

    //GET SUBSECTION OF PRODUCT
    if (field === FieldRepo.COLOR) {
      const sizes = await this.sizeRepo.find({
        relations: { collection: true },
      });
      const colors = await this.colorRepo.find({});
      const materials = await this.materialRepo.find({});

      datas = {
        colors,
        sizes,
        materials,
      };
    }

    //GET AND QUERY PRODUCT
    if (field === FieldRepo.PRODUCT) {
      const { color, size, sortBy, order, search } = dto;

      const orderBy = order as 'ASC' | 'DESC';

      const queryBuilder = this.productRepo.createQueryBuilder('product');

      // SortBy Price
      sortBy &&
        sortBy === Sort.PRICE &&
        queryBuilder.orderBy({
          price: orderBy,
        });

      //SortBy Mostwanted
      sortBy &&
        sortBy === Sort.MOST_WANTED &&
        queryBuilder.orderBy({
          sold: 'DESC',
        });

      //New In
      sortBy &&
        sortBy === Sort.MOST_WANTED &&
        queryBuilder.orderBy({
          sold: 'DESC',
        });

      //New In
      sortBy &&
        sortBy === Sort.NEW_IN &&
        queryBuilder.orderBy({
          created_at: 'DESC',
        });

      // SortBy Color - Size
      color &&
        queryBuilder.where('color.name = :colorName', {
          colorName: color,
        });

      size && queryBuilder.andWhere('size.size IN (:size)', { size });

      param &&
        queryBuilder.andWhere('collection.name IN (:names)', {
          names: param,
        });

      // Search name - category
      search &&
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where('LOWER(product.name) LIKE LOWER(:search)', {
              search: `%${search}%`,
            });
            qb.orWhere('LOWER(collection.name) LIKE LOWER(:search)', {
              search: `%${search}%`,
            });
            qb.orWhere('LOWER(category.name) LIKE LOWER(:search)', {
              search: `%${search}%`,
            });
          }),
        );

      datas = await queryBuilder
        .innerJoinAndSelect('product.color', 'color')
        .innerJoinAndSelect('product.sizes', 'size')
        .innerJoinAndSelect('product.collection', 'collection')
        .innerJoinAndSelect('product.category', 'category')
        .innerJoinAndSelect('product.colorVariations', 'colorVariations')
        .innerJoinAndSelect('product.productGroup', 'productGroup')
        .innerJoinAndSelect('product.material', 'material')
        .getMany();
    }

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

    //CREATE COLLECTION
    if (field === FieldRepo.COLLECTION) {
      const categoryDto = dto as CreateCollection;
      datas = this.collectionRepo.create(categoryDto);
      await this.collectionRepo.save(datas);
    }

    //CREATE CATEGORY
    if (field === FieldRepo.CATEGORY) {
      datas = this.categoryRepo.create(dto);
      await this.categoryRepo.save(datas);
    }

    //CREATE MATERIAL
    if (field === FieldRepo.MATERIAL) {
      datas = this.materialRepo.create(dto);
      await this.materialRepo.save(datas);
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
          collection: true,
          color: true,
          productGroup: {
            products: {
              material: true,
            },
          },
          colorVariations: true,
          sizes: true,
          material: true,
        },
        where: {
          id,
        },
      });
    }

    return data;
  }
}

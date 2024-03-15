import { CategoryChildren } from 'src/entities/product-category-children';

import { Category } from 'src/entities/product-category.entity';
import { Color } from 'src/entities/product-color.entity';
import { ProductGroup } from 'src/entities/product-group.entity';
import { Size } from 'src/entities/product-size.entity';
import { Product } from 'src/entities/product.entity';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'testDB',
  host: 'localhost',
  port: 5432,
  username: 'caonam',
  password: 'namnam',
  entities: [
    User,
    Role,
    Product,
    Size,
    Category,
    Color,
    CategoryChildren,
    ProductGroup,
  ],
  synchronize: true,
};

export default config;

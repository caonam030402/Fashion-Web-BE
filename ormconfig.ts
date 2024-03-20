import { Category } from 'src/entities/product-category';
import { Collection } from 'src/entities/product-collection.entity';

import { Color } from 'src/entities/product-color.entity';
import { ProductGroup } from 'src/entities/product-group.entity';
import { Material } from 'src/entities/product-material';
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
    Collection,
    Color,
    Category,
    ProductGroup,
    Material,
  ],
  synchronize: true,
};

export default config;

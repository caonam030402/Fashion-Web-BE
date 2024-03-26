import { OrderDetail } from 'src/modules/oders/entities/order-detail.entity';
import { OrderStatus } from 'src/modules/oders/entities/order-status.entity';
import { Order } from 'src/modules/oders/entities/order.entity';
import { Category } from 'src/modules/products/entities/product-category';
import { Collection } from 'src/modules/products/entities/product-collection.entity';

import { Color } from 'src/modules/products/entities/product-color.entity';
import { ProductGroup } from 'src/modules/products/entities/product-group.entity';
import { Material } from 'src/modules/products/entities/product-material';
import { Size } from 'src/modules/products/entities/product-size.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
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
    OrderDetail,
    Order,
    OrderStatus,
  ],
  synchronize: true,
};

export default config;

import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'testDB',
  host: 'localhost',
  port: 5432,
  username: 'caonam',
  password: 'namnam',
  entities: [User, Role],
  synchronize: true,
};

export default config;

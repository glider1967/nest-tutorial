import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CatsModule } from '../../src/cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCatDto } from '../../src/cats/dto/create-cat.dto';

describe('Users - /users (e2e)', () => {
  const users = {
    id: 1,
    name: 'jack',
    kind: 'others',
    isActive: true,
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: '127.0.0.1',
          port: 3307,
          username: 'root',
          password: 'root',
          database: 'test',
          autoLoadEntities: true,
          synchronize: true,
        }),
        CatsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /users]', () => {
    return request(app.getHttpServer())
      .post('/cats')
      .send(users as CreateCatDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(users);
      });
  });

  it('Get all users [GET /users]', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one user [GET /users/:id]', () => {
    return request(app.getHttpServer())
      .get('/cats/2')
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body).toBeDefined();
      });
  });

  it('Delete one user [DELETE /users/:id]', () => {
    return request(app.getHttpServer()).delete('/cats/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

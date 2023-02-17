import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route, RouteSchema } from './entities/route.entity';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { RoutesGateway } from './routes.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Route.name,
        schema: RouteSchema,
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: (): any => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: process.env.KAFKA_CLIENT_ID,
              brokers: [process.env.KAFKA_BROKER],
            },
            consumer: {
              groupId:
                !process.env.KAFKA_CONSUMER_GROUP_ID ||
                process.env.KAFKA_CONSUMER_GROUP_ID === ''
                  ? 'my-consumer-' + Math.random()
                  : process.env.KAFKA_CONSUMER_GROUP_ID,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesGateway],
})
export class RoutesModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      // context: ({ req }) => {
      //   return { req, user: req.user };
      // },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [
    UserResolver,
    UserService,
    ConfigService,
    JwtService,
    PrismaService,
    EmailService,
  ],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { Authors, AuthorsSchema } from './schemas/authors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Authors.name, schema: AuthorsSchema }]),
  ],
  providers: [AuthorsService, AuthorsResolver],
})
export class AuthorsModule {}

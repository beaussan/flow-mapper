import { Module } from '@nestjs/common';
import { SearchProviders } from './search.providers';

@Module({
  providers: [...SearchProviders],
  exports: [...SearchProviders],
})
export class SearchModule {}

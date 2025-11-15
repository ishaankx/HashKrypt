import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    // Explicitly handle promise without marking callback async
    (this.$on as (event: 'beforeExit', cb: () => void) => void)(
      'beforeExit',
      () => {
        app.close().catch((err) => {
          console.error('Error during shutdown', err);
        });
      },
    );
  }
}

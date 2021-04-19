import { DEFAULT_HANDLERS, Rester } from '@rester/core';
import 'reflect-metadata';
import { AccessModule } from './access';
import { AccessHandler } from './common/handlers';
import { QueueModule } from './queue';

const rester = new Rester({
  handlers: [AccessHandler, ...DEFAULT_HANDLERS],
  modules: [AccessModule, QueueModule],
});

rester.bootstrap();

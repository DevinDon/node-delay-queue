import { Rester } from '@rester/core';
import 'reflect-metadata';
import { QueueModule } from './queue';

// const rester = new Rester({
//   handlers: [AccessHandler, ...DEFAULT_HANDLERS],
//   modules: [AccessModule, QueueModule],
// });

const rester = new Rester({
  modules: [QueueModule],
});

rester.bootstrap();

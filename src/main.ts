import { Rester } from '@rester/core';
import 'reflect-metadata';
import { QueueModule } from './queue';

const rester = new Rester({
  modules: [QueueModule],
});

rester.bootstrap();

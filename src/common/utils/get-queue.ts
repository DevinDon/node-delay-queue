import { loadResterConfig } from '@rester/core';
import { Queue } from '@rester/queue';

const instance: { queue?: Queue } = {};
export const getQueue = () => {
  const { queue: config } = loadResterConfig() as any;
  return instance.queue = instance.queue || new Queue(config);
};

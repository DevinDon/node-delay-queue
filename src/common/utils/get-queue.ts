import { loadResterConfig } from '@rester/core';
import { ResterBroker } from '@rester/queue';

const instance: { broker?: ResterBroker } = {};
export const getBroker = () => {
  const { queue: config } = loadResterConfig() as any;
  return instance.broker = instance.broker || new ResterBroker(config);
};

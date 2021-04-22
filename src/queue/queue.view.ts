import { BaseView, ExistResponse, GET, PathQuery, PathVariable, POST, RequestBody, requiredInRange, requiredParam, requiredParamsInFields, View } from '@rester/core';
import { FullMessage, Message, ResterBroker } from '@rester/queue';
import { getBroker } from './utils';

// create, remove, modify, take, search
// one, more

@View('queue')
export class QueueView extends BaseView {

  private broker: ResterBroker;

  async init() {
    this.broker = getBroker();
  }

  @POST()
  async produce(
    @RequestBody() message: Message,
  ) {
    requiredParamsInFields(message, ['topic', 'body']);
    const id = await this.broker.produce(message);
    return new ExistResponse({
      statusCode: 201,
      data: id ? { id } : undefined,
    });
  }

  @GET(':topic')
  async consume(
    @PathVariable('topic') topic: string,
    @PathQuery('timeout') timeout: number = 300,
  ): Promise<ExistResponse<FullMessage>> {
    requiredParam(topic);
    requiredInRange(0.1 * 1000, timeout, 60 * 1000);
    return new ExistResponse({
      data: await this.broker.next({ topic }, timeout),
      message: `No message got in ${timeout}ms with topic ${topic}`,
    });
  }

}

import { BaseView, ExistResponse, GET, PathQuery, PathVariable, POST, RequestBody, requiredInRange, requiredParam, requiredParamsInFields, View } from '@rester/core';
import { FullMessage, Message, Queue } from '@rester/queue';
import { getQueue } from '../common/utils/get-queue';

// create, remove, modify, take, search
// one, more

@View('queue')
export class QueueView extends BaseView {

  private queue: Queue;

  async init() {
    this.queue = getQueue();
  }

  @POST()
  async produce(
    @RequestBody() message: Message,
  ) {
    requiredParamsInFields(message, ['topic', 'body']);
    const id = await this.queue.produce(message);
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
    requiredInRange(100, timeout, 60 * 1000);
    return new ExistResponse({
      data: await this.queue.next({ topic }, timeout),
      message: `No message got in ${timeout}ms with topic ${topic}`,
    });
  }

}

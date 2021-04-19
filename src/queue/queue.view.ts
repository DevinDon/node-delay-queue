import { BaseView, ExistResponse, GET, numberInRange, PathQuery, POST, RequestBody, requiredParam, ResterResponse, View } from '@rester/core';
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
  async create(
    @RequestBody() message: Message,
  ) {
    const id = await this.queue.produce(message);
    return new ResterResponse({
      statusCode: 201,
      data: id ? { id } : undefined,
    });
  }

  @GET()
  async take(
    @PathQuery('topic') topic: string,
    @PathQuery('timeout') timeout: number = 300,
  ): Promise<ExistResponse<FullMessage>> {
    requiredParam(topic);
    timeout = numberInRange(100, timeout, 60 * 1000);
    return new ExistResponse({
      data: await this.queue.next({ topic }, timeout),
      message: `No message got in ${timeout} ms with topic ${topic}`,
    });
  }

}

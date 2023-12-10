import { EventEmitter } from 'stream';

export class PubSub {
  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  async subscribe(topic, queue) {
    const listener = (value) => {
      queue.push(value);
    };

    const close = () => {
      this.emitter.removeListener(topic, listener);
    };

    this.emitter.on(topic, listener);
    queue.close = close;
  }

  publish(event, callback) {
    this.emitter.emit(event.topic, event.payload);
    callback();
  }
}

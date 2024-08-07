import { ApplicationResultEvents } from './application-result-events';

export class ApplicationResult<T = string> {
  public readonly event: ApplicationResultEvents;
  public readonly message?: T;

  public constructor(event: ApplicationResultEvents, message?: T) {
    this.event = event;
    this.message = message;
  }
}

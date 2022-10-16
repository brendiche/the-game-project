export class Observable <T>{
  private readonly eventType: string
  constructor(eventType: string){
    this.eventType = eventType;
  }

  next (item?:T) {
    const event = new CustomEvent<T>(this.eventType, {detail: item});
    window.dispatchEvent(event);
  }

  subscribe (callback: (e: CustomEvent<T>) => void) {
    window.addEventListener(this.eventType, callback);
  }
}
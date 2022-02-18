import { getPosition, SideType } from "./helper";

export interface ItemConfig{
  className: string;
  style: Partial<CSSStyleDeclaration>;
  side: SideType;
}
export class Item {
  private readonly _id: number;
  private readonly _initialPosition: number;
  private _element: HTMLElement;
  private _side: SideType;

  constructor(itemConfig: ItemConfig){
    this._side = itemConfig.side;
    this._id = Date.now();
    this._element = document.createElement('div');
    this._element.className = itemConfig.className;
    for(const prop in itemConfig.style){
      this._element.style[prop] = itemConfig.style[prop];
    }
    document.body.appendChild(this._element);
    this._initialPosition = getPosition(this.element);
  }

  get id(): number {
    return this._id;
  }

  get initialPosition():number{
    return this._initialPosition;
  }

  get position():number{
    return getPosition(this.element);
  }

  get element(): HTMLElement{
    return this._element;
  }
  
  get side(): SideType{
    return this._side;
  }

  public remove(): void{
    this._element.remove();
  }
}
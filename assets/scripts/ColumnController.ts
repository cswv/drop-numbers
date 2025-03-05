import { _decorator, Component, EventMouse, Input, Node } from "cc";
import { eventTarget, GameEvents } from "./GameEvents";
const { ccclass, property } = _decorator;

@ccclass("ColumnController")
export class ColumnController extends Component {
  start() {}

  update(deltaTime: number) {}

  onLoad() {
    this.node.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
  }

  onMouseDown(event: EventMouse) {
    eventTarget.emit(GameEvents.ADD_NUMBER, Number(this.node.name.at(-1)));
  }
}

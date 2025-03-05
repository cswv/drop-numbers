import {
  _decorator,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
  RichText,
  Vec3,
} from "cc";
import { Field } from "./Field";
import { eventTarget, GameEvents } from "./GameEvents";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property({ type: Prefab })
  public numberPrefab: Prefab | null = null;
  @property({ type: Node })
  public nextNumber: Node | null = null;
  @property({ type: RichText })
  public hint: RichText | null = null;
  private field: Field;

  start() {
    this.field = new Field();
    eventTarget.on(GameEvents.ADD_NUMBER, this.onAddNumber, this);
    this.changeNextNumber();
  }

  update(deltaTime: number) {}

  onAddNumber(column: number) {
    const labelComponent = this.nextNumber.getComponentInChildren(Label);
    if (labelComponent) {
      try {
        this.field.add(Number(labelComponent.string), column);
        this.changeNextNumber();
        this.hint.string = "";
        this.field.process();
        this.drawGrid();
      } catch (e) {
        this.hint.string = "Эта колонка заполнена!";
      }
    }
  }

  spawnNumber(num: number, col: number, row: number) {
    if (!this.numberPrefab) {
      return null;
    }

    const number: Node | null = instantiate(this.numberPrefab);
    const labelComponent = number.getComponentInChildren(Label);
    if (labelComponent) {
      labelComponent.string = num.toString();
    }

    this.node.addChild(number);
    number.setWorldPosition(new Vec3(425 + row * 60, 225 + col * 50, 0));
  }

  changeNextNumber() {
    const randomNum = this.field.getRandomNumber();
    const labelComponent = this.nextNumber.getComponentInChildren(Label);
    if (labelComponent) {
      labelComponent.string = randomNum.toString();
    }
  }

  drawGrid() {
    this.node.removeAllChildren();

    for (let i = 0; i < this.field.grid.length; i++) {
      for (let j = 0; j < this.field.grid[i].length; j++) {
        if (this.field.grid[i][j]) {
          this.spawnNumber(this.field.grid[i][j], i, j);
        }
      }
    }
  }
}

export class Field {
  public rows: number;
  public columns: number;
  public grid: (number | undefined)[][];

  constructor() {
    this.rows = 7;
    this.columns = 7;
    this.grid = [];
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.grid[i].push(undefined);
      }
    }
  }

  print() {
    let str = "";
    for (let i = 0; i < this.rows; i++) {
      str = this.grid[i].map((x) => (!x ? "*" : x)).join(" ") + "\n" + str;
    }
    console.log(str);
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 7) + 1;
  }

  add(number, x) {
    if (this.grid[this.rows - 1][x]) {
      throw new Error("Column is full");
    }

    for (let i = 0; i < this.rows; i++) {
      if (!this.grid[i][x]) {
        this.grid[i][x] = number;
        break;
      }
    }
  }

  process() {
    let deleted = false;
    const heights = [];
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (!this.grid[j][i]) {
          heights[i] = j;
          break;
        }
      }
      if (heights[i] === undefined) {
        heights.push(this.rows);
      }
    }
    for (let i = 0; i < this.rows; i++) {
      let arr = [];
      for (let j = 0; j <= this.columns; j++) {
        if (this.grid[i][j]) {
          arr.push(this.grid[i][j]);
          if (this.grid[i][j] === heights[j]) {
            this.grid[i][j] = undefined;
            deleted = true;
          }
        } else if (arr.length > 0) {
          for (let k = 0; k < arr.length; k++) {
            if (arr.length === arr[k]) {
              this.grid[i][j - arr.length + k] = undefined;
              deleted = true;
            }
          }
          arr = [];
        }
      }
    }
    const dropped = this.drop();
    if (dropped) {
      return this.process();
    }

    return deleted;
  }

  drop() {
    let dropped = false;
    for (let k = 0; k < this.rows; k++) {
      for (let i = this.rows - 1; i > 0; i--) {
        for (let j = 0; j < this.columns; j++) {
          if (this.grid[i][j] && !this.grid[i - 1][j]) {
            this.grid[i - 1][j] = this.grid[i][j];
            this.grid[i][j] = undefined;
            dropped = true;
          }
        }
      }
    }
    return dropped;
  }
}

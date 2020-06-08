type Term = 'O' | 'X';
type Grid = Term | null;
type Grids = [Grid, Grid, Grid, Grid, Grid, Grid, Grid, Grid, Grid]

interface IGame {
  status: STAT
  grids: Grids
  term: Term
  reset(): void
  place(pos: keyof Grids): void
  isOver(): boolean
}

export enum STAT {
  PLAYING,
  DRAW,
  O_WIN,
  X_WIN
}

export default class Game implements IGame {
  public status: STAT;
  public grids: Grids;
  public term: Term;
  static Lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  constructor () {
    this.status = STAT.PLAYING;
    this.grids = [null, null, null, null, null, null, null, null, null];
    this.term = 'O';
  }
  reset () {
    this.status = STAT.PLAYING;
    this.term = 'O';
    this.grids = [null, null, null, null, null, null, null, null, null];
  }
  swap() {
    this.term = this.term === 'O' ? 'X' : 'O'
  }
  isOver(): boolean {
    const { grids } = this;
    if ( Game.Lines.some((line: number[])=> line.every(pos => grids[pos] === 'O')) ) {
      alert('O_WIN');
      this.status = STAT.O_WIN;
      return true;
    }
    if ( Game.Lines.some((line: number[])=> line.every(pos => grids[pos] === 'X')) ) {
      alert('X_WIN');
      this.status = STAT.X_WIN;
      return true;
    }
    if (grids.every(Boolean)) {
      this.status = STAT.DRAW;
      alert('Draw');
      return true;
    }

    return false;
  }
  place(pos: keyof Grids): void {
    const { grids, status } = this;
    if (status !== STAT.PLAYING || grids[pos]) {
      return;
    }
    this.grids.splice(pos as number, 1, this.term);
    if (!this.isOver()) {
      this.swap();
    }
  }
}

function adjustBoundaries(coord: number, max: number): number {
  if (coord > max) {
    return coord - max;
  } else if (coord < 1) {
    return coord + max;
  }
  return coord;
}

function moveUp(row: number, moveBy: number, max: number): number {
  return adjustBoundaries(row - moveBy, max);
}

function moveDown(row: number, moveBy: number, max: number): number {
  return adjustBoundaries(row + moveBy, max);
}

function moveLeft(col: number, moveBy: number, max: number): number {
  return adjustBoundaries(col - moveBy, max);
}

function moveRight(col: number, moveBy: number, max: number): number {
  return adjustBoundaries(col + moveBy, max);
}

export function getCorrectPicture(
  directions: Directions,
  pics: PictureCoord,
): Coord {
  if (pics.picOne && pics.picTwo) {
    let row = pics.picTwo.row;
    let col = pics.picTwo.col;
    const maxRowCol = 5;

    switch (directions.dirOne) {
      case 'up':
        row = moveUp(row, pics.picOne.row, maxRowCol);
        break;
      case 'down':
        row = moveDown(row, pics.picOne.row, maxRowCol);
        break;
      case 'left':
        col = moveLeft(col, pics.picOne.row, maxRowCol);
        break;
      case 'right':
        col = moveRight(col, pics.picOne.row, maxRowCol);
        break;
    }

    switch (directions.dirTwo) {
      case 'up':
        row = moveUp(row, pics.picOne.col, maxRowCol);
        break;
      case 'down':
        row = moveDown(row, pics.picOne.col, maxRowCol);
        break;
      case 'left':
        col = moveLeft(col, pics.picOne.col, maxRowCol);
        break;
      case 'right':
        col = moveRight(col, pics.picOne.col, maxRowCol);
        break;
    }

    return {row, col};
  }
  return {row: 0, col: 0};
}

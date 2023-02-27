import * as constants from '../src/constants/constants';

export const setColor = (color: string) => {
  if (color === constants.WHITE) {
    return constants.ICE_COLOR;
  }
  if (color === constants.YELLOW) {
    return constants.ELECTRIC_COLOR;
  }
  if (color) {
    return color;
  }
  return constants.DEFAULT_COLOR;
};

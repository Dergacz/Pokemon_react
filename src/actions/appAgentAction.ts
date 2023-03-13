import { Dispatch } from '@reduxjs/toolkit';
import { appAgentSlice } from '../reducers/appAgentSlice';
import * as constants from '../constants/constants';

export const setAppAgentAction = (width: number) => (dispatch: Dispatch) => {
  try {
    let userAgent: 'mobile' | 'desktop' | 'tablet';
    const desktop = 1280;
    const mobile = 480;
    if (width >= desktop) {
      userAgent = constants.DESKTOP;
    } else if (width < desktop && width > mobile) {
      userAgent = constants.TABLET;
    } else {
      userAgent = constants.MOBILE;
    }
    dispatch(appAgentSlice.actions.setAppAgentSuccess(userAgent));
  } catch (e) {
    console.log(e.message);
  }
};

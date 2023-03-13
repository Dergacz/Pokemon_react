import React, { FC, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { setAppAgentAction } from '../../actions/appAgentAction';
import { IRoot } from './Root.types';

export const Root: FC<IRoot> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    dispatch(setAppAgentAction(ref?.current?.clientWidth));
  }, [ref?.current?.clientWidth]);

  return (
    <div ref={ref}>
      { children }
    </div>
  );
};

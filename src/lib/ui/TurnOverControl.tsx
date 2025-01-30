import { ReactNode } from 'react';
import classNames from 'classnames';
import cls from './select.module.css';

export type TurnOverControlProps = {
  isTurn: boolean
  children: ReactNode
  className?: string
};

export function TurnOverControl({
  isTurn,
  children,
  className,
}: TurnOverControlProps) {
  return (
    <div
      className={classNames(
        cls.turn_control,
        className,
        isTurn && cls.turn,
      )}
    >
      {children}
    </div>
  );
}

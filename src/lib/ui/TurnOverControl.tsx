import { ReactNode } from 'react';
import classNames from 'classnames';
import cls from './select.module.css';

export type TurnOverControlProps = {
  isTurn: boolean
  children: ReactNode
  className?: string
  onClick?: () => void
};

export function TurnOverControl({
  isTurn,
  children,
  className,
  onClick,
}: TurnOverControlProps) {
  return (
    <div
      role="presentation"
      onClick={onClick}
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

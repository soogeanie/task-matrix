import clsx from 'clsx';
import { BUTTON_CLASSES } from './constants';

type ButtonStyleProps = {
  color?: 'green' | 'purple' | 'red';
  style?: 'rounded' | 'iconOnly';
}

type ButtonProps = ButtonStyleProps & {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  form?: string;
  iconOnly?: boolean;
  type?: 'submit' | 'reset' | 'button';
  handleOnClick: () => void;
}

const Button = ({
  handleOnClick,
  children,
  className,
  color = 'purple',
  style = 'rounded',
  type = 'button',
  ...buttonAttrs
}: ButtonProps) => {

  return (
    <button
      type={type}
      className={clsx([
        BUTTON_CLASSES.base,
        BUTTON_CLASSES.colors[style][color],
        BUTTON_CLASSES.style[style],
        className
      ])}
      {...buttonAttrs}
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
}

export default Button
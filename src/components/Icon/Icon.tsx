import { CSSProperties, PropsWithChildren, forwardRef } from "react";
import cs from "classnames";
import './style.scss'

interface BaseIconProps extends PropsWithChildren {
  spin?: boolean;
  style?: CSSProperties;
  size?:string | string[];
  className?: string;
}

export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGSVGElement>, keyof BaseIconProps>;

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { style, children,className, size ,spin, ...rest } = props;

  const classNames = cs("icon",{
    'icon-spin':spin
  },className);
  const [width,height] = getSize(size)
  // currentColor颜色为当前color的颜色
  return (
    <svg className={classNames} fill="currentColor" width={width} height={height} ref={ref} style={style} {...rest}>
      {children}
    </svg>
  );
});

export function getSize(size:IconProps['size']){
  if(Array.isArray(size)){
    return size as string[];
  }
  const width = size || '1em';
  const height = size || '1em';

  return [width,height]
}



import { forwardRef } from "react";
import { Icon, IconProps } from "./Icon";

// 缓存已经加载过的脚本
const loadedSet = new Set();

export function createFrontIconFont(scriptUrl:string){
  if(typeof scriptUrl === 'string' && scriptUrl.length && !loadedSet.has(scriptUrl)){
    const script = document.createElement('script');
    script.setAttribute('src',scriptUrl);
    script.setAttribute('data-namespace',scriptUrl);
    document.body.appendChild(script);

    loadedSet.add(scriptUrl)
  }

  const IconFont = forwardRef<SVGSVGElement,IconProps>((props,ref)=>{
    const { type,...reset } = props;
    return (
      <Icon viewBox="0 0 1024 1024" {...reset}>
        {type && <use xlinkHref={`#${type}`}></use>}
      </Icon>
    )
  })

  return IconFont
}
import { IconAdd } from "../icons/IconAdd";
import { IconEmail } from "../icons/IconEmail";
import { IconFont } from "../icons/IconFont";

function TestIcon(){
  return (
  <>
  <h2>本地图标</h2>
    <IconAdd />
    <IconEmail spin />
    <IconEmail style={{color: 'blue', fontSize: '50px'}}></IconEmail>
    <h2>IconFont</h2>
    <IconFont type="icon-niunai" size="40px"/>
  </>
  )
}

export default TestIcon
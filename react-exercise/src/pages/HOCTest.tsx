/*
import React, { ComponentType } from "react";

interface Props {
  authenticated: boolean;
}

// 定义一个装饰器函数，接收一个组件作为参数
function withAuth<T extends Props>(WrappedComponent: ComponentType<T>) {
  // 定义一个新的组件，包装原始组件
  class WithAuth extends React.Component<T> {
    static displayName: string;
    render() {
      const { authenticated, ...restProps } = this.props;

      if (authenticated) {
        // 如果已经认证，直接渲染原始组件
        return <WrappedComponent {...restProps as T} />;
      } else {
        // 否则渲染未认证的提示
        return <div>Please login to view this content.</div>;
      }
    }
  }

  // 使用displayName属性来方便调试
  WithAuth.displayName = `WithAuth(${WrappedComponent.name})`;

  return WithAuth;
}

// 使用装饰器来增强组件的功能
@withAuth
class MyComponent extends React.Component<Props> {
  render() {
    return <div>Welcome to the member area!</div>;
  }
}

// 使用增强后的组件
const EnhancedComponent = withAuth(MyComponent);

export default EnhancedComponent

*/
/*
import React, { useState,useMemo,ComponentType } from "react";

type Itype = {
  num:number;
  num1:number;
  num2:number;
}

function HOC<T extends Itype> (rule:'num'|'num1'|'num2'){
  return  (Component :ComponentType<T>)  =>{
    class  RenderWrapComponent extends React.Component<T>{
      shouldComponentUpdate(nextProps:T, nextState:T) {
        // 只比较 props 中的 foo 和 bar 参数
        return nextProps[rule] !== this.props[rule]
      }
      render(){
        return <Component {...this.props}  />
      }
    }
    return RenderWrapComponent;
  }
}
//只有 props 中 num 变化 ，渲染组件  
@HOC( 'num')
class IndexHoc extends React.Component<Itype>{
  render(){
    console.log(`组件一渲染`,this.props)
    return <div> 组件一 ： hello,world </div>
  }
}

//只有 props 中 num1 变化 ，渲染组件  
@HOC('num1')
class IndexHoc1 extends React.Component<Itype>{
render(){
  console.log(`组件二渲染`,this.props)
  return <div> 组件二 ： my name is alien </div>
}
}
export default ()=> {
 const [ num ,setNumber ] = useState(0)
 const [ num1 ,setNumber1 ] = useState(0)
 const [ num2 ,setNumber2 ] = useState(0)
 return <div>
     <IndexHoc  num={ num } num1={num1} num2={ num2 }  />
     <IndexHoc1  num={ num } num1={num1} num2={ num2 }  />
     <button onClick={() => setNumber(num + 1) } >num++</button>
     <button onClick={() => setNumber1(num1 + 1) } >num1++</button>
     <button onClick={() => setNumber2(num2 + 1) } >num2++</button>
 </div>
}
*/

import React, { ComponentType } from 'react';
function HOC (Component){
  const didMount = Component.prototype.componentDidMount
  return class WrapComponent extends Component{
      componentDidMount(){
        console.log('------劫持生命周期------')
        if (didMount) {
           didMount.apply(this) /* 注意 `this` 指向问题。 */
        }
      }
      render(){
        return super.render()
      }
  }
}

@HOC
class Index extends React.Component{
   componentDidMount(){
     console.log('———didMounted———')
   }
   render(){
     return <div>hello,world</div>
   }
}

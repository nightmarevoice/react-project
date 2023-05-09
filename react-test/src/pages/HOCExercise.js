import React,{useState,useEffect} from 'react'

// class Index extends React.Component{
//   render(){
//     return <div>hello,world</div>
//   }
// }

// function HOC(Component){
//   return class wrapComponents extends Component{
   
//   }
// }
// export default HOC(Index);
// function renderHOC (WrapComponent){
//   return class Index extends React.Component{
//     constructor(props){
//       super(props)
//       this.state ={
//         visible:true
//       }
//     }
//     setVisible(){
//       this.setState({
//         visible:!this.state.visible
//       })
//     }
//     render(){
//       const {visible} = this.state
//       return <div className="box" >
//         <button onClick={this.setVisible.bind(this)} >挂载组件</button>
//         {
//           visible ? <WrapComponent {...this.props} setVisible={this.setVisible.bind(this)} /> : <div  className="icon">图标</div>
//         }
//      </div>
//     }
//   }
// }
// class Index extends React.Component{
//   render(){
//     const {setVisible} = this.props;
//     return <div className="box" >
//         <p>hello, my name is alien</p>
//         <img alt="test" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=294206908,2427609994&fm=26&gp=0.jpg" />
//         <button onClick={() => setVisible()} >卸载组件</button>
//     </div>
//   }
// }

// export default renderHOC(Index);
//分片渲染
// const renderQueue = []
// let isFirstRender = false;
// const tryRender = () => {
//   console.log(renderQueue,11111111);
//   const render = renderQueue.shift();
//   console.log(renderQueue,22222222);
//   if(!render) return 
//   setTimeout(() => {
//     render()
//   },300)
// }
// function renderHOC(WrapComponent){
//   return function Index(props){
//     const [isRender,setRender] = useState(false);
//     useEffect(() =>{
//       renderQueue.push(() =>{
//         setRender(true)
//       })
//       console.log(renderQueue,11222);
//       if(!isFirstRender){
//         tryRender()
//         isFirstRender = true
//       }
//     },[])
//     return isRender ? <WrapComponent tryRender={tryRender} {...props} />  : <div className='box' ><div className="icon" >图标</div></div>
//   }
// }
// class Item extends React.Component{
//   componentDidMount(){
//     const {name,tryRender} = this.props;
//     tryRender();
//     console.log(name+"渲染")
//   }
//   render(){
//     return <div>
//       <img width="100" height="100" alt="test" src="https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF" />
//     </div>
//   }
// }
// const ItemHoc = renderHOC(Item);
// function Index(){
//   return <div>
//     <ItemHoc></ItemHoc>
//     <ItemHoc></ItemHoc>
//   </div>
// }
// export default Index;


function HOC (Component){
  const didMount = Component.prototype.componentDidMount
  return class wrapComponent extends Component{
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

export default Index;
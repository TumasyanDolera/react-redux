export default function HOCTest(props){
    console.log('PPPPP++++>>>', props)
    return(<div>
        HOC COMPONENT
        {props.children}
        </div>)
        
    
}
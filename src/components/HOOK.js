import { useState, useRef, useEffect } from "react"

// class     function
// state     useState
// ref       useRef
// lafe      useEffect

export default function Hook(){
    const [inputValue, setInputValue] = useState('');

    const inputRef = useRef();
 
    useEffect(()=>{
        console.log('USEEFFECT====>>>>')
        inputRef.current.focus();
    })

    console.log('AAAAA----->>>>')


    const handleChange =(e)=>{
        setInputValue(e.target.value)
        // this.setState({
        //     inputValue: e.target.value
        // })
    }

 
    function handleClick() {
        alert(inputValue);
        setInputValue('');
        
    }


    const handleRefClick = ()=> {
        console.log('vvvvv====>>>', inputRef.current.value);
        inputRef.current.focus();
    }

    return(
        <>
        <input 
            type="text" 
            value={inputValue} 
            onChange={handleChange}
            />
        <button onClick={handleClick}>CLick me</button>
<br/>
        <input 
            placeholder="Ref"
            type="text" 
            onChange={handleChange}
            ref={inputRef}
            />
        <button onClick={handleRefClick}>CLick me</button>
        </>
    )
}
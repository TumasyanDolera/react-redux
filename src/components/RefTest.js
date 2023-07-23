import React, { createRef } from "react";


export default class RefTest extends React.Component {

    constructor(props) {
        super(props)

        this.myRef = createRef('Hello');

    }


    handleCLick = () => {
        console.log('VALUE', this.myRef.current.value);
        // this.myRef.current.focus();
    }

    render() {
        console.log('render ref====>>>', this.myRef);
        return (
            <>
                <input type="text" ref={this.myRef} onChange={this.handleCLick}/>
                <button onClick={this.handleCLick}>Click me</button>
            </>
        )
    }
}
import React, { PureComponent } from 'react';
import { idGenerator } from '../../utils/utils';
import PropTypes from 'prop-types';


export default class AddNewTask extends PureComponent {
    state = {
        toDoList: [],
        title: '',
        description: '',
        importance: '',
        developer: '',
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })

    }

    handleRadioChange = (event) => {
        this.setState({ importance: event.target.value })
    }

    handleSelectChange = (event) => {
        this.setState({
            developer: event.target.value
        })
    }

    handleAddTask = (event) => {
        event.preventDefault();

        const { title, description, importance, developer } = this.state;
        if (!title || !description || !importance || !developer) {

            return;
        }

        let neweObj = {
            id: idGenerator(),
            title,
            description,
            importance,
            developer,
        }

        this.props.handleAddTask(neweObj);

        let toDoList = [...this.state.toDoList];
        toDoList.push(neweObj);
        this.setState({
            toDoList,
            title: '',
            description: '',
            importance: '',
            developer: '',
        })
    }

    handleAddKeyDown=(event)=>{
        if(event.key === "Enter"){
            this.handleAddTask(event)
        }

    }

    render() {
        const { title, developer, importance, description } = this.state;
        const {disabledButton} = this.props;

        return (
            <form onSubmit={this.handleAddTask} onKeyDown={this.handleAddKeyDown}>
                <label>
                    <input
                        placeholder='title'
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    <textarea
                        placeholder='description'
                        name="description"
                        value={description}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                Importanse:
                <br />
                <label>
                    Low:
                    <input
                        type="radio"
                        name="low"
                        value="low"
                        checked={importance === 'low'}
                        onChange={this.handleRadioChange}
                    />
                </label>
                <br />
                <label>
                    Medium:
                    <input
                        style={{ background: 'yellow' }}
                        type="radio"
                        name="medium"
                        value="medium"
                        checked={importance === 'medium'}
                        onChange={this.handleRadioChange}
                    />
                </label>
                <br />
                <label>
                    High:
                    <input
                        type="radio"
                        name="high"
                        value="high"
                        checked={importance === 'high'}
                        onChange={this.handleRadioChange}
                    />
                </label>
                <br />
                <label>
                    <select value={developer} onChange={this.handleSelectChange}>
                        <option value="">Select a developer</option>
                        <option value="Aksana">Aksana</option>
                        <option value="Hovo">Hovo</option>
                        <option value="Vardges">Vardges</option>
                        <option value="Armen">Armen</option>
                        <option value="ELizabet">Elizabet</option>
                    </select>
                </label>
                <br />
                <button type="submit" disabled={disabledButton}>Submit</button>
            </form>
        )
    }
    
}


AddNewTask.propTypes = {
    handleAddTask:PropTypes.func,
    disabledButton:PropTypes.number,
    // disabledButton:PropTypes.number.isRequired,
    // disabledButton:PropTypes.oneOf([1,5,6,'kkk', true])
    // disabledButton:PropTypes.oneOfType([PropTypes.number, PropTypes.array])
}


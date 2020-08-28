import React, { Component } from 'react';
//import our service
import JeopardyService from "../../services/jeopardyServices/JeopardyService";
import JeopardyDisplay from "../jeopardyDisplay/JeopardyDisplay"

class Jeopardy extends Component {
    //set our initial state and set up our service as this.client on this component
    constructor(props) {
        super(props);
        this.client = new JeopardyService();
        this.state = {
            data: {},
            score: 0,
            answer: ''
        }
    }

    //get a new random question from the API and add it to the data object in state
    getNewQuestion() {
        return this.client.getQuestion().then(result => {
            this.setState({
                data: result.data[0]
            })
        })
    }

    //when the component mounts, get a the first question
    componentDidMount() {
        this.getNewQuestion();
    }

    updateScore = (event) => {
        event.preventDefault()
        let dataAnswer = (this.state.data.answer).toLowerCase()
        let userAnswer = (this.state.answer).toLowerCase()
        if (dataAnswer === userAnswer) {
            this.setState((state, props) => ({
                score: state.score + state.data.value,
                answer: ''
            }))
        }
            
        else {
            this.setState((state, props) => ({
                score: state.score - state.data.value,
                answer: ''
            }))
        }
        
        this.getNewQuestion()
    }

    handleChange = (event) => {
        let answer = event.target.value 
        this.setState({
            answer
        })
    }

    //display the results on the screen
    
    render() {
        return(
            <div className='jeopardyDisplay'>
                <JeopardyDisplay category ={this.state.data.category} data={this.state.data} score={this.state.score} answer={this.state.answer} updateScore={this.updateScore} handleChange={this.handleChange}/>
            </div>
        )
        
    }
}

export default Jeopardy;
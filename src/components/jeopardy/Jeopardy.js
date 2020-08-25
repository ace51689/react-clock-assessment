import React, { Component } from 'react';
//import our service
import JeopardyService from "../../services/jeopardyServices/JeopardyService";

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
        
        if (this.state.answer === this.state.data.answer) {
            this.setState((state, props) => ({
                score: state.score += state.data.value,
                answer: ''
            }))
        }
            
        else {
            this.setState((state, props) => ({
                score: state.score -= state.data.value,
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
        let category = 'loading'

        if (this.state.data.category) {
            category = this.state.data.category.title
        }

        return (
            <div>
                <strong>Score: </strong> {this.state.score} <br />
                <strong>Question: </strong>{this.state.data.question} <br />
                <strong>Value: </strong>{this.state.data.value} <br />
                <strong>Category: </strong>{category} <br />
                <strong>Answer: </strong>{this.state.data.answer}
                <form className="answerForm" onSubmit={this.updateScore}>
                    <input className='answerBox' type="text" placeholder='enter answer here' value={this.state.answer} onChange={this.handleChange} />
                    <button className='submit'>Submit</button>
                </form>

            </div>
        );
    }
}

export default Jeopardy;
import React from 'react'

function JeopardyDisplay(props) {
    let category = 'loading'
    if (props.category) {
        category = props.category.title
    }

    return (
        <div>
            <strong>Score: </strong> {props.score} <br />
            <strong>Question: </strong>{props.data.question} <br />
            <strong>Value: </strong>{props.data.value} <br />
            <strong>Category: </strong>{category} <br />
            <form className="answerForm" onSubmit={props.updateScore}>
                <input className='answerBox' type="text" placeholder='enter answer here' value={props.answer} onChange={props.handleChange} />
                <button className='submit'>Submit</button>
            </form>

        </div>
    )
}

export default JeopardyDisplay
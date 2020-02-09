import React from 'react'

const CurrentlyTyping = props => {
  console.log(props.typing)
  return (
    <ul>
      {props.typing.map((who, idx) => (
        <li key={idx}>{who} is typing..</li>
      ))}
    </ul>
  )
}

export default CurrentlyTyping

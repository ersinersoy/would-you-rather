/*
This component is taken from following URL
https://www.geeksforgeeks.org/how-to-create-a-custom-progress-bar-component-in-react-js/

and 

text input prob and <b>{text}</b> parts are added as an extension by me.

*/

import React from 'react'

const Progress_bar = ({bgcolor,progress,height,text}) => {
	
	const Parentdiv = {
		height: height,
		width: '100%',
		backgroundColor: 'whitesmoke',
		borderRadius: 40,
		margin: 50
	}
	
	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
	borderRadius:40,
		textAlign: 'right'
	}
	
	const progresstext = {
		padding: 10,
		color: 'black',
		fontWeight: 900
	}
		
	return (
	<div style={Parentdiv}>
	<div style={Childdiv}>
		<span style={progresstext}>{`${progress}%`}</span>
	</div>
    <b>{text}</b>
	</div>
	)
}

export default Progress_bar;

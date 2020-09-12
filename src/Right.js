import React from 'react';

class Right extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	printList(arr1, arr2)
	{
		const l = arr1.map((elem, index) =>
			<li key = {index} onClick = {(e) => {this.props.handleSongClick(arr1,arr2,index,e)}}>
				{elem}
			</li>
		);

		return <ol>{l}</ol>;
	}
	render()
	{
		return(this.printList(this.props.songNameList, this.props.songLinkList));
	}
}


export {Right}
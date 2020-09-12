import React from 'react';
class Search extends React.Component
{
	constructor(props)
	{
		super(props);
		//this.state = {query: ''};
	}
	render()
	{
		return (
			<form onSubmit = {this.props.handleSearchSubmit}>
				<input type = "text" value = {this.props.query} onChange ={this.props.handleSearchChange} />
				<input type = "submit" value = "Search" />
			</form>
		);
	}
}

class SearchList extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	printList(arr1, arr2)
	{
		const l = arr1.map((elem, index) =>
			<li key = {index} onClick = {(e) => (this.props.handleListClick(arr1,arr2,elem,e))}>
				{elem}
			</li>
		);

		return <ol>{l}</ol>;
	}
	render()
	{
		console.log(this.props.animeNameList);

		return(
			<div>
				{this.printList(this.props.animeNameList, this.props.animeLinkList)}
			</div>
		);
	}
}
export {Search, SearchList}
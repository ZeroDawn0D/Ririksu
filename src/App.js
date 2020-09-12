import React from 'react';
import {Search, SearchList} from './Search.js'
import './App.css'
import {Right} from './Right.js'
import ReactPlayer from 'react-player/youtube'
const BASE_URL = 'http://umang1126.herokuapp.com';
const SEARCH = BASE_URL + '/search/';
const ANIME = BASE_URL + '/anime/';
const YT_API = BASE_URL + '/yt/';

class Middle extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	printLyrics()
	{
		const lyr = this.props.lyrics.map(function(line){
			return(<div>{line}</div>)
		});

		return <div>{lyr}</div>
	}
	render()
	{
		return(
			
			<div>
				<ReactPlayer url = {"https://www.youtube.com/watch?v=" + this.props.yt_id} />
				{this.printLyrics()}
			</div>
			);
	}
}


class App extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state ={
			querySearch: '',
			queryApp: '',
			animeNameList: [],
			animeLinkList: [],
			currentanimename: '',
			currentanimelink: '',
			currentsonglink: '',
			song: '',
			singer: '',
			lyrics: [],
			songNameList: [],
			songLinkList: [],
			typeNum: '',
			OP:-1,
			ED:-1,
			OT:-1,
			yt_id:''
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleListClick = this.handleListClick.bind(this);
		this.animeNameExtract = this.animeNameExtract.bind(this);
		this.handleSongClick = this.handleSongClick.bind(this);
	}

	async handleSongClick(arr1,arr2,ind,e)
	{
		
		await this.setState((state,props) =>({
			song: arr1[ind],
			currentsonglink: arr2[ind]
		}));
		let anpath = this.animeNameExtract(this.state.currentanimelink);
		let spath = this.animeNameExtract(this.state.currentsonglink);
		let url = ANIME + anpath + '/song/' + spath;
		console.log(url);
		let response = await fetch(url);
		let data = await response.json();

		let singer = data["singer"];
		let lyricsArr = data["lyrics"];

		await this.setState((state,props) => ({
			singer: singer,
			lyrics: lyricsArr,
		}))

		url = YT_API + this.state.song + ' ' + this.state.singer;

		response = await fetch(url);
		data = await response.text();
		await this.setState((state,props) =>({
			yt_id:data
		}))
	}
	animeNameExtract(url)
	{
		return (url.substring(url.lastIndexOf('/')+1));
	}
	linearSearch(arr, elToFind)
	{
		for (var i=0; i<arr.length; i++)
		{
			if (arr[i]===elToFind)
			{
				return i;
			}
		}
		return null;
	}
	async handleListClick(arr1,arr2,val, e)
	{
		let ind = this.linearSearch(arr1,val);
		console.log(ind);
		console.log(arr1[ind], arr2[ind]);
		await this.setState((state,props) =>({
			currentanimename: arr1[ind],
			currentanimelink: arr2[ind]
		}));
		console.log(ind);
		console.log(this.state.currentanimelink);
		let q = this.animeNameExtract(this.state.currentanimelink);
		console.log(q);
		let url = ANIME + q;
		console.log(url);
		let response = await fetch(url);
		let data = await response.json();
		let namearr = data["name"];
		let linkarr = data["link"];

		this.setState((state,props) =>({
			songNameList: namearr,
			songLinkList: linkarr
		}))
	}

	handleSearchChange(e)
	{
		e.preventDefault();
		const val = e.target.value; //can replace with e.persist()
		this.setState((state,props) => ({
			querySearch: val
		}));
	}

	async handleSearchSubmit(e)
	{
		e.preventDefault();
		const sval = this.state.querySearch;
		const url = SEARCH + sval;
		let response = await fetch(url);
		let data = await response.json();
		let namearr = data["name"];
		let linkarr = data["link"];
		this.setState((state,props) =>({
			queryApp: sval,
			animeNameList: namearr,
			animeLinkList: linkarr
		}))
	}
	render()
	{
		return (
			<div className = "app">
				<div className = "search">
					<Search
					query = {this.state.querySearch} 
					handleSearchChange = {this.handleSearchChange} 
					handleSearchSubmit = {this.handleSearchSubmit} />
					<SearchList
					query = {this.state.queryApp} 
					animeNameList = {this.state.animeNameList} 
					animeLinkList = {this.state.animeLinkList}
					handleListClick = {this.handleListClick}
					/>
				</div>

				<div className = "middle">
					<Middle
					lyrics = {this.state.lyrics}
					yt_id = {this.state.yt_id}
					/>
				</div>

				<div className = "right">
					<Right 
					songNameList = {this.state.songNameList}
					songLinkList = {this.state.songLinkList}
					handleSongClick = {this.handleSongClick}
					/>
				</div>
			</div>
		);
	}
}

export default App;
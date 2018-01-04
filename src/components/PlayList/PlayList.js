import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		this.props.onNameChange(e.target.value);
	}

	render(){
		return (
			<div className="Playlist">
	            <input value={this.props.playlistName} onChange={this.handleChange}/>
	            <TrackList tracks={this.props.playlistTracks} 
	            		   onAdd={this.props.onAdd} 
	            		   onRemove={this.props.onRemove}
	            		   isRemovel={true}/>
	            <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
          </div>
		);
	}
}

export default PlayList;
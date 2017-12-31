import React from 'react';
import './SearchList.css';
import TrackList from '../TrackList/TrackList';

class SearchList extends React.Component{
	render(){
		return (
			<div className="SearchList">
	            <h2>Results</h2>
	            <TrackList tracks={this.props.searchResults} 
	            		   onAdd={this.props.onAdd} 
	            		   isRemovel={false}/>
          	</div>
		);
	}
}

export default SearchList;
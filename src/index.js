import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/app';
import VideoList from './components/video_lists';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyA0204T0USz8b7LPDbEZ6_Nv6toCH2ow3I';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
         };

         this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        // from lodash use debounce to throttle how often videoSearch function gets called
        const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);
        return(
                <div> 
                    <SearchBar  onSearchTermChange={term => this.videoSearch(term)} /> 
                    <VideoDetail video={this.state.selectedVideo} />
                    <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
                </div>
            );
    }
}

ReactDOM.render( <App /> , document.querySelector('.container'));

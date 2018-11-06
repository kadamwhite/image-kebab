import React, { Component } from 'react';
import './App.css';
import DropZone from './components/DropZone';
import Skewer from './components/Skewer';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      image: null,
    };
    this.setImage = this.setImage.bind( this );
  }

  setImage( image ) {
    console.log( image );
    this.setState( {
      image,
    } );
  }

  render() {
    const { image } = this.state;
    console.log( image );
    return (
      <div className="App">
        { image ? (
          <Skewer image={ image } />
        ) : (
          <header className="App-header">
            <h1>Image Kebab<em>!</em></h1>
            <DropZone onDrop={ this.setImage } />
            <p>Drag-and-drop the image to skewer into the box above.</p>
        
            <small className="attribution">
              <a href="https://www.vexels.com/vectors/preview/132102/shish-kebab-icon">Shish kebab icon</a> designed by Vexels
            </small>
          </header>
        ) }
      </div>
    );
  }
}

export default App;

import React, { PureComponent } from 'react'; 
import Dropzone from 'react-dropzone';

import './style.css';

class DropZone extends PureComponent {
  constructor( props ) {
    super( props );
    this.onDrop = this.onDrop.bind( this );
  }

  onDrop( acceptedFiles ) {
    const parentOnDrop = this.props.onDrop;
    acceptedFiles.forEach( file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = function() {
          parentOnDrop( {
            src: img.src,
            width: this.width,
            height: this.height,
          } );
        };
        img.src = e.target.result;
      };
      reader.onabort = () => console.log( 'file reading was aborted' );
      reader.onerror = () => console.log( 'file reading has failed' );

      reader.readAsDataURL( file );
    } );
  }

  render() {
    return (
      <Dropzone onDrop={ this.onDrop }>
        <div className="dropzone-placeholder" />
      </Dropzone>
    );
  }
}

export default DropZone;
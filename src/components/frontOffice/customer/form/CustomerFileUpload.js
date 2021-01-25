import React from 'react';
export class CustomerFileUpload extends React.Component {
constructor() {
 super();
this.setupReader()
this.state = {
 selectedFile: undefined,
 imageBase64: "",
 initialImageBase64: '',
 pending: false,
 status: 'INIT',
 }
this.onChange = this.onChange.bind(this);
 }
setupReader() {
 this.reader = new FileReader();
 this.reader.addEventListener('load', (event) => {
 const { initialImageBase64 } = this.state;
 var { changedImage } = this.props;
 const imageBase64 = event.target.result;
 changedImage(imageBase64);
if (initialImageBase64) {
 this.setState({ imageBase64 });
 } else {
 this.setState({ imageBase64, initialImageBase64: imageBase64 });
 }
 });
 }
onChange(event) {
 const selectedFile = event.target.files[0];
 var { checkImageState } = this.props;
 if (selectedFile) {
 checkImageState('selected');
 } else {
 checkImageState('unselected');
 }
 if (selectedFile) {
 this.setState({
 selectedFile,
 initialImageBase64: ''
 });
this.reader.readAsDataURL(selectedFile);
 }
 }
render() {
return (
 <div className='img-upload-container'>
 <label className='img-upload btn'>
 <span className='upload-text'> Select an image </span>
 <input type='file'
 accept='.jpg, .png, .jpeg'
 onChange={this.onChange} />
 </label>
 </div>
)
 }
}
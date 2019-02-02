import React, {Component} from 'react';
import CitationForm from "../components/CitationForm";
import axios from '../axios-citation';

class AddCitation extends Component {
  addCitation = (citation) => {
    axios.post('/citations.json', citation).then(() => {
      this.props.history.replace('/');
    })
  }

  render() {
    return (
      <div>
        <h1>Add new citation</h1>
        <CitationForm onSubmit={this.addCitation}/>
      </div>
    );
  }
}

export default AddCitation;
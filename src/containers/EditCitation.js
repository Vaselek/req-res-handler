import React, {Component} from 'react';
import CitationForm from "../components/CitationForm";
import axios from '../axios-citation';

class EditCitation extends Component {

  state = {
    citation: null
  }
  componentDidMount() {
    axios.get('/citations/' + this.props.match.params.id + '.json').then((response) => {
      this.setState({citation: response.data})
    })
  }
  editCitation = (citation) => {
    axios.put('/citations/' + this.props.match.params.id + '.json', citation).then(() => {
      this.props.history.replace('/');
    })
  }

  render() {
    let form = <CitationForm citation={this.state.citation} onSubmit={this.editCitation}/>
    if (!this.state.citation) {
      form = <div>Loading ...</div>
    }
    return (
      <div>
        <h1>Edit citation</h1>
        {form}
      </div>
    );
  }
}

export default EditCitation;
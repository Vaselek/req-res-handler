import React, {Component} from 'react';

import {CATEGORIES} from '../constants';

import './CitationForm.css';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class CitationForm extends Component {


  constructor(props) {
    super(props);
    if (props.citation) {
      this.state = {...props.citation};
    } else {
      this.state = {
        content: '',
        category: Object.keys(CATEGORIES)[0],
        author: '',
      };
    }
  }

  valueChanged = event  => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onSubmit({...this.state});
  }

  render() {
    return (
      <Form className='CitationForm' onSubmit={this.submitHandler}>
        <FormGroup row>
          <Label for="category" sm={2}>Category</Label>
          <Col sm={10}>
            <Input type='select' id='category' onChange={this.valueChanged} value={this.state.category} name='category'>
              {Object.keys(CATEGORIES).map(categoryId => (
                <option key={categoryId} value={categoryId}>{CATEGORIES[categoryId]}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="name" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="text" name="author" id="author" placeholder="Enter author name" onChange={this.valueChanged} value={this.state.author}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input type="textarea" name="content" id="content" onChange={this.valueChanged} value={this.state.content}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{size: 10, offset: 2}}>
            <Button type='submit'>Save</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default CitationForm;
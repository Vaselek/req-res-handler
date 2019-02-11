import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row
} from 'reactstrap';
import { NavLink as RouterLink} from "react-router-dom";
import axios from "../axios-citation";
import {CATEGORIES} from "../constants";
import reqResHandler from "../hoc/reqResHandler";

class CitationList extends Component {
  state = {
    citations: null
  };

  loadData() {
    let url = 'citations.json';
    if (this.props.match.params.categoryId) {
      url += `?orderBy="category"&equalTo="${this.props.match.params.categoryId}"`;
    }
    axios.get(url).then(response => {
      if (response.data) {
        const citations = Object.keys(response.data).map(id => {
          return {...response.data[id], id};
        });
        this.setState({citations});
      }
    })
  }

  componentDidMount() {
    this.loadData();
  };

  componentDidUpdate(prevProps) {
    if(this.props.match.params.categoryId === prevProps.match.params.categoryId) {
      return true;
    } else {
      this.loadData();
    }
  }

  deleteCitation = (event, citation) => {
    event.preventDefault();
    this.setState({loading: true});
    console.log(citation);
    axios.delete('/citations/' + citation.id + '.json').then(() => {
      this.setState({loading: false});
      window.location.reload();
    })
  };

  render() {
    let citations = null;
    if (this.state.citations) {
      citations = this.state.citations.map(citation => (
        <Card className='mt-2' key={citation.id}>
          <CardBody>
            <CardText>"{citation.content}"</CardText>
            <CardText><i>- {citation.author}</i></CardText>
          </CardBody>
          <CardFooter>
            <RouterLink to={'/citations/' + citation.id + '/edit'}>
              <Button>Edit</Button>{' '}
            </RouterLink>
            <Button type="submit" onClick={(e)=>this.deleteCitation(e, citation)}>Delete</Button>
          </CardFooter>
        </Card>
      ))
    } else {
      citations = <div>Currently there is no citations! You can add new one..</div>
    }
    return (
      <div>
        <Row>
          <Col sm={3}>
            <Nav vertical>
              <NavItem>
                <NavLink tag={RouterLink} to='/'>All Citations</NavLink>
              </NavItem>
              {Object.keys(CATEGORIES).map(id => (
                <NavItem key={id}>
                  <NavLink tag={RouterLink} exact to={'/citations/' + id}>{CATEGORIES[id]}</NavLink>
                </NavItem>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <h5>All</h5>
              {citations}
          </Col>
        </Row>
      </div>
    );
  }
}

export default reqResHandler(CitationList, axios);
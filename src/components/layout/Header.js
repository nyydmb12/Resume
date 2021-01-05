import React from "react";
import { Container, Row, Col } from 'reactstrap';
import resumePic from '../../images/resume.png';
import { Last } from "react-bootstrap/esm/PageItem";
import PersonStore from "../../stores/PersonStore";



export default class Header extends React.Component {
    constructor(props) {
        super();
   
   
       
        console.log(props);
        this.state = {
                
                userName: props.userName,
                userID: props.key,
                userTitle: props.title
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
            userName: props.userName,
            userID: props.key,
            userTitle: props.title };
    }

    componentWillUnmount() {

        PersonStore.removeListener("change", this.getUserID);
    }
    componentDidMount() {
        PersonStore.on("change", (newValue) => this.setState({ userID: PersonStore.getUserID }));
        // send HTTP request
        // save it to the state
       
    }
    

    render() {

        console.log(this.state);

        return (
            <div className="headerGrad">
                <Container>

                    <Row>
                        <Col xs="1">
                            </Col>
                 
                     <Col xs="7">
                          <Row><h1>{this.state.userName}</h1></Row>
                            <Row>
                                <Col xs="1">
                                </Col>
                                <Col xs="12">
                                    <h2>{this.state.userTitle}</h2>
                                </Col>
                            </Row>
                    </Col>
                    <Col xs="4">
                    
                            <img src={resumePic} alt="Italian Trulli"></img>
                        
                    </Col>
                 
              </Row>
                </Container>
            </div>
        );
    }
}

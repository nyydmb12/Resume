import React from "react";
import axios from "axios";
import Education from "./Education";
import * as PersonAction from "../../actions/PersonAction";
import PersonStore from "../../stores/PersonStore";
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
export default class Educations extends React.Component {
    constructor(props) {
        super();
        console.log(props);
        this.getUserID = this.getUserID.bind(this);
       
        this.state = {
            accomplishments: [],
            userID: PersonStore.getUserID(),
            url: props.url
        };
        this.getUserID = this.getUserID.bind(this); 
     
        
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props.key);
        return {
            url: props.url
        };
    }

    componentWillUnmount() {

        PersonStore.removeListener("change", this.getUserID);
     
    }

    getUserID() {
       console.log(this.state.userID);
        this.setState({
            userID: PersonStore.getUserID()

        });
        console.log(this.state.userID);
    
    }

    componentDidMount() {
        PersonStore.on("change", (newValue) => this.setState({ userID: PersonStore.getUserID }));

        if (this.state.url != null) {
            console.log("pinurl");
            console.log(this.state);
            axios.get(this.state.url)
                .then(({ data }) => {

                    console.log(data);
                    this.setState(
                        {
                            accomplishments: data
                        }
                    );
                });
        }

    }


    render() {
        if (this.state.accomplishments.length > 0) {
            const WorkComponents = this.state.accomplishments.map((accomp) => {
                return <Education key={accomp.id} startDate={accomp.startDate} endDate={accomp.endDate} orgName={accomp.orgName} role={accomp.role} accomplishments={accomp.accomplishments} {...accomp} />;
            });

            const element = <FontAwesomeIcon icon={faGraduationCap} />
            return (

                <Container>
                    <Row>
                        <div className="GroupHeaders">

                            {element} <h5  >Education</h5>
                        </div>
                    </Row>
                    {WorkComponents}

                </Container>
            );
        }
        else {
            return null
		}

    }
}

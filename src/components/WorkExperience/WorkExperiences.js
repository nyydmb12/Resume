import React from "react";
import axios from "axios";
import WorkExperience from "./WorkExperience";
import * as PersonAction from "../../actions/PersonAction";
import PersonStore from "../../stores/PersonStore";
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
export default class WorkExperiences extends React.Component {
    constructor(props) {
        super();
        console.log(props);
        this.getUserID = this.getUserID.bind(this);
       
        this.state = {
            responsibilities: [],
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

        console.log(this.props.key);
        if (this.state.url != null) {
            console.log("pinurl");
            console.log(this.state);
            axios.get(this.state.url)
                .then(({ data }) => {
                    this.setState(
                        {
                            responsibilities: data
                        }
                    );
                });
        }

    }


    render() {
        if (this.state.responsibilities.length > 0) {
            const WorkComponents = this.state.responsibilities.map((respon) => {
                return <WorkExperience key={respon.id} startDate={respon.startDate} endDate={respon.endDate} orgName={respon.orgName} role={respon.role} title={respon.title} Responsbilities={respon.responsbilities} {...respon} />;
            });

            const element = <FontAwesomeIcon icon={faBriefcase} />
            return (

                <Container>
                    <Row>
                        <div className="GroupHeaders">

                            {element}<h5>Work Experience</h5>
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

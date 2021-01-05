import React from "react";
import axios from "axios";
import Skill from "./Skill";
import * as PersonAction from "../../actions/PersonAction";
import PersonStore from "../../stores/PersonStore";
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
export default class Skills extends React.Component {
    constructor(props) {
        super();
        console.log(props);
        this.getUserID = this.getUserID.bind(this);
       
        this.state = {
            skills: [],
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
                            skills: data
                        }
                    );
                });
        }

    }


    render() {
        if (this.state.skills.length > 0) {
            const SkillsComponents = this.state.skills.map((skill) => {
                return <Skill SkillCategory={skill.skillCategory} Skills={skill.SkillsList} key={skill.id} {...skill} />;
            });

            const element = <FontAwesomeIcon icon={faMicrochip} />
            return (

                <Container>
                    <Row>
                        <Col>
                            <div className="GroupHeaders">

                                {element} <h5>Skills</h5>
                            </div>
                            </Col>
                    </Row>
                    {SkillsComponents}

                </Container>
            );
        }
        else {
            return null;
        }
    }
}

import React from "react";

import { Container, Row, Col } from 'reactstrap';

export default class Skill extends React.Component {
    constructor(props) {
        super();
    }
  

    render() {
        const stringStyles = {
            float: "left",
            textAlign: "left"
        };
        const { SkillCategory, Skills, key } = this.props;
        let skillCount = Skills.length;
        for (let i = 0; i < Skills.length; i++) {
            if (i!= skillCount - 1) // if not the last item add a ,
                {
                Skills[i] = Skills[i] + ",";
			}
        }
        return (
            <Row>
            <Col id={"skill" + key}
                    style={stringStyles}>
                    <span className="title" style={stringStyles}>{SkillCategory}:</span>
       
                    <ul id="horizontal-list" style={stringStyles}>   
        {Skills.map(skill => {
            return <li style={stringStyles}>{skill}</li>;
        })}
                       
                   
                    </ul>
                </Col>
                
     </Row>
        );
    }
}
    
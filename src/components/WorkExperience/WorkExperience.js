import React from "react";

import { Container, Row, Col } from 'reactstrap';

export default class WorkExperience extends React.Component {
    constructor(props) {
        super();
    }
  

    render() {
        const stringStyles = {
          
            textAlign: "left",
            listStyleType: "circle"
        };
        const { key, startDate, endDate, orgName, title, role, Responsbilities } = this.props;
        let responCount = Responsbilities.length;
        //for (let i = 0; i < Responsbilities.length; i++) {
        //    if (i != responCount - 1) // if not the last item add a ,
        //    {
        //        Responsbilities[i] = Responsbilities[i] + ",";
        //    }
       // }
        console.log({startDate});
        return (
            <Row id={"skill" + key}>
                <Col>
                <Row>
                        <Col style={stringStyles}>
                            {startDate}-{endDate}
                        </Col>
                </Row>
                    <Row>
                        <Col className="title" style={stringStyles}>
                            {title}
                            </Col>
                </Row>
                    <Row>
                        <Col className="title" style={stringStyles}>
                            {orgName} - {role}
                            </Col>
                </Row>
             
                 
       
                    <ul style={stringStyles}>   
                        {Responsbilities.map(resopn => {
                            return <li style={stringStyles}>{resopn}</li>;
        })}
                       
                   
                    </ul>
           
                </Col>
     </Row>
        );
    }
}
    
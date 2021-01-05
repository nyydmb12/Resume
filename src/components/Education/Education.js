import React from "react";

import { Container, Row, Col } from 'reactstrap';

export default class Education extends React.Component {
    constructor(props) {
        super();
    }
  

    render() {
        const stringStyles = {
          
            textAlign: "left",
            listStyleType: "circle"
        };
        const { key, startDate, endDate, orgName, role, accomplishments } = this.props;
        let responCount = accomplishments.length;
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
                            {orgName} - {role}
                            </Col>
                </Row>
             
                 
       
                    <ul style={stringStyles}>   
                        {accomplishments.map(resopn => {
                            return <li style={stringStyles}>{resopn}</li>;
        })}
                       
                   
                    </ul>
           
                </Col>
     </Row>
        );
    }
}
    
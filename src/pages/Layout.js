import React from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Skills from "../components/Skills/Skills";
import axios from "axios";
import * as PersonAction from "../actions/PersonAction";
import PersonStore from "../stores/PersonStore";
import { Container, Row, Col } from 'reactstrap';
import WorkExp from "../components/WorkExperience/WorkExperiences";
import EducationExper from "../components/Education/Educations";
import Loader from "../components/Loader";

    export default class Layout extends React.Component {
        constructor(props) {
            super();
            var lastSlash = window.location.href.lastIndexOf("/");
            var id = window.location.href.substr(lastSlash + 1, window.location.href.length - lastSlash)
            if (id == "") {
                id = 1;
			}
            this.state = {
                userId: id,
                userName: null,
                userTitle: null,
               
                skillURL: null,
                workExperienceURL: null,
                educationURL: null,
                render: false //Set render state to false
            };

        
        }
        componentWillUnmount() {

            PersonStore.removeListener("change", this.getUserID);
        }

        componentDidMount() {
            PersonStore.on("change", (newValue) => this.setState({ userID: PersonStore.getUserID }));
           
            // send HTTP request
            // save it to the state
            let self = this;
            let skillsURL;
            let eduURL;
            let workURL;
            console.log(this.state)
            axios.get('http://danielwest.azurewebsites.net/person/1')
                .then(function (response) {
                   
                    for (let i = 0; i < response.data.Links.length; i++) {
                        if (response.data.Links[i].Rel == "skills") {
                            skillsURL = response.data.Links[i].Href.toString();
                        }
                        else if (response.data.Links[i].Rel == "education") {
                            eduURL = response.data.Links[i].Href;
                        }
                        else if (response.data.Links[i].Rel == "workexperience") {
                            workURL = response.data.Links[i].Href;
                            console.log(workURL)
                        }
                    }

                    self.setState({
                        userName: response.data.name,
                        userTitle: response.data.title,
                        skillURL: skillsURL,
                        workExperienceURL: workURL,
                        educationURL: eduURL
                    });
                   
             
                })
                .catch(function (error) {
                    console.log(error);
                });

            setTimeout(function () { //Start the timer
                this.setState({ render: true }) //After 1 second, set render to true
            }.bind(this), 1000)


        }
 

        render() {
            let skillLoadContainer, workLoadContainer, eduLoadContainer, hasVal, isFreeSpace;
            if (this.state.skillURL && this.state.render == true) {
                hasVal = 1;
                skillLoadContainer = <Skills key={hasVal} url={this.state.skillURL} />
                isFreeSpace = null;
      
            }
            else {
                hasVal = 0
                skillLoadContainer = <Loader key={1} />
                isFreeSpace = <Row id="freeSpace"><Col><p>This web server is running on a free Azure service, connecting to a free CosmosDB it will load...probably</p></Col></Row>
            }
            if (this.state.workExperienceURL && this.state.render == true) {
                hasVal = 1;
                workLoadContainer= <WorkExp key={hasVal} url={this.state.workExperienceURL} />
            }
            else {
                hasVal = 0
                workLoadContainer = <Loader key={2}/>
            }
            if (this.state.educationURL && this.state.render == true) {
                hasVal = 1;
                eduLoadContainer = <EducationExper key={hasVal} url={this.state.educationURL} />
            }
            else {
                hasVal = 0
                eduLoadContainer = <Loader key={3}/>
            }

            return (
                <Container fluid id="content">
                <header className="App-header">
                        <head>
                        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
                    </head>

                        <Header key={this.state.userId} userName = { this.state.userName } title={this.state.userTitle} />
                    </header>
           
                        {isFreeSpace}
               
       
                         
                    <Container fluid id="workExperience"> 
                        
                        {workLoadContainer}
                  </Container>
                    <Container fluid id="education">
                        {eduLoadContainer}
                    </Container>
                    <Container fluid id="skills">
                        {skillLoadContainer}
                    </Container>


                        <Footer />

                </Container>
              
            );
            
        }
    }

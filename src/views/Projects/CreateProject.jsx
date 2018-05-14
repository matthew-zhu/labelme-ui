import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import { instanceOf } from 'prop-types';
import { Cookies, withCookies} from 'react-cookie';

import axios from 'axios';
import url from '../../serverurl'
import swal from 'sweetalert'

import { Card } from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';


class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get('token') || '',
            user: this.props.cookies.get('user') || '',

            first_name: '',
            last_name: '',
            dob: '',
            email: '',
            phone_number: '',
            avatar_url: '',
            configs: [],

            project_name: '',
            project_desc: '',
        }
        this.getUser = this.getUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateProject = this.handleCreateProject.bind(this);
    }
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    componentWillMount() {
        // this.getUser();
    }

    getUser() {
        axios.get(url + '/getuser/' + this.state.token)
            .then((response) => {
                if(response.data.message === "success") {
                    this.setState({
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        dob: response.data.dob,
                        email: response.data.email,
                        phone_number: response.data.phone_number,
                        avatar_url: response.data.avatar_url,
                        configs: response.data.configs,
                    });
                } else {
                    swal("Error", "", "error");
                }
            }).catch((error) => {
                console.log(error);
                swal("Network Error", "User could not be fetched.", "error");
            })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleCreateProject(e) {
        e.preventDefault();

        console.log("project_name: " + this.state.project_name);
        console.log("project_desc: " + this.state.project_desc);

        if(this.state.project_name && this.state.project_desc) {
            //post project
            var data = {
                'project_name': this.state.project_name,
                'project_desc': this.state.project_desc,
            }
            axios.post(url + '/createproject/' + this.state.token, data)
                .then((response) => {
                    if(response.data.message === "success") {
                        //redirect to newly created project page
                        window.location.href("#/project/" + response.data.id)
                    } else {
                        swal("Error", "", "error");
                    }
                }).catch((error) => {
                    console.log(error);
                    swal("Network Error", "Project could not be created.", "error");
                })
        } else {
            swal("Warning", "Please complete all fields.", "warning");
        }
    }


    render() {
       
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Create Project"
                                content={
                                    <form>
                                        <Col md={12}>
                                            <Row>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Project Name</ControlLabel>
                                                    <FormControl 
                                                        name="project_name" 
                                                        rows="1" 
                                                        bsClass="form-control" 
                                                        placeholder="Name of the project" 
                                                        onChange = { this.handleChange }
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Project Owner</ControlLabel>
                                                    <FormControl 
                                                        name="project_owner" 
                                                        rows="1" 
                                                        bsClass="form-control" 
                                                        placeholder="Owner of the project" 
                                                        // defaultValue = { this.state.first_name + " " + this.state.last_name }
                                                        defaultValue = { this.state.user.displayName } //dummy data
                                                        disabled = { true }
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Project Description</ControlLabel>
                                                    <FormControl 
                                                        name="project_desc" 
                                                        rows="10" 
                                                        componentClass="textarea" 
                                                        bsClass="form-control" 
                                                        placeholder="Please describe this project." 
                                                        onChange = { this.handleChange }
                                                    />
                                                </FormGroup>
                                            </Row>
                                            <Button
                                            bsStyle="info"
                                            pullRight
                                            fill
                                            type="submit"
                                            onClick={ this.handleCreateProject }
                                        >
                                            Create Project
                                        </Button>
                                        </Col>
                                        
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default withCookies(CreateProject);
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class nav extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }
    
      componentDidMount() {
        this.timerID = setInterval(() => this.tick(),1000);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }

    render(){
        return(
            <React.Fragment>
                    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                        <Nav>
                        <Nav.Link href="#deets">{this.state.date.toLocaleTimeString()}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                    </Navbar>
            </React.Fragment>
        )
    }
}


export default nav
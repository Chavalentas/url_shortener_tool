import "./home.css";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import { UrlService } from "../../services/url.service";
import { RegisteredUrl } from "../../models/registered-url.model";

const Home = () => {
    const urlService: UrlService = new UrlService();
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onGenerateUrlRequest = async () => {
        setErrorMessage("");
        setGeneratedUrl("");
        let url: string = urlInput;

        if (url.length == 0){
            setErrorMessage("Please provide a valid URL!");
            return;
        }

        urlService.storeUrl(url).then((registeredUrl: RegisteredUrl) => {
            let url: string = window.location.href;
            url += registeredUrl.urlKey;
            setGeneratedUrl(url);
        })
        .catch((error) => {
           setErrorMessage(error.message);
        })
    }

    return (
        <div className="home-container home-container-background">
            <Card>
                <Card.Header className="card-header">URL Shortener</Card.Header>
                <Card.Body>
                    <Card.Title>Generate shortcut for a specific URL</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                        <Form.Label >URL</Form.Label>
                        <Form.Control onChange={(event) => setUrlInput(event.target.value)} className="bg-light" type="text" placeholder="Enter the URL (e.g. https://test.com)"/>
                        </Form.Group>
                    </Form>
                    <div className="generated-url-container">
                          <b>Generated URL: &nbsp;</b>
                          <p>{generatedUrl}</p>
                    </div>
                    <div className="button-panel">
                        <Button variant="primary" className="generate-button" onClick={() => onGenerateUrlRequest()}>Generate</Button> 
                        <p className="error-message">{errorMessage}</p>
                    </div>
                </Card.Body>
                <Card.Footer className="text-muted card-footer">Made by Stefan Chvala</Card.Footer>
            </Card>
        </div>
    );
  };
  
  export default Home;
  
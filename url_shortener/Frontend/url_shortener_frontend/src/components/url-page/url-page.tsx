import { useParams } from "react-router-dom";
import { UrlService } from "../../services/url.service";
import { useEffect, useState } from "react";

const UrlPage = () => {
    const {urlKey} = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const urlService: UrlService = new UrlService();

    useEffect(() => {
        let key: string = "";

        if (urlKey !== undefined){
            key = urlKey;
        }

        urlService.getUrl(key).then((url) => {
            window.location.href = url.url;
        }, (err) => {
            setErrorMessage("404")
        })

    }, []);
    
    return (
        <div className="error-container">
            <h1>{errorMessage}</h1>
        </div>
    );
  };
  
  export default UrlPage;
  
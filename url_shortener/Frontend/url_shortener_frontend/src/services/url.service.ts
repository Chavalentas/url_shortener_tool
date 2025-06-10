import axios from "axios";
import { Url } from "../models/url.model";
import { ErrorMessage } from "../models/error-message.model";
import bckConfig from '../config/backend.config.json';
import { RegisteredUrl } from "../models/registered-url.model";

export class UrlService{
    public getUrl(urlKey: string): Promise<Url>{
        return new Promise<Url>((resolve, reject) => {
            axios.get(`${bckConfig.host}/urls/${urlKey}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public storeUrl(url: string): Promise<RegisteredUrl>{
        return new Promise<RegisteredUrl>((resolve, reject) => {
            axios.post<RegisteredUrl>(`${bckConfig.host}/urls/newurl`, {newUrl: url})
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }
}
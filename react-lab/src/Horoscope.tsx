import React, { useState } from 'react';
import { TextBox } from './TextBox';
import './App.css';

// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from "axios";

interface HoroscopeRequest {
    sun: string;
    moon: string;
    rising: string;
}

interface HoroscopeResponse{
    horoscope: string[];
}

function Horoscope() {
    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");
    const [horoscope, setHoroscope] = useState([]);

    const requestHoroscope = () => {

        const toSend = {
            //TODO: Pass in the values for the data. Follow the format the route expects!
            sun : sun,
            moon : moon,
            rising : rising
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        //Install and import axios!
        //TODO: Fill in 1) location for request 2) your data 3) configuration
        axios.post("http://localhost:4567/horoscope", toSend, config)
            .then(response => {
                console.log(response.data);
                //TODO: Go to the Main.java in the server from the stencil, and find what field name you should put here.
                //Note: It is very important that you understand how this is set up and why it works!
                setHoroscope(response.data['horoscope']);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1 className="Horoscope-heading">Horoscopes</h1>
            <TextBox label={"Sun Sign"} changeHandler={setSun}/>
            <TextBox label={"Moon Sign"} changeHandler={setMoon}/>
            <TextBox label={"Rising Sign"} changeHandler={setRising}/>
            <AwesomeButton type="primary" onPress={requestHoroscope}>Submit</AwesomeButton>
            <ul>
                {horoscope.map(item => <p>{item}</p>)}
            </ul>
        </div>
    );
}

export default Horoscope;
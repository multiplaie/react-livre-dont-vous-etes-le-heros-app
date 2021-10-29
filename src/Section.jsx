import { Component, React } from "react";
import ReactMarkdown from 'react-markdown'
import config from "./config.json";
import axios from "axios";

export class Section extends Component{

    constructor(props){
        super(props);
        this.state = {
            _id: '1',
            content: "blablabla",
            next: [1,2,3]
        }
        this.handleClick = this.handleClick.bind(this);
        this.loadSection = this.loadSection.bind(this);
    }

    loadSection(id){
        axios.get("http://"+config.api.host+":"+config.api.port+"/api/sections/"+id)
        .then(res => this.setState(res.data))
        .then(res => {
            if(this.state.hasOwnProperty('music'))
                if(this.state.music.hasOwnProperty('main') && this.state.music.main)
                    axios.get("http://"+config.vlc.host+":"+config.vlc.port+"/vlc/play?path="+this.state.music.main);
        });
    }
    componentDidMount() {
        this.loadSection(1);
    }

    handleClick(nextSection){
        this.loadSection(nextSection);
    }


    render(){
        return <div className="row justify-content-md-center">
            <div className="col-8">
                <div className="section card">
                    <div className="id card-header"><h1>{this.state._id}</h1></div>
                    <div className="content card-body">
                        <p className="card-text text-start"><ReactMarkdown>{this.state.content.replace(/\./g, ".\n\n")}</ReactMarkdown> </p>
                        <hr />
                        <div className="row">
                        {this.state.next.map((element, n) => {
                            return <div className="col" key={n} ><button className="btn btn-lg btn-outline-primary fw-bold" key={n} onClick={()=>this.handleClick(element)}>{element}</button></div>
                        })}  
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
    }
}
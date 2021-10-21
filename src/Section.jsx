import { Component, React } from "react";
import ReactMarkdown from 'react-markdown'
import config from "./config.json";

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
        // send HTTP request
        fetch("http://"+config.api.host+":"+config.api.port+"/api/sections/"+id,{
            mode:'cors',
            method:"GET"
        })
        .then(res => res.json())
        // save it to the state
        .then(res => this.setState(res));
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
                            return <div className="col"><button className="btn btn-lg btn-outline-primary fw-bold" key={n} onClick={()=>this.handleClick(element)}>{element}</button></div>
                        })}  
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
    }
}
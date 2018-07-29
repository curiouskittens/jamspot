import React, { Component } from "react";
import "./Jam.css";
import md5 from "js-md5";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import TextareaAutosize from "react-autosize-textarea";
import instrumentList from "../../utils/instruments.json";

class Jam extends Component {
    state = {
        jamName:"",
        jamCreator:"",
        jamDate:"",
        members: "",
        postInput: "",
        posts:[]
    }

    componentDidMount() {
        this.getJam()
    }

    getJam = () => {
        api.getOneJamById(this.props.jamId)
            .then(dbJam => {
                console.log(dbJam.data)
                this.setState({
                    jamName: dbJam.data.name,
                    jamDate: dbJam.data.date,
                    jamCreator: dbJam.data.admin.name,
                    members: dbJam.data.members,
                    posts: dbJam.data.posts
                })

            })
            .catch(err=>console.log(err))
    }

    getProfilePic = (email)=>{
        // console.log(email.trim())
        const gravatarHash = md5(email.trim().toLowerCase());
        // console.log(gravatarHash)
        return `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=200`
    }
    getInstrumentIcon = (instruments) =>{
        // return "/instrument_icons/guitar.png"
        
        if(instruments.length>0) {
            return (instruments.map((instrument,idx) => {
                let imgSrc = "/instrument_icons/no-waiting.png"
                for(let i=0; i<instrumentList.length; i++){
                    if(instrumentList[i].name === instrument.name){
                        console.log("match")
                        imgSrc = instrumentList[i].icon
                    }
                }
                console.log(imgSrc)
                return <img key={idx} className="instrument-mini-pic px-1" src={imgSrc} alt="instrument"/>
            }))
        }else{
            console.log("else")
            return <img className="instrument-mini-pic " src="/instrument_icons/no-waiting.png" alt="instrument"/>
        }

    }

    getPosts = () => {
        
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmitPost = event => {
        console.log("yay you clicked post!!")
        api.addPost({
            content: this.state.postInput,
            creator: sessionStorage.getItem("userId"),
            jamId: this.props.jamId
        }).then(dbPost => {
            this.setState({
                postInput: ""
            })
            this.getJam();
        }).catch(err => console.log(err))
    }


    render() {
        return (
            <div className="jam-bg">
                <div className="jam-page-content container-fluid">
                    <br />
                    <div className="d-md-flex justify-content-around">
                        <div className="jam-section-wrapper d-block col-md-6">
                            <div className="next-jam-section">
                                <p className="text-center next-jam-title-text">{this.state.jamName}</p>
                                <hr className="jam-page-separator"/>
                                <div className="next-jam-wrapper d-flex container-fluid">
                                    <div className="next-jam-info col-12">
                                        <p>Jam Name: {this.state.jamName}</p>
                                        <p>Creator: {this.state.jamCreator}</p>
                                        <p>Date: {this.state.jamDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="most-recent-jam-section">
                                <p className="text-center recent-jam-title-text">Members</p>
                                <hr className="jam-page-separator" />
                                <div className="most-recent-jam-wrapper d-flex container-fluid">
                                    <div className="most-recent-jam-info col-12">
                                        {this.state.members ?
                                            this.state.members.map((member,idx)=>(
                                            <div className="row" key={idx}>
                                                <img className="user-mini-pic col-3 mx-0 px-0" src={this.getProfilePic(member.email)} alt="Gravatar" />
                                                <div className="col-6" key={idx}>{member.name}</div>
                                                <div className="jampage-instrument-wrapper col-3">
                                                    {this.getInstrumentIcon(member.instruments)}
                                                </div>
                                        
                                            </div>
                                            ))

                                            : <p>Loading...</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="post-content-wrapper">
                                <div className="post-display-section">
                                    <p>Posts</p>
                                    <div className="col-12 posts-wrapper">
                                    {this.state.posts ?
                                            this.state.posts.map((post,idx)=>(
                                            <div className="row post" key={idx}>
                                                <img className="user-post-pic col-1 mx-0 px-0" src={this.getProfilePic(post.creator.email)} alt="Gravatar" />
                                                <div className="col-2 mx-0 px-1" key={idx}>{post.creator.name}</div>
                                                {/* <div className="jampage-instrument-wrapper col-3">
                                                    {this.getInstrumentIcon(member.instruments)}
                                                </div> */}
                                                <div className="col-9">{post.content}</div>
                                        
                                            </div>
                                            ))

                                            : <p>Loading...</p>
                                    }
                                    </div>
                                </div>
                                    <div>               
                                    <TextareaAutosize
                                        id="post-input"
                                        name="postInput"
                                        rows={1}
                                        value={this.state.postInput}
                                        placeholder="write something"
                                        // disabled={this.state.bioDisabled}
                                        onChange={this.handleInputChange}
                                        className="form-control post-textarea"
                                    />
                                    <button className="btn btn-primary" onClick={this.handleSubmitPost}>Post</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <Footer />
            </div>
        )
    }
}

export default Jam;
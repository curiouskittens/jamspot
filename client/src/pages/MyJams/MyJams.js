import React, { Component } from "react";
import Jam from "../../components/Jam";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import Modal from "react-modal";

// styling for modal
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


class MyJams extends Component {
    state = {
        memberJams: [],
        adminJams: [],
        loggedIn: sessionStorage.getItem("userId") ? true : false
    }
    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    openModal= () => {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
    this.setState({modalIsOpen: false});
    }


    componentDidMount() {
        this.getJams();
        // window.addEventListener("load", this.joinRequestHandler)
    }

    getJams = () => {
        api.getMyJams(sessionStorage.getItem("userId")).then(dbUser => {
            console.log("Get My Jams")
            console.log(dbUser.data)
            dbUser.data.jams.forEach((jam,idx)=>{
                if (jam.admin === sessionStorage.getItem("userId")){
                    this.setState({ adminJams: this.state.adminJams.concat([ jam ]) });
                }else{
                    this.setState({ memberJams: this.state.memberJams.concat([ jam ]) });
                }
            })
            // this.setState({ jams: dbJams.data });
        })
    }

    clickHandler = (jamId) => {
        console.log("See Jam ", jamId)
        // if(this.state.loggedIn){
        //     console.log("you are logged in\nYour user ID is: ", sessionStorage.getItem("userId"))
        //     api.joinJamRequest({
        //       jamId: jamId,
        //       userId: sessionStorage.getItem("userId")
        //     }).then(result =>{
        //         console.log("success")
        //     }).catch(err => console.log(err))
        // }else{
        //     console.log("you are not logged in")
        // }
    }
    joinRequestHandler = (userId) => {
        console.log("Join Request Handler!!\nUser ID: ", userId)
        this.openModal()
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="find-jam-page-bg">
                    <div className="find-jam-page-content container-fluid">
                        <h4>My Jams</h4>
                        <h6>I'm An Admin</h6>
                        {this.state.adminJams.map((jam,idx)=>(
                            <div className="card" style={{width: "40rem"}} key={idx}>
                                <div className="card-body" >
                                    <h5 className="card-title">{jam.name}</h5>
                                    <p className="card-text">{jam.description}</p>
                                    <button onClick={()=>this.clickHandler(jam._id)} data-jamid={jam._id} className="btn btn-primary">See Jam</button>
                                    <br/><br/>
                                    <h6 className="card-subtitle mb-2 text-muted">Join Requests</h6>
                                    {jam.joinRequests.map((joinRequest, idx)=>(
                                        <React.Fragment key={idx}>
                                        <br/>
                                        <br/>
                                        <button  onClick={()=>this.joinRequestHandler(joinRequest._id)}  className="btn btn-secondary" data-userid={joinRequest._id}>{joinRequest.name}</button>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <h6>I'm A Member</h6>
                        {this.state.memberJams.map((jam,idx)=>(
                            <Jam key={idx} jamName={jam.name} description={jam.description} jamId={jam._id} clickHandler={()=>this.clickHandler(jam._id)}/>
                        ))}
                    </div>

                    <div>
                        <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        >

                            <h2 ref={subtitle => this.subtitle = subtitle}>Join Request</h2>
                            <button onClick={this.closeModal}>close</button>
                            <div>I am a modal</div>
                            <form>
                                <input />
                                <button>tab navigation</button>
                                <button>stays</button>
                                <button>inside</button>
                                <button>the modal</button>
                            </form>
                        </Modal>
                    </div>

                    <Footer />
                </div>

                
            </React.Fragment>
        )
    }


}

export default MyJams;
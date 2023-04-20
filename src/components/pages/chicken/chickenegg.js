import React, { Component } from 'react';
import $ from "jquery";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import cb5 from '../../images/cb5.png';
import backbtn from '../../images/backbtn.png';
import buybtn from '../../images/buybtn.png';
import cancel from '../../images/cancel.png';

class chickenegg extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  };
  
	}
	
	componentDidMount = () =>{

    $(".cancel-c").click(function(){
      $("#myModal").hide();
    });
       // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
				
	  }

	render(){
		return(
			<div>
             <Header />
                <div className="bg-chicken">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="chicken-content-wrp">
                                    <div className="chicken-c-img">
                                        <img src={cb5} />
                                    </div>
                                </div>
                                <div className="wrp-btn-back">
                                    <a href="/marketplace"><img src={backbtn} /></a>
                                    <a href="#"><img src={buybtn} className="mr-buybtn modal-toggle" id="myBtn" /></a>
                                    
                                </div>
                                <div id="myModal" className="modal">
                                    <div className="modal-content">
                                        <span className="close">&times;</span>
                                        <div className="pop-content-wrp">
                                            <h3>Blance: <span>10000</span></h3>
                                            <input placeholder="Enter Amount" />
                                            <div className="pop-btn">
                                              <a href="#" className="cancel-c"><img src={cancel} /></a>
                                              <a href="#"><img src={buybtn} className="pop-r-btn" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="stokes">
						<img src={stoke} />
					</div>
                <Footer/>
            </div>
		);
	}

}
export default chickenegg;
import React, { Component } from 'react';

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import p2 from '../../images/p2.png';
import p3 from '../../images/p3.png';
import calender from '../../images/calender.png';
import review from '../../images/review.png';
import $ from "jquery";

class step extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  };
  
	}
	
	componentDidMount = () =>{

        $(document).ready(function(){

            var current_fs, next_fs, previous_fs; //fieldsets
            var opacity;
            var current = 1;
            var steps = $("fieldset").length;
            
            setProgressBar(current);
            
            $(".next").click(function(){
            
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            
            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
            
            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
            step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;
            
            current_fs.css({
            'display': 'none',
            'position': 'relative'
            });
            next_fs.css({'opacity': opacity});
            },
            duration: 500
            });
            setProgressBar(++current);
            });
            
            $(".previous").click(function(){
            
            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();
            
            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
            
            //show the previous fieldset
            previous_fs.show();
            
            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
            step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;
            
            current_fs.css({
            'display': 'none',
            'position': 'relative'
            });
            previous_fs.css({'opacity': opacity});
            },
            duration: 500
            });
            setProgressBar(--current);
            });
            
            function setProgressBar(curStep){
            var percent = parseFloat(100 / steps) * curStep;
            percent = percent.toFixed();
            $(".progress-bar")
            .css("width",percent+"%")
            }
            
            $(".submit").click(function(){
            return false;
            })
            
            });	
	  }

	render(){
		return(
			<div>
             <Header />
                <section id="step-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            <form id="msform">
                   
                    <ul id="progressbar">
                        <li className="active" id="account"> <div className="stepimg"><img src={p3} alt=''/></div></li>
                        <li id="personal"><div className="stepimg"><img src={p2} alt=''/></div></li>
                        <li id="payment"><div className="stepimg"><img src={calender} alt=''/></div></li>
                        <li id="confirm"><div className="stepimg"><img src={review} alt=''/></div></li>
                        
                    </ul>
                     
                    <fieldset>
                        <div className="form-card">
                            <div className="row">
                                <div className="col-7">
                                    <h2 className="fs-title">Purchase Farm Land</h2>
                                    
                                </div>

                                <div class="col-5">
                                    <h2 className="steps">Step 1 - 4</h2>
                                </div>
                                
                                    <div className="farm-img-s">
                                        <img src={p3} alt=''/>
                                    </div>
                                
                            </div> <label class="fieldlabels">Balance</label> <input type="email" name="email" placeholder="0.00" />
                        </div> <input type="button" name="next" className="next action-button" value="Next" />
                    </fieldset>
                    <fieldset>
                        <div className="form-card">
                            <div className="row">
                                <div className="col-7">
                                    <h2 className="fs-title">Purchase Chickens</h2>
                                </div>
                                <div class="col-5">
                                    <h2 className="steps">Step 2 - 4</h2>
                                </div>
                                    <div className="farm-img-s">
                                            <img src={p2} alt=''/>
                                    </div>
                            </div> <label className="fieldlabels">Purchase Chicken </label> <input type="text" name="fname" placeholder="Purchase Chicken" /> 
                        </div> <input type="button" name="next" className="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                    </fieldset>
                    <fieldset>
                        <div className="form-card">
                            <div className="row">
                                <div className="col-7">
                                    <h2 className="fs-title">Choose Days to Farm</h2>
                                </div>
                                <div className="col-5">
                                    <h2 className="steps">Step 3 - 4</h2>
                                </div>
                                <div className="farm-img-s">
                                            <img src={calender} alt=''/>
                                </div>
                            </div> <label className="fieldlabels">Choose Days to Farm</label> <input type="date" id="birthday" name="birthday" />
                            
                        </div> <input type="button" name="next" className="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                    </fieldset>
                    <fieldset>
                        <div className="form-card">
                            <div className="row">
                                <div className="col-7">
                                    <h2 className="fs-title">Final Review</h2>
                                </div>
                                <div className="col-5">
                                    <h2 className="steps">Step 4 - 4</h2>
                                </div>
                            </div> 
                            <div className="farm-img-s">
                                    <img src={review} alt=''/>
                                </div>
                            <div className="final-review-c">
                                <div className="balance-r-c">
                                    <h3>Balance</h3>
                                    <p>3000.00</p>
                                </div>
                                <div className="balance-r-c">
                                    <h3>Purchase Chicken</h3>
                                    <p>300.00</p>
                                </div>
                                <div className="balance-r-c">
                                    <h3>Choose Days to Farm</h3>
                                    <p>04-08/2021</p>
                                </div>
                            </div>
                        </div> <input type="button" name="next" className="next action-button" value="Submit" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                    </fieldset>
                    
                </form>
                            </div>
                        </div>
                    </div>
                </section>
                   
                <Footer/>
            </div>
		);
	}

}
export default step;
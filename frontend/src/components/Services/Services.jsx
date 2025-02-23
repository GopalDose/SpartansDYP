import React from "react";
import './Services.css'
import icon1 from "../../assets/images/watering-plants.png";
import icon2 from "../../assets/images/growing-plant.png";
import icon3 from "../../assets/images/planting.png";
import icon4 from "../../assets/images/chat.png";

function Services() {
    return (
        <>
            <div className="service-content">
                <div className="block">Our Services</div>
                <div className="title">
                    <h2>What We Offer</h2>
                    <p className="desc">
                        Explore our cutting-edge farming solutions designed to enhance sustainability, boost productivity, and maximize profitability.
                    </p>
                </div>

                <div className="service">
                    <div>
                        <img src={icon2} alt="Crop Recommendation"/>
                        <h2>Crop Recommendation</h2>
                        <p className="desc">
                            Leverage AI-driven insights to select the most suitable crops based on soil conditions, climate, and market demand.
                        </p>
                    </div>

                    <div>
                        <img src={icon1} alt="Yield Tracking"/>
                        <h2>Yield Tracking</h2>
                        <p className="desc">
                            Monitor crop health and productivity in real time, ensuring better planning and higher yields with minimal resource wastage.
                        </p>
                    </div>

                    <div>
                        <img src={icon3} alt="Finance Analytics"/>
                        <h2>Finance Analytics</h2>
                        <p className="desc">
                            Gain valuable financial insights to optimize investments, track expenses, and maximize profitability in your farming operations.
                        </p>
                    </div>

                    <div>
                        <img src={icon4} alt="Personalized Assistance"/>
                        <h2>Personalized Assistance</h2>
                        <p className="desc">
                            Get expert guidance tailored to your specific farming needs, from soil health management to market trends.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Services;

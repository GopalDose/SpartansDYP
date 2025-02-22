import React from "react";
import './Services.css'
import icon1 from "../../assets/images/watering-plants.png";
import icon2 from "../../assets/images/growing-plant.png"
import icon3 from "../../assets/images/planting.png"

function Services() {
    return (
        <>
            <div className="service-content">
                <div className="block">Our Services</div>
                <div className="title">
                    <h2>What We Offer</h2>
                    <p className="desc">
                        Discover Our Innovative Farming Solutions for Smarter, Greener, and More Productive Agriculture
                    </p>
                </div>

                <div className="service">
                    <div>
                        <img src={icon2} />
                        <h2 className="">Crop Recommendation</h2>
                        <p className="desc">
                            Get AI-driven crop suggestions based on soil and climate for maximum yield.
                        </p>
                    </div>

                    <div>
                        <img src={icon1} />
                        <h2 className="">Yeild Tracking</h2>
                        <p className="desc">
                            Optimize water usage with AI-powered irrigation, reducing waste and improving efficiency.
                        </p>
                    </div>

                    <div>
                        <img src={icon3} />
                        <h2 className="">Finance Analytics</h2>
                        <p className="desc">
                            Find the best local markets to sell your produce at competitive prices.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Services;

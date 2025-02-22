import React, { useState } from 'react'
import './Dashboard.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import icon1 from "../../assets/images/watering-plants.png";
import { PiPlant } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import AddCrop from '../AddCrop/AddCrop';

const Dashboard = () => {
    const [showAddCrop, setShowAddCrop] = useState(false);

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="block">
                        Good Morning
                    </div>
                    <div className="title">Agricultural Dashboard</div>
                    <div className="register-crops">
                        <Link to="/yeild" className="register-crop">
                            <div className="data">
                                <div className="title">Wheat</div>
                                <div className="sowingdate">
                                    01-01-2021
                                </div>
                                <div className="area">
                                    10 acres
                                </div>
                            </div>
                        </Link>
                        <Link className="register-crop">
                            <div className="data">
                                <div className="title">Rice</div>
                                <div className="sowingdate">
                                    21-02-2021
                                </div>
                                <div className="area">
                                    5 acres
                                </div>
                            </div>
                        </Link>
                        <div className="register-crop" onClick={() => setShowAddCrop(true)}>
                            <div className="addbtn">
                                <IoMdAddCircleOutline />
                                Add Crop
                            </div>
                        </div>
                    </div>
                    .<div className="title">Our Services</div>
                    <div className="services-container">
                        <Link to="/crop-recc" href='#' >
                            <div className="services-card">
                                <PiPlant className='icon' />
                                <div className="service__title">Crop Prediction</div>
                                <p>AI-powered insights for optimal crop selection and yield forecasting</p>
                            </div>
                        </Link>
                        <Link to="/crop-recc" href='#' >
                            <div className="services-card">
                                <PiPlant className='icon' />
                                <div className="service__title">Crop Prediction</div>
                                <p>AI-powered insights for optimal crop selection and yield forecasting</p>
                            </div>
                        </Link>
                        <Link to="/crop-recc" href='#' >
                            <div className="services-card">
                                <PiPlant className='icon' />
                                <div className="service__title">Crop Prediction</div>
                                <p>AI-powered insights for optimal crop selection and yield forecasting</p>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
            {showAddCrop && <AddCrop close={() => setShowAddCrop(false)} />}
            <Footer />
        </>
    )
}

export default Dashboard
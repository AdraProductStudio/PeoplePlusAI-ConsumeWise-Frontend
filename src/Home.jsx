import React from 'react'
import Image from 'Utils/Image'
import Img from 'Components/Img/Img'
import HeaderCard from 'Components/Card/HeaderCard'
import './Stylesheet/Css/Home.css'
import ButtonComponent from 'Components/Button/Button'
import { Link, NavLink, useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/chat', { state: { buttonClicked: 'upload-image-button' } });
    };

    return (
        <>

            {/* <Img
                className="body-bottom-image"
                src={Image.bodyBottomImage}
                alt="peoplePlusAI-logo"
            /> */}


            <Img
                className="body-top-image d-none d-md-block"
                src={Image.bodyTopImage}
                alt="peoplePlusAI-logo"
            />

            <Img
                className="body-bottom-image  d-none d-md-block"
                src={Image.bodyBottomImage}
                alt="peoplePlusAI-logo"
            />

            <HeaderCard
                cardClassName='border-0 header-card'
                cardTitleClassName="justify-content-start mb-0"
                cardContent={<>
                    <Img
                        src={Image.CompanyLogo}
                        alt="peoplePlusAI-logo"
                    />
                </>}
            />


            <div className='text-center'>
                <Img
                    src={Image.consumerWise}
                    alt="peoplePlusAI-logo"
                />
            </div>



            <div className='homepage-main-text text-center'>
                <p className='mb-0'>Upgrade your <span className='special-text'>Product Search</span> experience with smart <br />tools that do the work for you!</p>
            </div>

            <div className="d-flex flex-wrap justify-content-center w-100 homepage-button-container">
                <Link to="/chat">
                    <ButtonComponent
                        className={'homepage-button'}
                        buttonName={<>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <path d="M12.0212 21.1616C17.1028 21.1616 21.2222 17.0422 21.2222 11.9607C21.2222 6.87916 17.1028 2.75977 12.0212 2.75977C6.9397 2.75977 2.82031 6.87916 2.82031 11.9607C2.82031 17.0422 6.9397 21.1616 12.0212 21.1616Z" stroke="white" strokeWidth="1.75256" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20.1289 21.8676C20.6708 23.5033 21.9078 23.6669 22.8585 22.2356C23.7275 20.927 23.155 19.8536 21.5806 19.8536C20.4152 19.8434 19.7609 20.7532 20.1289 21.8676Z" stroke="white" strokeWidth="1.75256" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Search for products</>}
                    />
                </Link>

                <ButtonComponent
                    className={'homepage-button'}
                    buttonName={<>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                            <path d="M6.72153 20.1394C4.30168 20.1394 2.33984 18.2011 2.33984 15.8099C2.33984 13.4187 4.30168 11.4793 6.72153 11.4793C7.01255 11.48 7.29539 11.5073 7.57006 11.5611M7.57006 11.5611C7.33042 10.9195 7.20784 10.2402 7.20815 9.55529C7.20815 6.36666 9.82326 3.78223 13.0497 3.78223C16.0553 3.78223 18.5304 6.02521 18.8565 8.90918M7.57006 11.5611C8.13563 11.6712 8.67404 11.8914 9.15466 12.2092M14.9972 8.92145C15.6235 8.70396 16.2818 8.59303 16.9448 8.59329C17.6134 8.59329 18.2564 8.70472 18.8565 8.90918M18.8565 8.90918C21.1424 9.69126 22.7863 11.8392 22.7863 14.3664C22.7863 17.1338 20.8163 19.4473 18.1859 20.0096" stroke="white" strokeWidth="1.75256" strokeLinecap="round" />
                            <path d="M12.5622 17.0723V23.2062M12.5622 17.0723L14.6069 19.1169M12.5622 17.0723L10.5176 19.1169" stroke="white" strokeWidth="1.75256" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Upload images/screenshots</>}
                    clickFunction={handleNavigation}
                />

            </div>
            {/* <div className='homepage-button-container'>
                <Link to="/chat" className='d-flex justify-content-center '>
                    <ButtonComponent
                        className={'homepage-button'}
                        buttonName={<>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M16.676 3.30808H19.7429M21.2969 21.1108C21.6117 20.7275 21.7876 20.2071 21.7876 19.6653V7.39737C21.7876 6.85554 21.6117 6.33416 21.2969 5.95181C20.9851 5.56741 20.5598 5.35273 20.1161 5.35273H10.9346C9.17108 5.35273 8.82962 3.58308 7.29818 3.33466C7.02828 3.2907 6.74817 3.30808 6.47521 3.30808C5.50093 3.30808 5.01431 3.30808 4.63093 3.47063C4.14327 3.67791 3.75512 4.06643 3.54829 4.55429C3.38574 4.93562 3.38574 5.42224 3.38574 6.39652V19.6653C3.38574 20.2071 3.56158 20.7285 3.87646 21.1108C4.18929 21.4942 4.61458 21.7099 5.05827 21.7099H20.1151C20.5588 21.7099 20.983 21.4952 21.2969 21.1108Z" stroke="white" strokeWidth="1.75256" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.1205 17.621C15.2051 17.621 16.2452 17.1901 17.0121 16.4233C17.779 15.6564 18.2098 14.6162 18.2098 13.5317C18.2098 12.4471 17.779 11.407 17.0121 10.6401C16.2452 9.87322 15.2051 9.44238 14.1205 9.44238C13.036 9.44238 11.9959 9.87322 11.229 10.6401C10.4621 11.407 10.0313 12.4471 10.0312 13.5317C10.0313 14.6162 10.4621 15.6564 11.229 16.4233C11.9959 17.1901 13.036 17.621 14.1205 17.621Z" stroke="white" strokeWidth="1.75256" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Take pictures of product labels</>}
                    />
                </Link>
            </div> */}


            <div className='disclaimer-container mx-auto '>
                <p className='mb-0 disclaimer-text'>Disclaimer</p>
                <ul>
                    <li>The solution provided herein is a prototype in the research phase, intended for informational and testing purposes only. We make no warranties, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of the prototype or the information it provides. Any reliance you place on such information is strictly at your own risk.</li>
                    <li>The information provided through this prototype may include data from third parties, which have not been independently verified. The inclusion of such information does not imply endorsement or accuracy. All statements are intended as fair commentary based on data available in the public domain at the time of research and are not intended to harm, disadvantage, or negatively impact any individual, organization, or product.</li>
                    <li>This prototype is developed as part of a fellowship program offered by EkStep Foundation through its People+ai initiative. EkStep Foundation disclaims all liability for any loss or damage arising from the use of this prototype. By using this prototype, you acknowledge and agree to these terms and release us from any and all related liability.</li>
                    <li>For queries, please contact us at <span ><a className="disclaimer-link-text" href="sonika@peopleplus.ai" target='_blank' >sonika@peopleplus.ai</a></span></li>
                </ul>
            </div>



        </>

    )
}

export default Home

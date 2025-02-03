import React, { useState } from 'react'
import Image from 'Utils/Image'
import Img from 'Components/Img/Img'
import HeaderCard from 'Components/Card/HeaderCard'
import { Link } from 'react-router-dom'
import ButtonComponent from 'Components/Button/Button'
import './Stylesheet/Css/MediaUpload.css';


const MediaUpload = () => {

    const [isFileSelected, setIsFileSelected] = useState(null)

    const handleFileUploadChange = (e) => {
        console.log(e.target.files[0])
        setIsFileSelected(e.target.files[0])
    }

    const handleFileUploadClick = (e) => {
        document.getElementById("upload-file").click()
    }

    return (
        <section className='media-upload-component'>

            <Img
                className="body-top-image"
                src={Image.bodyTopImage}
                alt="peoplePlusAI-logo"
            />

            <Img
                className="body-bottom-image"
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

            <div className="media-upload-full-container">
                <div className='back-icon-container'>
                    <Link to="/" className="back-icon cup">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                            <path d="M29.0711 21.9992L14.9289 21.9992M14.9289 21.9992L20.2322 27.3025M14.9289 21.9992L20.2322 16.6959" stroke="#005C75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Link>
                </div>


                <div className=''>
                    <div className='media-upload-container'>
                        <div>
                            <div>
                                <h5 className='mb-0 media-upload-text'>Media Upload</h5>
                                <p className='mb-0 media-upload-sub-text'>Add your documents here, and you can upload up to 25mb files max</p>
                            </div>

                            <div className="drop-file-container text-center cup p-3" onClick={handleFileUploadClick}>

                                <input type="file" hidden id='upload-file' onChange={handleFileUploadChange} />

                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4405 6.72852L14.3348 6.74216L12.7321 6.94676L10.7849 7.19228C9.59847 7.33123 8.49724 7.87836 7.66983 8.73998C6.84243 9.6016 6.34034 10.7241 6.24956 11.9152C5.54214 21.7678 5.54214 31.6585 6.24956 41.5111C6.33318 42.711 6.84319 43.8415 7.68746 44.6982C8.53172 45.555 9.65456 46.0816 10.8531 46.1828C19.9784 46.9467 28.3331 46.9467 37.455 46.1828C38.6535 46.0816 39.7764 45.555 40.6206 44.6982C41.4649 43.8415 41.9749 42.711 42.0585 41.5111C42.7658 31.6585 42.7658 21.7678 42.0585 11.9152C41.9679 10.7246 41.4663 9.60253 40.6396 8.74098C39.8128 7.87942 38.7124 7.33196 37.5266 7.19228L35.5828 6.94676L33.9801 6.74216L33.871 6.72852H14.4405Z" fill="#E7F1F3" />
                                        <path d="M15.6348 7.37585C15.6339 6.78835 15.7489 6.20644 15.9732 5.66345C16.1975 5.12046 16.5267 4.62705 16.942 4.21146C17.3572 3.79588 17.8504 3.46629 18.3932 3.24157C18.936 3.01685 19.5178 2.90141 20.1053 2.90186H28.2076C29.3947 2.90186 30.5331 3.3734 31.3724 4.21276C32.2118 5.05211 32.6833 6.19052 32.6833 7.37755C32.6833 8.56458 32.2118 9.70299 31.3724 10.5423C30.5331 11.3817 29.3947 11.8532 28.2076 11.8532H20.1087C19.5206 11.8537 18.9382 11.7382 18.3948 11.5133C17.8514 11.2885 17.3576 10.9587 16.9417 10.5428C16.5259 10.127 16.1961 9.63323 15.9713 9.0898C15.7464 8.54638 15.6343 7.96395 15.6348 7.37585Z" fill="#005C75" />
                                    </svg>
                                </div>
                                <p className='mb-0 drop-file-text'>Drop file or Browse</p>
                                <p className='mb-0 drop-file-sub-text'>Format: pdf, docx, doc & Max file size: 25 MB</p>
                            </div>

                            <div className="browse-file-container">
                                <ButtonComponent
                                    buttonName={
                                        <div className='d-flex align-items-center justify-content-center' onClick={handleFileUploadClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                <path d="M21.1185 15.1459V19.0179C21.1185 19.5314 20.9145 20.0238 20.5515 20.3869C20.1884 20.75 19.696 20.954 19.1825 20.954H5.63036C5.11689 20.954 4.62446 20.75 4.26138 20.3869C3.89831 20.0238 3.69434 19.5314 3.69434 19.0179V15.1459M17.2465 8.36984L12.4064 3.52979M12.4064 3.52979L7.56638 8.36984M12.4064 3.52979V15.1459" stroke="#005C75" stroke-width="1.74242" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span className='browse-text '>Browse</span>
                                        </div>}
                                    className="btn browse-button mx-auto d-block"
                                />
                                <p className='mb-0 browse-file-sub-text'>Or Drop files in the drop zone above.</p>
                            </div>
                        </div>
                    </div>
                    {
                        isFileSelected !== null &&
                        <div className='upload-progress-container mx-auto'>
                            <div className='d-flex align-items-center' >
                                <div className='upload-text-container' >
                                    <p className='mb-2 uploading-text'>Uploading...</p>
                                    <p className='mb-0 in-progress-text'>65% •<span> 30 seconds remaining</span></p>
                                </div>
                                <div className='d-flex justify-content-center align-items-center upload-icons-container gap-2'>
                                    <svg className='cup' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path opacity="0.3" d="M15.9895 3.71387C9.18217 3.71387 3.64062 9.25541 3.64062 16.0627C3.64062 22.87 9.18217 28.4115 15.9895 28.4115C22.7968 28.4115 28.3383 22.87 28.3383 16.0627C28.3383 9.25541 22.7968 3.71387 15.9895 3.71387ZM14.4459 22.2371H11.3586V9.88829H14.4459V22.2371ZM20.6203 22.2371H17.5331V9.88829H20.6203V22.2371Z" fill="#6D6D6D" />
                                        <path d="M20.6204 9.88867H17.5332V22.2375H20.6204V9.88867Z" fill="#6D6D6D" />
                                        <path d="M14.4466 9.88867H11.3594V22.2375H14.4466V9.88867Z" fill="#6D6D6D" />
                                        <path d="M15.9898 0.626953C7.46906 0.626953 0.553711 7.5423 0.553711 16.063C0.553711 24.5837 7.46906 31.499 15.9898 31.499C24.5105 31.499 31.4258 24.5837 31.4258 16.063C31.4258 7.5423 24.5105 0.626953 15.9898 0.626953ZM15.9898 28.4118C9.18246 28.4118 3.64092 22.8703 3.64092 16.063C3.64092 9.2557 9.18246 3.71416 15.9898 3.71416C22.7971 3.71416 28.3386 9.2557 28.3386 16.063C28.3386 22.8703 22.7971 28.4118 15.9898 28.4118Z" fill="#6D6D6D" />
                                    </svg>
                                    <svg className='cup' xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                                        <path opacity="0.3" d="M19.2102 6.71387C12.4029 6.71387 6.86133 12.2554 6.86133 19.0627C6.86133 25.87 12.4029 31.4115 19.2102 31.4115C26.0175 31.4115 31.559 25.87 31.559 19.0627C31.559 12.2554 26.0175 6.71387 19.2102 6.71387ZM25.3846 23.0606L23.2081 25.2371L19.2102 21.2392L15.2122 25.2371L13.0357 23.0606L17.0337 19.0627L13.0357 15.0648L15.2122 12.8883L19.2102 16.8862L23.2081 12.8883L25.3846 15.0648L21.3866 19.0627L25.3846 23.0606Z" fill="#FF3636" />
                                        <path d="M23.2074 12.8876L19.2095 16.8855L15.2115 12.8876L13.0351 15.0641L17.033 19.062L13.0351 23.06L15.2115 25.2364L19.2095 21.2385L23.2074 25.2364L25.3839 23.06L21.386 19.062L25.3839 15.0641L23.2074 12.8876ZM19.2095 3.62598C10.6733 3.62598 3.77344 10.5259 3.77344 19.062C3.77344 27.5982 10.6733 34.4981 19.2095 34.4981C27.7456 34.4981 34.6455 27.5982 34.6455 19.062C34.6455 10.5259 27.7456 3.62598 19.2095 3.62598ZM19.2095 31.4109C12.4022 31.4109 6.86065 25.8693 6.86065 19.062C6.86065 12.2547 12.4022 6.71319 19.2095 6.71319C26.0168 6.71319 31.5583 12.2547 31.5583 19.062C31.5583 25.8693 26.0168 31.4109 19.2095 31.4109Z" fill="#FF3636" />
                                    </svg>
                                </div>
                            </div>

                            <div className="progress-bar-container">
                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar w-75"></div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>

    )
}

export default MediaUpload

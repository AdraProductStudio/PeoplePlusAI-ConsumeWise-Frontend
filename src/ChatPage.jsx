import React, { useState } from 'react'
import HeaderCard from 'Components/Card/HeaderCard'
import './Stylesheet/Css/ChatPage.css'
import { Link } from 'react-router-dom'
import Image from 'Utils/Image'
import Img from 'Components/Img/Img'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonComponent from 'Components/Button/Button'
import MediaUpload from 'MediaUpload'
import axiosInstance from 'Services/axiosInstance'

const ChatPage = () => {

    const [show, setShow] = useState(false);
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [selectedFileName, setSelectedFileName] = useState("")
    const [selectedFileURL, setSelectedFileURL] = useState("")
    const [progressPercentage, setProgressPercentage] = useState(null);
    const [messages, setMessages] = useState([])
    const [userInputMessage, setUserInputMessage] = useState("");



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleFileUploadChange = async (e) => {

        try {

            let file = e.target.files[0];
            if (
                file.name.includes(".png") ||
                file.name.includes(".jpeg") ||
                file.name.includes(".jpg") ||
                file.name.includes(".PNG") ||
                file.name.includes(".JPEG") ||
                file.name.includes(".JPG") ||
                file.name.includes(".HEIC")
            ) {
                setIsFileSelected(true)
                setSelectedFileName(file.name)
                const url = URL.createObjectURL(file)
                setSelectedFileURL(url)

                // setFileUploadLoading(true);
                const formData = new FormData();
                formData.append("file", file);
                const config = {
                    onUploadProgress: function (progressEvent) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 99) / progressEvent.total
                        );
                        setProgressPercentage(percentCompleted);
                    },
                };
                const response = await axiosInstance.post("/upload_image", formData, config)

                if (response.data.status_code === 201) {

                    const userMessage = { text: e.target.files[0].name,url:URL.createObjectURL(file), user: true, time: currentTime(new Date()) }

                    setMessages((prevMessages) => [...prevMessages, userMessage])
                    const loadingText = { text: "Loading...", user: false, time: currentTime(new Date()) }
                    setMessages((prevMessages) => [...prevMessages, loadingText])

                    const responseMessage = response.data.data.response;
                    const formattedHTML = responseMessage
                        .split("\n\n")
                        .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
                        .join("");

                    const botMessage = { text: formattedHTML, user: false, time: currentTime(new Date()) };
                    setMessages((prevMessages) => [
                        ...prevMessages.slice(0, -1),
                        botMessage,
                    ]);

                    setIsFileSelected(false)
                    handleClose()

                    setTimeout(() => {
                        document.querySelector("#scrollView").scrollIntoView({ behavior: 'smooth' });
                    }, 1);
                } else {

                    const responseMessage = response.data.message;
                    const botMessage = { text: responseMessage, user: false, time: currentTime(new Date()) };
                    setMessages((prevMessages) => [
                        ...prevMessages.slice(0, -1),
                        botMessage,
                    ]);
                

                    setIsFileSelected(false)
                    handleClose()

                    setTimeout(() => {
                        document.querySelector("#scrollView").scrollIntoView({ behavior: 'smooth' });
                    }, 1);
                }
            } else {
                console.log("Unsupported file format. Please upload PDF files only.");
            }
        } catch (err) {
            console.log(err);
        }



    }

    const handleFileUploadClick = (e) => {
        document.getElementById("upload-file").click()
    }

    const handleSendMessage = async (text, value) => {

        if (!text.trim()) return

        if (text !== "") {
            try {
                let payload;
                if (value === "suggestionResponseText") {
                    setSelectedFileName("")
                    setSelectedFileURL("")
                    payload = {
                        "message": text,
                        "flag": "True"
                    }
                    const userMessage = { text: text, user: true, time: currentTime(new Date()) }
                    setMessages((prevMessages) => [...prevMessages, userMessage])
                    setUserInputMessage("")

                    const loadingText = { text: "Loading...", user: false, time: currentTime(new Date()) }
                    setMessages((prevMessages) => [...prevMessages, loadingText])

                    setTimeout(() => {
                        document.querySelector("#scrollView").scrollIntoView({ behavior: 'smooth' });
                    }, 1);

                } else {
                    payload = {
                        "message": text,
                        "flag": "False"
                    }
                    setSelectedFileName("")
                    setSelectedFileURL("")

                    const userMessage = { text: text, user: true, time: currentTime(new Date()) }
                    setMessages((prevMessages) => [...prevMessages, userMessage])
                    setUserInputMessage("")

                    const loadingText = { text: "Loading...", user: false, time: currentTime(new Date()) }
                    setMessages((prevMessages) => [...prevMessages, loadingText])

                    setTimeout(() => {
                        document.querySelector("#scrollView").scrollIntoView({ behavior: 'smooth' });
                    }, 1);

                }

                const response = await axiosInstance.post("/chat", payload);

                if (response.data.status_code === 200) {
                    const responseArray = response.data.data.response;
                    const botMessage = { text: responseArray, user: false, time: currentTime(new Date()) };
                    setMessages((prevMessages) => [
                        ...prevMessages.slice(0, -1),
                        botMessage,
                    ]);

                    setTimeout(() => {
                        document.querySelector("#scrollView").scrollIntoView({ behavior: 'smooth' });
                    }, 1);

                } else if (response.data.status_code === 201) {
                    const responseMessage = response.data.data.response;
                    const formattedHTML = responseMessage
                        .split("\n\n") // Split by double newline to create paragraphs
                        .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`) // Replace single \n with <br>
                        .join(""); // Join paragraphs together

                    const botMessage = { text: formattedHTML, user: false, time: currentTime(new Date()) };
                    setMessages((prevMessages) => [
                        ...prevMessages.slice(0, -1),
                        botMessage,
                    ]);
                    setTimeout(() => {
                        document.querySelector("#scrollView").scrollIntoView({ behavior: 'smooth' });
                    }, 1);
                } else {
                    const responseMessage = response.data.message;
                    const botMessage = { text: responseMessage, user: false, time: currentTime(new Date()) };
                    setMessages((prevMessages) => [
                        ...prevMessages.slice(0, -1),
                        botMessage,
                    ]);
                    setTimeout(() => {
                        document.querySelector("#scrollView").scrollIntoView({ behavior: 'smooth' });
                    }, 1);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSendMessage(userInputMessage, "userInputMessage")
        }
    }


    const currentTime = (date) => {
        let hours = date.getHours()
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        hours = hours < 10 ? `0${hours}` : hours
        let minutes = date.getMinutes()
        minutes = minutes < 10 ? `0${minutes}` : minutes
        const time = `${hours}:${minutes} ${ampm}`
        return time
    }



    return (
        <section className='chatpage-component'>

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

            <div className="chat-container ">
                <Link to="/" className="back-icon cup">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                        <path d="M29.0711 21.9992L14.9289 21.9992M14.9289 21.9992L20.2322 27.3025M14.9289 21.9992L20.2322 16.6959" stroke="#005C75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </Link>

                {/* Sending-Receiving messages-container */}
                <div className='sending-receiving-message-container'>
                    {
                        messages.length === 0 &&
                        <div className='d-flex justify-content-center align-items-center gap-2 h-100 start-searching-text'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <path d="M12.0212 21.1616C17.1028 21.1616 21.2222 17.0422 21.2222 11.9607C21.2222 6.87916 17.1028 2.75977 12.0212 2.75977C6.9397 2.75977 2.82031 6.87916 2.82031 11.9607C2.82031 17.0422 6.9397 21.1616 12.0212 21.1616Z" stroke="#969696" stroke-width="1.75256" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.1289 21.8676C20.6708 23.5033 21.9078 23.6669 22.8585 22.2356C23.7275 20.927 23.155 19.8536 21.5806 19.8536C20.4152 19.8434 19.7609 20.7532 20.1289 21.8676Z" stroke="#969696" stroke-width="1.75256" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>Start searching here..</span>
                        </div>
                    }
                    {
                        messages?.map((message, index) => {
                            return (
                                <React.Fragment key={index}>
                                {message?.user === true ? (
                                  <>
                                    <div className="sending-message-container">
                                      <div className="mb-0 sending-message">
                                        {message.url ? (
                                          <img
                                            src={message.url}
                                            alt="selected-media-file"
                                            width="150"
                                            height="150"
                                          />
                                        ) : (
                                          message.text
                                        )}
                                      </div>
                                      <p className="mb-0 sending-message-time">{message?.time}</p>
                                    </div>
                                  </>
                                ) : (
                                  <div className="receiving-message-container" key={index}>
                                    <div className="default-receiving-suggestions-container" key={index}>
                                      {Array.isArray(message.text) ? (
                                        message.text.map((item, idx) => (
                                          <p
                                            key={idx}
                                            className="mb-0 cup default-receiving-suggestion"
                                            onClick={() => handleSendMessage(item, "suggestionResponseText")}
                                          >
                                            {item}
                                          </p>
                                        ))
                                      ) : (
                                        <>
                                          <div className="mb-0 receiving-message">
                                            {message.url ? (
                                              <img
                                                src={message.url}
                                                alt="received-media-file"
                                                width="150"
                                                height="150"
                                              />
                                            ) : (
                                              <p
                                                className="mb-0 recommendation-text"
                                                dangerouslySetInnerHTML={{ __html: message.text }}
                                              />
                                            )}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <p className="mb-0 receiving-message-time">{message?.time}</p>
                                  </div>
                                )}
                              </React.Fragment>
                              
                            )
                        })
                    }
                    <div id="scrollView"></div>
                </div>


                {/* Text area field */}
                <div className="chat-textarea-section position-absolute d-flex align-items-center ">
                    <div className='chat-textarea-container d-flex align-items-center '>
                        <div className='position-relative w-100 me-4 d-flex align-items-center'>
                            <textarea
                                className='chat-textarea-field '
                                type="text"
                                placeholder='Type here..'
                                value={userInputMessage}
                                onChange={(e) => setUserInputMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <svg className='position-absolute record-icon cup' xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M10.5479 15.8337C13.3062 15.8337 15.5479 13.592 15.5479 10.8337V6.66699C15.5479 3.90866 13.3062 1.66699 10.5479 1.66699C7.78952 1.66699 5.54785 3.90866 5.54785 6.66699V10.8337C5.54785 13.592 7.78952 15.8337 10.5479 15.8337Z" stroke="#232323" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3.04785 9.16699V10.8337C3.04785 14.9753 6.40618 18.3337 10.5479 18.3337C14.6895 18.3337 18.0479 14.9753 18.0479 10.8337V9.16699" stroke="#232323" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.13965 6.2334C9.62298 5.69173 11.2396 5.69173 12.723 6.2334" stroke="#232323" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.90625 8.73359C9.90625 8.45859 10.9646 8.45859 11.9646 8.73359" stroke="#232323" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className='d-flex align-items-center'>
                            <svg onClick={handleShow} className="cup" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_230_1393" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect x="0.0957031" y="0.408203" width="23.1844" height="23.1844" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_230_1393)">
                                    <path d="M5.03733 20.2117C4.55706 20.2117 4.14594 20.0407 3.80397 19.6987C3.462 19.3568 3.29102 18.9456 3.29102 18.4654V5.53572C3.29102 5.05545 3.462 4.64433 3.80397 4.30236C4.14594 3.96039 4.55706 3.7894 5.03733 3.7894H13.4342V5.23843H5.03733C4.95055 5.23843 4.87931 5.26628 4.8236 5.32199C4.76789 5.37769 4.74004 5.44894 4.74004 5.53572V18.4654C4.74004 18.5521 4.76789 18.6234 4.8236 18.6791C4.87931 18.7348 4.95055 18.7627 5.03733 18.7627H17.967C18.0536 18.7627 18.1248 18.7348 18.1807 18.6791C18.2364 18.6234 18.2643 18.5521 18.2643 18.4654V10.0685H19.7133V18.4654C19.7133 18.9456 19.5423 19.3568 19.2003 19.6987C18.8584 20.0407 18.4472 20.2117 17.967 20.2117H5.03733ZM16.7037 8.73082V6.79878H14.7716V5.35H16.7037V3.41797H18.1527V5.35H20.0847V6.79878H18.1527V8.73082H16.7037ZM6.43057 16.5891H16.6479L13.4711 12.3536L10.759 15.8832L8.82701 13.4124L6.43057 16.5891Z" fill="#232323" />
                                </g>
                            </svg>

                            <div className="vertical-line"></div>

                            {/* <svg className="cup" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <g clip-path="url(#clip0_230_1397)">
                                    <path d="M13.7083 12.5007C13.7083 12.7217 13.6205 12.9336 13.4643 13.0899C13.308 13.2462 13.096 13.334 12.875 13.334H11.2083V15.0007C11.2083 15.2217 11.1205 15.4336 10.9643 15.5899C10.808 15.7462 10.596 15.834 10.375 15.834C10.154 15.834 9.94202 15.7462 9.78574 15.5899C9.62946 15.4336 9.54167 15.2217 9.54167 15.0007V13.334H7.875C7.65399 13.334 7.44202 13.2462 7.28574 13.0899C7.12946 12.9336 7.04167 12.7217 7.04167 12.5007C7.04167 12.2796 7.12946 12.0677 7.28574 11.9114C7.44202 11.7551 7.65399 11.6673 7.875 11.6673H9.54167V10.0007C9.54167 9.77964 9.62946 9.56768 9.78574 9.4114C9.94202 9.25512 10.154 9.16732 10.375 9.16732C10.596 9.16732 10.808 9.25512 10.9643 9.4114C11.1205 9.56768 11.2083 9.77964 11.2083 10.0007V11.6673H12.875C13.096 11.6673 13.308 11.7551 13.4643 11.9114C13.6205 12.0677 13.7083 12.2796 13.7083 12.5007ZM20.375 6.66732V15.0007C20.3737 16.1053 19.9343 17.1644 19.1532 17.9455C18.372 18.7266 17.313 19.166 16.2083 19.1673H4.54167C3.437 19.166 2.37796 18.7266 1.59685 17.9455C0.815735 17.1644 0.376323 16.1053 0.375 15.0007L0.375 5.00065C0.376323 3.89599 0.815735 2.83695 1.59685 2.05583C2.37796 1.27472 3.437 0.835308 4.54167 0.833984H6.64833C7.03617 0.834306 7.41866 0.924439 7.76583 1.09732L10.3958 2.41732C10.512 2.47309 10.6394 2.50159 10.7683 2.50065H16.2083C17.313 2.50197 18.372 2.94139 19.1532 3.7225C19.9343 4.50362 20.3737 5.56266 20.375 6.66732ZM2.04167 5.00065V5.83398H18.555C18.3833 5.34823 18.0656 4.92739 17.6456 4.62906C17.2255 4.33072 16.7236 4.16945 16.2083 4.16732H10.7683C10.3805 4.167 9.99801 4.07686 9.65083 3.90398L7.02083 2.58815C6.90497 2.53094 6.77755 2.50101 6.64833 2.50065H4.54167C3.87863 2.50065 3.24274 2.76404 2.7739 3.23288C2.30506 3.70173 2.04167 4.33761 2.04167 5.00065ZM18.7083 15.0007V7.50065H2.04167V15.0007C2.04167 15.6637 2.30506 16.2996 2.7739 16.7684C3.24274 17.2373 3.87863 17.5007 4.54167 17.5007H16.2083C16.8714 17.5007 17.5073 17.2373 17.9761 16.7684C18.4449 16.2996 18.7083 15.6637 18.7083 15.0007Z" fill="#232323" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_230_1397">
                                        <rect width="20" height="20" fill="white" transform="translate(0.375)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <div className="vertical-line"></div>

                            <svg className="cup" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M13.8031 2.49983H16.3031M17.5697 17.0115C17.8264 16.699 17.9697 16.2748 17.9697 15.8332V5.83317C17.9697 5.3915 17.8264 4.9665 17.5697 4.65483C17.3156 4.3415 16.9689 4.1665 16.6072 4.1665H9.12306C7.68556 4.1665 7.40723 2.724 6.15889 2.5215C5.93889 2.48567 5.71056 2.49983 5.48806 2.49983C4.69389 2.49983 4.29723 2.49983 3.98473 2.63233C3.58721 2.8013 3.27082 3.11799 3.10223 3.51567C2.96973 3.8265 2.96973 4.22317 2.96973 5.01733V15.8332C2.96973 16.2748 3.11306 16.6998 3.36973 17.0115C3.62473 17.324 3.97139 17.4998 4.33306 17.4998H16.6064C16.9681 17.4998 17.3139 17.3248 17.5697 17.0115Z" stroke="#232323" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.7201 14.1667C12.6041 14.1667 13.452 13.8155 14.0771 13.1904C14.7022 12.5652 15.0534 11.7174 15.0534 10.8333C15.0534 9.94928 14.7022 9.10143 14.0771 8.47631C13.452 7.85119 12.6041 7.5 11.7201 7.5C10.836 7.5 9.98815 7.85119 9.36303 8.47631C8.73791 9.10143 8.38672 9.94928 8.38672 10.8333C8.38672 11.7174 8.73791 12.5652 9.36303 13.1904C9.98815 13.8155 10.836 14.1667 11.7201 14.1667Z" stroke="#232323" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg> */}
                        </div>
                    </div>
                    <div className="send-btn-container cup" onClick={() => handleSendMessage(userInputMessage, "userInputMessage")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <g clip-path="url(#clip0_230_1404)">
                                <path d="M17.3392 0.661053C17.0703 0.388898 16.7358 0.190694 16.3679 0.08559C16 -0.0195141 15.6113 -0.0279654 15.2392 0.0610527L3.2392 2.58855C2.54813 2.68333 1.89725 2.96916 1.35985 3.41386C0.82245 3.85856 0.419881 4.44447 0.197478 5.1056C-0.0249258 5.76673 -0.0583304 6.47683 0.101026 7.15592C0.260382 7.835 0.606169 8.45612 1.09945 8.9493L2.38795 10.2371C2.45768 10.3068 2.51299 10.3896 2.5507 10.4807C2.5884 10.5718 2.60777 10.6694 2.6077 10.7681V13.1441C2.60935 13.4781 2.68626 13.8075 2.8327 14.1078L2.8267 14.1131L2.8462 14.1326C3.06596 14.5744 3.42488 14.9317 3.8677 15.1496L3.8872 15.1691L3.89245 15.1631C4.19272 15.3095 4.52212 15.3864 4.8562 15.3881H7.2322C7.43098 15.3879 7.62171 15.4667 7.76245 15.6071L9.0502 16.8948C9.39559 17.244 9.80668 17.5214 10.2598 17.711C10.7129 17.9006 11.199 17.9987 11.6902 17.9996C12.0995 17.999 12.506 17.9322 12.8939 17.8016C13.549 17.5864 14.131 17.1926 14.5741 16.6643C15.0173 16.1361 15.304 15.4946 15.4019 14.8121L17.9332 2.7858C18.0268 2.41053 18.0213 2.01737 17.9172 1.64488C17.813 1.27238 17.6139 0.933355 17.3392 0.661053ZM3.44995 9.17805L2.1607 7.8903C1.86049 7.59732 1.65008 7.22479 1.55416 6.81642C1.45825 6.40805 1.48081 5.9808 1.6192 5.5848C1.75337 5.17855 2.0014 4.81937 2.33379 4.55C2.66619 4.28063 3.06896 4.11239 3.4942 4.0653L15.3749 1.56405L4.1062 12.8343V10.7681C4.10733 10.4728 4.04992 10.1803 3.93728 9.90734C3.82463 9.63443 3.659 9.38655 3.44995 9.17805ZM13.9282 14.5556C13.8706 14.9698 13.6987 15.3598 13.4318 15.6818C13.1648 16.0038 12.8134 16.245 12.417 16.3783C12.0206 16.5117 11.5949 16.5319 11.1876 16.4367C10.7804 16.3416 10.4077 16.1348 10.1114 15.8396L8.82145 14.5496C8.61322 14.3402 8.36555 14.1742 8.09276 14.0612C7.81997 13.9481 7.52748 13.8903 7.2322 13.8911H5.16595L16.4362 2.62455L13.9282 14.5556Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_230_1404">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>

            </div>



            <Modal
                className='chatpage-component-modal'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Media</Modal.Title>
                </Modal.Header>
                <Modal.Body className='px-5 py-4'>
                    <div className='media-upload-container p-5'>
                        <div>

                            <div className={`drop-file-container text-center cup p-3 ${isFileSelected && 'pe-none opacity-50'}`} onClick={handleFileUploadClick}>

                                <input type="file" hidden id='upload-file' onChange={handleFileUploadChange} />

                                {isFileSelected && <p className='selected-media-file'><b>File name</b> : {selectedFileName}</p>}

                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4405 6.72852L14.3348 6.74216L12.7321 6.94676L10.7849 7.19228C9.59847 7.33123 8.49724 7.87836 7.66983 8.73998C6.84243 9.6016 6.34034 10.7241 6.24956 11.9152C5.54214 21.7678 5.54214 31.6585 6.24956 41.5111C6.33318 42.711 6.84319 43.8415 7.68746 44.6982C8.53172 45.555 9.65456 46.0816 10.8531 46.1828C19.9784 46.9467 28.3331 46.9467 37.455 46.1828C38.6535 46.0816 39.7764 45.555 40.6206 44.6982C41.4649 43.8415 41.9749 42.711 42.0585 41.5111C42.7658 31.6585 42.7658 21.7678 42.0585 11.9152C41.9679 10.7246 41.4663 9.60253 40.6396 8.74098C39.8128 7.87942 38.7124 7.33196 37.5266 7.19228L35.5828 6.94676L33.9801 6.74216L33.871 6.72852H14.4405Z" fill="#E7F1F3" />
                                        <path d="M15.6348 7.37585C15.6339 6.78835 15.7489 6.20644 15.9732 5.66345C16.1975 5.12046 16.5267 4.62705 16.942 4.21146C17.3572 3.79588 17.8504 3.46629 18.3932 3.24157C18.936 3.01685 19.5178 2.90141 20.1053 2.90186H28.2076C29.3947 2.90186 30.5331 3.3734 31.3724 4.21276C32.2118 5.05211 32.6833 6.19052 32.6833 7.37755C32.6833 8.56458 32.2118 9.70299 31.3724 10.5423C30.5331 11.3817 29.3947 11.8532 28.2076 11.8532H20.1087C19.5206 11.8537 18.9382 11.7382 18.3948 11.5133C17.8514 11.2885 17.3576 10.9587 16.9417 10.5428C16.5259 10.127 16.1961 9.63323 15.9713 9.0898C15.7464 8.54638 15.6343 7.96395 15.6348 7.37585Z" fill="#005C75" />
                                    </svg>
                                </div>
                                <p className='mb-0 drop-file-text'>Drop file or Browse</p>
                                <p className='mb-0 drop-file-sub-text'>Format: pdf, docx, doc & Max file size: 25 MB</p>
                            </div>

                            <div className={`browse-file-container ${isFileSelected && 'pe-none opacity-50'}`}>
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
                        isFileSelected === true &&
                        <div className='upload-progress-container mx-auto'>
                            <div className='d-flex align-items-center' >
                                <div className='upload-text-container' >
                                    <p className='mb-2 uploading-text'>Uploading...</p>
                                    <p className='mb-0 in-progress-text'>{progressPercentage}% • 30 seconds remaining</p>
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


                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={`${progressPercentage}`} aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar w-75"></div>
                                </div>
                            </div>
                        </div>
                    }

                </Modal.Body>

            </Modal>




        </section>

    )
}

export default ChatPage

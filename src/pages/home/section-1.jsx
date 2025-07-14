
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import hero from "../../assets/video/updatedhero-mobile-final.mp4";

export const SectionOneHomePage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    return (
        <div className="hero__container">
            <div className="hero__left">
                <h1 className="hero__title">
                    Capture, organize, and<br />
                    tackle your to-dos from<br />
                    anywhere.
                </h1>

                <p className="hero__subtitle">
                    Escape the clutter and chaos—unleash your productivity with Nemo.
                </p>

                <div className="hero__form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        aria-label="Email"
                        className="hero__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button onClick={() => navigate(`/signup?email=${encodeURIComponent(email)}`)} className="hero__button">
                        Sign up – it’s free!
                    </button>
                </div>


                <p className="hero__privacy">
                    By entering my email, I acknowledge the{' '}
                    <a
                        href="https://www.atlassian.com/legal/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Atlassian Privacy Policy
                    </a>.
                </p>

                <a href="#video" className="hero__watch">
                    <span>Watch video</span>
                    <svg
                        fill="none"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            d="m10.0138 16.3878c-.83597.4912-1.5138.105-1.5138-.8645v-7.04491c0-.97008.6755-1.358 1.5138-.86566l6.465 3.79747c.5548.3261.5589.8517 0 1.1801z"
                            fill="currentColor"
                            fillRule="evenodd"
                        ></path>
                        <circle cx="12" cy="12" r="11.5" stroke="currentColor"></circle>
                    </svg>
                </a>
            </div>

            <div className="hero__right">
                <video
                    className="hero__video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={hero} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

    )
}
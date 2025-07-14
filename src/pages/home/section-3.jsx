import React from "react";
import emailMagicImg from "../../assets/img/home-page/email-preview.png";
import messageMagicImg from "../../assets/img/home-page/email-result.png";

export function SectionTreeHomePage() {
    return (
        <section className="magic-section">
            <div className="magic-wrapper">
                <div className="magic-title-area">
                    <h2>From message to action</h2>
                    <p>
                        Quickly turn communication from your favorite apps into to-dos,<br />
                        keeping all your discussions and tasks organized in one place.
                    </p>
                </div>

                <div className="magic-block">
                    <div className="magic-image">
                        <img src={emailMagicImg} alt="Email preview" />
                    </div>
                    <div className="magic-text">
                        <div className="magic-heading">
                            <div className="magic-icon">
                                <svg fill="currentColor" aria-hidden="true" viewBox="0 0 32 32">
                                    <path d="M6 5.333h9.333a3.333 3.333 0 0 1 0 6.667H6a3.333 3.333 0 0 1 0-6.667Zm9.333 4a.667.667 0 0 0 0-1.333H6a.667.667 0 0 0 0 1.333h9.333Zm-6.666 4H18A3.333 3.333 0 1 1 18 20H8.667a3.333 3.333 0 0 1 0-6.667Zm9.333 4A.667.667 0 0 0 18 16H8.667a.667.667 0 0 0 0 1.333H18Zm6.667 4h-9.334a3.333 3.333 0 1 0 0 6.667h9.334a3.333 3.333 0 0 0 0-6.667Zm-9.334 4a.667.667 0 0 1 0-1.333h9.334a.667.667 0 1 1 0 1.333h-9.334Zm8-20H26A3.333 3.333 0 1 1 26 12h-2.667a3.333 3.333 0 1 1 0-6.667Zm2.667 4A.667.667 0 1 0 26 8h-2.667a.667.667 0 1 0 0 1.333H26Z"></path>
                                </svg>
                            </div>
                            <h4>EMAIL MAGIC</h4>
                        </div>
                        <p>
                            Easily turn your emails into to-dos! Just <br />
                            forward them to your Nemo Inbox, and <br />
                            they’ll be transformed by Atlassian <br />
                            Intelligence (AI) into organized to-dos <br />
                            with all the links you need.

                        </p>
                    </div>
                </div>

                <div className="magic-block reverse">
                    <div className="magic-image">
                        <img src={messageMagicImg} alt="Message preview" />
                    </div>
                    <div className="magic-text">
                        <div className="magic-heading">
                            <div className="magic-icon">
                                <svg fill="currentColor" aria-hidden="true" viewBox="0 0 32 32" width="24" height="24">
                                    <path d="M6.66 6.667h18.68A2.66 2.66 0 0 1 28 9.325v16.016A2.659 2.659 0 0 1 25.34 28H6.66A2.66 2.66 0 0 1 4 25.341V9.325a2.659 2.659 0 0 1 2.66-2.658ZM6.667 12v12A1.333 1.333 0 0 0 8 25.333h16A1.333 1.333 0 0 0 25.333 24V12H6.667ZM8 5.333a1.333 1.333 0 0 1 2.667 0v1.334H8V5.333Zm13.333 0a1.333 1.333 0 0 1 2.667 0v1.334h-2.667V5.333Zm-12 12v-2.668H12v2.668H9.333Zm10.667 0v-2.668h2.667v2.668H20Zm-5.333 0v-2.668h2.668v2.668h-2.668Zm-5.334 5.334V20H12v2.667H9.333Zm5.334 0V20h2.668v2.667h-2.668Zm5.333 0V20h2.667v2.667H20Z"></path>
                                </svg>
                            </div>
                            <h4>MESSAGE APP SORCERY</h4>
                        </div>
                        <p>
                            Need to follow up on a message from <br /> Slack or Microsoft Teams? Send it directly <br />
                            to your Nemo board! Your favorite app <br /> interface lets you save messages that <br />
                            appear in your Inbox with AI- <br />generated summaries and links.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

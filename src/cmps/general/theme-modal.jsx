import React, { useState, useEffect } from 'react';

export const ThemeModalContent = ({ setPreviewEndTrue, setPreviewEndFalse }) => {
    const [activeTheme, setActiveTheme] = useState('original')

    useEffect(() => {
        const storedTheme = sessionStorage.getItem('activeTheme')
        if (storedTheme) setActiveTheme(storedTheme)
        else setActiveTheme('original')
    }, [])

    const handleThemeChange = (event) => {
        const newTheme = event.target.value
        setActiveTheme(newTheme)
        sessionStorage.setItem('activeTheme', newTheme)
    }

    return (
        <div className="theme-modal-content">
            <div className="theme-option new-theme">
                <label className="theme-option-label" onClick={setPreviewEndTrue}>
                    <input type="radio" name="theme-option" value={'new'} checked={activeTheme === 'new'} onChange={handleThemeChange} />
                    <span className="theme-option-display">
                        <div className="theme-option-preview">
                            <svg className="theme-option-icon">
                                <use xlinkHref="#new-theme-icon" />
                            </svg>
                            <div className="theme-option-name">New Theme</div>
                        </div>
                    </span>
                </label>
            </div>
            <div className="theme-option original-theme">
                <label className="theme-option-label" onClick={setPreviewEndFalse}>
                    <input type="radio" name="theme-option" value={'original'} checked={activeTheme === 'original'} onChange={handleThemeChange} />
                    <span className="theme-option-display">
                        <div className="theme-option-preview">
                            <div className="theme-option-name">Original Theme</div>
                        </div>
                    </span>
                </label>
            </div>
        </div>
    );
};

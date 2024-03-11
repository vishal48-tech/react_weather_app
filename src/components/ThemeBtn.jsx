import React, { useEffect, useState } from 'react'

const ThemeBtn = ({ dark, setDark }) => {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        const themes = document.getElementsByClassName("themes");
        display ? themes[0].style.display = "flex" : themes[0].style.display = "none";
    }, [display])

    useEffect(() => {
        dark ? darktheme() : lighttheme();
    }, [dark])

    const darktheme = () => {
        const themes_btn = document.getElementsByClassName("themes-btn");
        themes_btn[0].style.backgroundColor = "hsla(209, 100%, 50%, .5)";
        themes_btn[1].style.backgroundColor = "transparent"
    }

    const lighttheme = () => {
        const themes_btn = document.getElementsByClassName("themes-btn");
        themes_btn[1].style.backgroundColor = "hsla(209, 100%, 50%, .5)";
        themes_btn[0].style.backgroundColor = "transparent"
    }

    return (
        <>
            <div className="theme-container" onMouseLeave={() => setDisplay(false)}>
                <button className={`theme-btn ${dark && "theme-btn-dark"}`} onMouseEnter={() => setDisplay(true)}>
                    {dark ? "Dark" : "Light"}
                </button>
                <div className={`themes ${dark && "themes-dark"}`}>
                    <button className={`themes-btn ${dark && "themes-btn-dark"}`} onClick={() => setDark(true)}>Dark</button>
                    <button className={`themes-btn ${dark && "themes-btn-dark"}`} onClick={() => setDark(false)}>Light</button>
                </div>
            </div>
        </>
    )
}

export default ThemeBtn
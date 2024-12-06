import React, { useState, useEffect } from 'react';

function ChipsStylePicker({ userInfo, setUserInfo }) {
    const [chipStyles, setChipStyles] = useState([]);

    useEffect(() => {
        // Fetch the list of chip styles from the public folder
        async function fetchChipStyles() {
            const response = await fetch('/src/customizations.json');
            const customizations = await response.json();
            setChipStyles(Array.from(customizations.chips));
        }

        fetchChipStyles();
    }, []);

    const handleStyleClick = (style) => {
        fetch('http://localhost:3000/user/update', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ toBeUpdated: "chipsStyle", chipsStyle: style }),
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const updatedUserInfo = { ...userInfo, chipsStyle: style };
                setUserInfo(updatedUserInfo);
            } else {
                console.error('Failed to update chips style');
            }
        })
        .catch(error => {
            console.error('Error updating chips style:', error);
        });
    };

    return (
        <div className="chips-style-picker">
            <h2>Pick Your Chips Style</h2>
            <div className="chips-style-grid">
                {chipStyles.map(style => (
                    <div
                        key={style}
                        className={`chip-style ${style === userInfo.chipsStyle ? 'selected' : ''}`}
                        onClick={() => handleStyleClick(style)}
                    >
                        <img src={`/images/chips/${style}_p1.png`} alt={`${style} style`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChipsStylePicker;
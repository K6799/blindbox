import React from 'react';
import { Link } from 'react-router-dom';
import './BlindBoxCard.css';

const BlindBoxCard = ({ box }) => {
    return (
        <div className="blindbox-card">
            <Link to={`/blindbox/${box.id}`}>
                <div className="image-container">
                    <img src={box.imageUrl} alt={box.name} className="blindbox-image" />
                </div>
                <div className="blindbox-info">
                    <h3>{box.name}</h3>
                    <p className="blindbox-price">¥{box.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default BlindBoxCard;

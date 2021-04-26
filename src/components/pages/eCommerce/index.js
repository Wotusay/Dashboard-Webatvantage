import React from 'react';
import ConversionChart from '../../UI/D3/conversionChart';

const ECommerce = () => {
       
    return (
        <>
            <div>
                <p>Time Range</p>
                <div>
                    <button>1D</button>
                    <button>1W</button>
                    <button>1M</button>
                </div>
            </div>
            <ConversionChart/>
        </>
    )
}

export default ECommerce;
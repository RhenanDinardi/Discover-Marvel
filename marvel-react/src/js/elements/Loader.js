import React from 'react';

function Loader (props) {

    return (
        <div className="text-center custom-loader">
            <div className="center-loader">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-eclipse svg-loader">
                    <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#d40d0d" transform="rotate(198 50 51)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
            </div>
        </div>
    );
}

export default Loader;
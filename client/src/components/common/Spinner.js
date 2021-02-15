import React from 'react'
import spinner from '../../img/loading-spinner.gif'

export default function Spinner() {
    return (
        <div>
            <img src={spinner}
                style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
        </div>
    )
}

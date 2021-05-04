import React, {Fragment} from 'react';
import CoinRow from './CoinRow';


const Charts = () => {
    return(
        <Fragment>
            <h1>
            </h1>
            <div className='coinTable'>
                <table className='mainTable'>
                    <thead>
                        <tr>
                            <th className="al">Position</th>
                            <th className="al">Coin</th>
                            <th className="al">Price</th>
                            <th className="ar">Market Cap</th>
                            <th className="ar">Percent Change(24H)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CoinRow></CoinRow>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default Charts
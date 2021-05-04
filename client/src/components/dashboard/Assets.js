import React from 'react';
import { connect } from 'react-redux';

const Assets = ({allCoins,profile}) => {
    let rows = []
    let price;
    try{
        rows = profile.assets.map(asset =>{
            for(let i =0; i<allCoins.length; i++){
                if(allCoins[i].CoinInfo.Name==asset.coin){
                    price = allCoins[i].RAW.USD.PRICE
                }
            }
            return (
                <tr>
                    <td className='tb2 al'>
                        {asset.coin}
                    </td>
                    <td className='tb3 ar lh'>
                        {asset.amount}
                    </td>
                    <td className='tb3 ar lh'>
                        {(asset.amount*price).toFixed(2)}
                    </td>
                </tr>
            )
        })
    }
    catch{
        return (
            <tr>
                <td>loading</td>
            </tr>
        )
    }
    return (
        <div id="assetsTable">
            <div className="header">Available Assets</div>
            <table>
                <thead>
                    <tr>
                        <th className='tb2 al lh'>Asset</th>
                        <th className='tb3 ar lh'>Amount</th>
                        <th className='tb3 ar lh'>USDT Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='tb2 al lh'>USDT</td>
                        <td className='tb3 ar lh'>{profile.value}</td>
                        <td className='tb3 ar lh'>{profile.value}</td>
                    </tr>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    allCoins: state.coin.allCoins,
    profile: state.profile.profile,
});

export default connect(mapStateToProps)(Assets);
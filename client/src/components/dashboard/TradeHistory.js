import React from 'react';
import { connect } from 'react-redux';

const TradeHistory = ({profile}) => {
    let rows=[];
    try{
        rows = profile.trades.map(trade =>{
            let typeTrade = 'Buy';
            let amount = trade.buyAmount
            if(trade.buyAmount==0){
                typeTrade='Sell'
                amount=trade.sellAmount
            }
            return (
                <tr>
                <td className='tb1 al lh'>
                    {trade.date.slice(0,10)}
                </td>
                <td className='tb2 ar lh'>
                    {typeTrade}
                </td>
                <td className='tb2 ar lh'>
                    {trade.coin}
                </td>
                <td  className='tb2 ar lh'>
                    {trade.coinPrice}
                </td>
                <td className='tb2 ar lh'>
                    {amount}
                </td>
                <td className='tb2 ar lh'>
                    {(amount*trade.coinPrice).toFixed(2)}
                </td>
                </tr>
            )
        })
    }catch{
        return(
            <div>hey</div>
        )
    }
    return (
        <div id="tradeHistoryTable">
            <div className="header">Trade History</div>
            <table>
                <thead>
                    <tr>
                        <th className='tb1 al lh'>Date</th>
                        <th className='tb2 ar lh'>Buy/Sell</th>
                        <th className='tb2 ar lh'>Coin</th>
                        <th className='tb2 ar lh'>Price</th>
                        <th className='tb2 ar lh'>Amount</th>
                        <th className='tb2 ar lh'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
    
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
});

export default connect(mapStateToProps)(TradeHistory);
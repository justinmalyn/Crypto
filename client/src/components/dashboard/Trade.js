import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { setCoin } from '../../actions/setCoin';
import store from '../../store';

const Trade = ({ allCoins, selectedCoin }) => {

    useEffect(()=>{
        try{
        if(selectedCoin===undefined){
            store.dispatch(setCoin(allCoins[0]));
        }
        } catch{
            //put something here if i try to set btc as default selection
            //before allcoins is loaded
        }
    })

    const onClick = (coin) => {
        store.dispatch(setCoin(coin));
    }

    let rows=[];

    try{
        rows = allCoins.map(coin =>{
            let color="green";
            if(coin.RAW.USD.CHANGEPCTDAY<0){
                color="red";
            }
            return(
                <tr onClick={e => onClick(coin)} id={coin.CoinInfo.Name} className="trHover lh">
                    <td className="tb3" id={coin.CoinInfo.Name}>{coin.CoinInfo.Name}</td>
                    <td className='al' id={coin.CoinInfo.Name}>{parseFloat(coin.RAW.USD.PRICE.toFixed(6))}</td>
                    <td id={coin.CoinInfo.Name} className={'ar '+color}>{parseFloat(coin.RAW.USD.CHANGEPCTDAY.toFixed(2))}%</td>
                </tr>
            )
        })
    }
    catch{
        return(
            <tr>
                <td>Loading</td>
            </tr>
        )
    }
    return(
        <Fragment>
            {rows}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    allCoins: state.coin.allCoins,
    selectedCoin: state.setCoin.setCoin
});

export default connect(mapStateToProps)(Trade)
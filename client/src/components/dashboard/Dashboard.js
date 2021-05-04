import React, {useEffect} from 'react';
import Trade from './Trade';
import Order from './Order';
import Assets from './Assets';
import TradeHistory from './TradeHistory';
import store from '../../store';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Graph from './Graph';
import { updateProfileValue } from '../../actions/profile';

const Dashboard = ({ profile, allCoins }) => {

    useEffect(() => {
        store.dispatch(getCurrentProfile());
    }, []);

    try {
        let profileValue;
        profileValue = profile.value;
        //add up total usdt value of all assets found in asset table
        for(let i = 0; i<profile.assets.length; i++){
            for(let x = 0; x<allCoins.length; x++){
                if(profile.assets[i].coin === allCoins[x].CoinInfo.Name){
                    let price = allCoins[x].RAW.USD.PRICE
                    price = price * profile.assets[i].amount
                    profileValue = profileValue+price;
                }
            }
        }
        profileValue = profileValue.toFixed(2)
        store.dispatch(updateProfileValue(profileValue))
        return (
            <div className="wrapper">
                <div id="profileContainer">
                    <div id="ath">
                        <div id='profileHeader'>
                            <p>
                                Welcome, {profile.name} your account value is <br></br> {profileValue} USDT
                            </p>
                            <br></br>
                            <p>
                                Select a coin from the right to place an order
                            </p>
                        </div>
                        <div id="dashContainer">
                            <Assets/>
                        </div>
                        </div>
                        <div id="graph">
                            <Graph 
                            />
                        </div>
                            <TradeHistory></TradeHistory> 
                        <div id="orderWidget">
                            <Order></Order>
                        </div>  
                    </div>
                    <div id="tradeTableContainer">
                        <table cellSpacing='0' id="tradeTable">
                            <thead>
                                <tr className="header">
                                    <th className="al">Coin</th>
                                    <th className="al">Price</th>
                                    <th className="ar">Change(24H)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Trade></Trade>
                            </tbody>
                        </table>
                    </div>
            </div>
        )
    }
    catch{
        return (
            <div>
                Loading
            </div>
        )
    }
}

const mapStateToProps = state => ({
    allCoins: state.coin.allCoins,
    profile: state.profile.profile,
});

export default connect(mapStateToProps)(Dashboard);
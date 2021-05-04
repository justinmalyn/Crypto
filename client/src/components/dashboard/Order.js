import React, {useState} from 'react'
import { connect } from 'react-redux';
import { postTrade } from '../../actions/profile';

const Order = ({setCoin, profile, postTrade}) => {

    let availableAmount = 0;

    const [formData, setFormData] = useState({
        buyAmount:0,
        sellAmount:0,
        buyError:'',
        sellError:''
    });

    const { buyAmount, sellAmount} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const setAmount = e => {
        if(e.target.name==='buyAmount'){
            setFormData({...formData,
                [e.target.name]:parseFloat(((profile.value * (e.target.value.replace(/\D/g,'')/100))/parseFloat(setCoin.RAW.USD.PRICE.toFixed(6))).toFixed(6))
            })
        }
        else{
            setFormData({...formData,
                [e.target.name]:parseFloat(((availableAmount * (e.target.value.replace(/\D/g,'')/100))).toFixed(6))
            })
        } 
    }

    try{
        
        for(let i=0; i<profile.assets.length; i++){
            if(profile.assets[i].coin===setCoin.CoinInfo.Name){
                availableAmount=profile.assets[i].amount
            }
        }
        let coinPrice = parseFloat(setCoin.RAW.USD.PRICE.toFixed(6));
        let totalBuyValue = parseFloat(coinPrice*buyAmount).toFixed(2);
        let totalSellValue = parseFloat(coinPrice*sellAmount).toFixed(2);
        
        const validate = e => {
            let purchaseInfo = {};
            if(e.target.value==='Buy'){
                purchaseInfo = {
                    coin:setCoin.CoinInfo.Name,
                    coinPrice,
                    buyAmount,
                    sellAmount:0
                }
                if(totalBuyValue>profile.value || totalBuyValue <= 0){

                }
                else{
                    postTrade(purchaseInfo);
                }
            }else{
                purchaseInfo = {
                    coin:setCoin.CoinInfo.Name,
                    coinPrice,
                    buyAmount:0,
                    sellAmount
                }
                if(sellAmount>availableAmount || totalSellValue <= 0){
                    console.log('error')
                }
                else{
                    postTrade(purchaseInfo);
                }
            }
        }
        
        const onSubmit =  e => {
            if(e.target.id==='buyForm'){
                if(buyAmount<=0){
                    e.preventDefault()
                    setFormData({...formData, buyError:"Please enter purchase above 0"})
                }if(totalBuyValue>profile.value){
                    e.preventDefault()
                    setFormData({...formData, buyError:"Not enough funds for purchase"})
                }
            }
            else{
                if(sellAmount<=0){
                    e.preventDefault()
                    setFormData({...formData, sellError:"Please enter sale above 0"})
                }
                if(availableAmount===0 || sellAmount>availableAmount){
                    e.preventDefault()
                    setFormData({...formData, sellError:"Not enough funds for sale"})
                }
            }
        }

        return (
            <div id="orderBox">
                <div id="orderHeader">Place Order</div>
                <div id="buyTab">
                    <form className="form" id="buyForm" onSubmit={e=>onSubmit(e)}>     
                        <div className="coinHeader">Buy {setCoin.CoinInfo.Name}</div>
                        <div className="valueHeader">{profile.value} USDT</div>
                        <div className="priceDiv">
                            <div className="label">Price: </div>
                            <div className="value">{coinPrice}</div>
                        </div>
                        <div className="formDivInput">
                            <div className="label">Amount: </div>
                            <input 
                            className="formInputOrder"
                            type='number'
                            value={buyAmount}
                            name='buyAmount'
                            onChange={e => onChange(e)} 
                            required
                            />
                        </div>
                        <div className="inputDiv">
                            <div className="label"></div>
                            <input type="button" className="amountInput" name ='buyAmount' onClick={e=>setAmount(e)} value="25%"/>
                            <input type="button" className="amountInput" name ='buyAmount' onClick={e=>setAmount(e)} value="50%"/>
                            <input type="button" className="amountInput" name ='buyAmount' onClick={e=>setAmount(e)} value="75%"/>
                            <input type="button" className="amountInput" name ='buyAmount' onClick={e=>setAmount(e)} value="100%"/>
                        </div>
                        <div>
                            <div className="label">Total: </div>
                            <div className="value">{totalBuyValue}</div>
                        </div>
                        <div className="errorDiv">{formData.buyError}</div>
                        <input type='submit' className="buyButton" onClick={validate} value='Buy'></input>
                    </form>
                </div>
                <div id="sellTab">
                    <form className="form" id="sellForm" onSubmit={e=>onSubmit(e)}>
                        <div className="coinHeader">Sell {setCoin.CoinInfo.Name}</div>
                        <div className="valueHeader">{availableAmount}</div>
                        <div className="priceDiv">
                            <div className="label">Price:</div>
                            <div className="value"> {coinPrice}</div>
                        </div>
                        <div className="formDivInput">
                            <div className="label">Amount: </div> 
                            <input
                            className="formInputOrder"
                            type='number'
                            value={sellAmount}
                            name='sellAmount'
                            onChange={e => onChange(e)}
                            required
                            />
                        </div>
                        <div className="inputDiv">
                            <div className="label"></div>
                            <input type="button" className="amountInput" name ='sellAmount' onClick={e=>setAmount(e)} value="25%"/>
                            <input type="button" className="amountInput" name ='sellAmount' onClick={e=>setAmount(e)} value="50%"/>
                            <input type="button" className="amountInput" name ='sellAmount' onClick={e=>setAmount(e)} value="75%"/>
                            <input type="button" className="amountInput" name ='sellAmount' onClick={e=>setAmount(e)} value="100%"/>
                        </div>
                        <div>
                            <div className="label">Total: </div>
                            <div className="value">{totalSellValue}</div>
                        </div>
                        <div className="errorDiv">{formData.sellError}</div>
                        <input type="submit" className="sellButton" onClick={e=>validate(e)} value='Sell'></input>  
                    </form>
                </div>
            </div>
        )
    }
    catch{
        return(
            <div id="orderBox">
                Error Fetching Data
            </div>
        )
    }
}

const mapStateToProps = state => ({
    setCoin: state.setCoin.setCoin,
    profile: state.profile.profile
});

export default connect(mapStateToProps,{postTrade})(Order)
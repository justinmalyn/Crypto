import { COIN } from "./types";

export const loadCoins = () => async dispatch => {
    let url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD';
    //const api = '&api_key=1356ec2eb8ca2b8359f48ecb0f73ce63987787aa76703c11bba67b1e28bc1e76';
    //url=url+api;
    // let data = {};
    await fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => {
       // do stuff with responseJSON here...
        // data = {
        //     image: responseJSON.Data[0].RAW.USD.IMAGEURL,
        //     coinNameAbv: responseJSON.Data[0].CoinInfo.Name,
        //     coinName:responseJSON.Data[0].CoinInfo.FullName,
        //     openPrice: responseJSON.Data[0].RAW.USD.OPENDAY,
        //     currentPrice: responseJSON.Data[0].RAW.USD.PRICE,
        //     changePCT: responseJSON.Data[0].RAW.USD.CHANGEPCTDAY,
        //     mktCap: responseJSON.Data[0].RAW.USD.MKTCAP
        // }
        //console.log(responseJSON.Data)
        try{
            dispatch({
                type:COIN,
                payload:responseJSON.Data
            })
            //console.log(responseJSON.Data)
        }
        catch{
            console.log("hey you failed")
        }
    }); 
    url ='https://min-api.cryptocompare.com/data/pricemulti?&tsyms=usdt&e=binance&tryconversion=true&fsyms=BTC'
    await fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => {
        //console.log(responseJSON)
    })
}
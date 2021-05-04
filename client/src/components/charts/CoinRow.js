import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const CoinRow = ({ allCoins }) => {

    //JUSTIN Unsure if below is needed or not, will allCoins trigger a render
    //update if the data is called after component mount? seems to get stuck on 
    //loading occasionally without

    // const [coins, setCoins] = useState({allCoins})
    // useEffect(() => {
    //     setCoins(allCoins);
    // }, [allCoins]);

    let rows=[];
    try{
        rows = allCoins.map((coin, index) =>{
            let color="green";
            if(coin.RAW.USD.CHANGEPCTDAY<0){
                color="red";
            }
            return(
            <tr>
                <td>{index+1}</td>
                <td className="al">
                    <Link to={`/currencies/${coin.CoinInfo.Name}`}>
                        {coin.CoinInfo.FullName}
                    </Link>
                </td>
                <td className="al">{parseFloat(coin.RAW.USD.PRICE.toFixed(6))}</td>
                <td className="ar">{coin.RAW.USD.MKTCAP.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td className={color + " ar"}>{coin.RAW.USD.CHANGEPCTDAY.toFixed(2)}</td>
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

// CoinRow.propTypes = {
//     allCoins: PropTypes.array
// }

const mapStateToProps = state => ({
    allCoins: state.coin.allCoins
});

export default connect(mapStateToProps)(CoinRow)

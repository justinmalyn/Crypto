import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated, allCoins}) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    let rows=[];
    try{
        rows = allCoins.map((coin, index) =>{
            let color="green"
            if(coin.RAW.USD.CHANGEPCTDAY<0){
                color="red"
            }
            while(index<10){
                return(
                <tr className="lh-large">
                    <td className="al">
                        <Link to={`/currencies/${coin.CoinInfo.Name}`}>
                        {coin.CoinInfo.Name}
                        </Link>
                    </td>
                    <td className="secondary">{coin.CoinInfo.FullName}</td>
                    <td>{parseFloat(coin.RAW.USD.PRICE.toFixed(6))}</td>
                    <td className={color}>{coin.RAW.USD.CHANGEPCTDAY.toFixed(2)}</td>
                </tr>
                )
            }
        })
    }
    catch{
        return(
            <div>Loading</div>
        )
    }

    return (
        <section>
            <div className="landingHeader">
                <div id="leftHeader">
                <p className='lead'>
                    A place to practice cryptocurrency investment strategies.<br></br>
                    Sign up to begin trading 
                </p>
                <div className='buttons'>
                    <Link to='/register' className='btn btnLand'>
                        <button className="landingButton">
                            Sign Up
                        </button>
                    </Link>
                    <Link to='/login' className='btn'>
                        <button className="landingButton">
                            Login
                        </button>
                    </Link>
                </div>
                </div>
                <div id="rightHeader">
                    <p id="logo">
                        {/* Crypto <br></br>
                        Space */}
                    </p>
                </div>
            </div> 
            <table className='landing' cellSpacing='0'>
                <thead>
                    <tr className="landingTableHead">
                        <th className="al">Name</th>
                        <th></th>
                        <th className="al">Price</th>
                        <th className="al">24H Change</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr>
                        <td colspan='4' className="footer"><Link to='/charts' className='btn'>
                            View All
                        </Link></td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    allCoins: state.coin.allCoins,
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps)(Landing);
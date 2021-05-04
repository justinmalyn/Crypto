import React from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';

const Graph = ( { profileValue, profile, allCoins}) => {

    let startDate = profile.date.slice(0,10)
    let today = new Date;

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, month, day].join('-');
    }

    today = formatDate(today);
    
    let data = {
        labels: [startDate],
        datasets:[{
            label:"Account Value",
            backgroundColor:'rgba(230,230,230,.3)',
            borderColor:'#f3ba3f',
            data:[100000]
        }]
    }
    if(today!=startDate){
        data.labels.push(today)
        data.datasets[0].data.push(profileValue)
    }
    
    return (
        <Line
            data={data}
            options={{ maintainAspectRatio: false }}
        />
    )
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    profileValue: state.profile.profileValue,
    allCoins: state.coin.allCoins
});

export default connect(mapStateToProps)(Graph);
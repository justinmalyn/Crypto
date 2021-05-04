const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    GET api/profile
// @desc     Get current users profile
// @access   Private
router.get('/', auth, async(req,res) => {
    try {
        const user = await User.findOne({"_id":req.user.id})
        let email = user.email;
        const profile = await Profile.findOne({"email":email})
        res.json(profile);
        if(!profile){
            return res.status(400).json({errors:[{msg:"Can't find profile"}]})
        }
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/profile
// @desc     Post trade to current users profile, update USDT holdings
// @access   Private
router.post('/', auth, async(req, res) => {
    try{
        const user = await User.findOne({"_id":req.user.id})
        let email = user.email;
        const profile = await Profile.findOne({"email":email})
        const newTrade = {
            coin:req.body.coin,
            coinPrice:req.body.coinPrice,
            buyAmount:req.body.buyAmount,
            sellAmount:req.body.sellAmount
        }
        
        let newValue = profile.value
        //Update Assets buy 
        if(req.body.sellAmount === 0){
            newValue = newValue - req.body.coinPrice*req.body.buyAmount
            newValue = Number(newValue.toFixed(2))
            await profile.updateOne({"value":profile.value, "value":newValue})
            const newCoin = {
                coin:req.body.coin,
                amount:req.body.buyAmount
            }
            let asset = profile.assets.find(
                asset=>asset.coin === req.body.coin
            )
            if(asset===undefined){
                await profile.assets.unshift(newCoin)
            }
            else{
                for(let i = 0; i<profile.assets.length; i++){
                    if(profile.assets[i].coin===req.body.coin){
                        const updateCoin = {
                            coin:req.body.coin,
                            amount:Number(req.body.buyAmount)+Number(profile.assets[i].amount)
                        }
                        await profile.assets[i].remove();
                        await profile.updateOne({"assets":asset, "assets":[...profile.assets, updateCoin]})
                    }
                }
            }
            
        } 
        
        //Update Assets Sell
        else{
            newValue = newValue + req.body.coinPrice*req.body.sellAmount
            newValue = Number(newValue.toFixed(2))
            await profile.updateOne({"value":profile.value, "value":newValue})
            let asset = profile.assets.find(
                asset=>asset.coin === req.body.coin
            )
            for(let i = 0; i<profile.assets.length; i++){
                if(profile.assets[i].coin===req.body.coin){
                    const updateCoin = {
                        coin:req.body.coin,
                        amount:Number(profile.assets[i].amount)-Number(req.body.sellAmount)
                    }
                    await profile.assets[i].remove();
                    if(updateCoin.amount!=0){
                        await profile.updateOne({"assets":asset, "assets":[...profile.assets, updateCoin]})
                    }
                }
            }
        }
        
        profile.trades.unshift(newTrade)
        await profile.save()
        
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;
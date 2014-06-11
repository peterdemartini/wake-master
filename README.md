Wake Master ([http://wakemaster.io/](http://wakemaster.io/))
===========

An #IoT Alarm Clock powered by Skynet.im and the MEAN stack. An awesome way to build Alarm Clock powered by the internet.

## Installation

Create an account on [Wake Master](http://wakemaster.io/)

**OR**

Deploy this app yourself. We recommend Heroku.

1. Fork this repo
2. `git clone https://github.com/peterdemartini/wake-master.git`
3. `cd wake-master`
4. `npm install`
5. Customize `./config/config.js`
6. Create the file, `./env.json` to store the apps local environment variables which are listed below.
7. `grunt` - to run this application
8. `heroku create`
9. Set the environment variables listed below using `heroku config:set KEY=VAL`
10. `heroku addons:add mongohq`
11. `git push heroku master`

### Environment Variables:

    {
        "GITHUB_ID" : "", // GITHUB APP ID
        "GITHUB_SECRET" : "", // GITHUB APP SECRET
        "FACEBOOK_ID" : "", // FACEBOOK APP ID
        "FACEBOOK_SECRET" : "", // FACEBOOK APP SECRET
        "TWITTER_ID" : "", // TWITTER APP ID
        "TWITTER_SECRET" : "", // TWITTER APP SECRET
    }

## Alarm Clock

For these instructions we will be using the [Alarm Clock Five](http://shop.evilmadscientist.com/productsmenu/tinykitlist/447) but really you could use any alarm clock that you connect to Skynet.

1. Purchase [Alarm Clock Five](https://www.adafruit.com/products/620)
2. Build the clock following the [instructions](http://shop.emscdn.com/KitInstrux/alphaclock/alphaclockv.assy15.pdf)

**The rest of the instructions coming soon.**

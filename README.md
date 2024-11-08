# Pathfinder 2e Counteract Calculator

The counteract rules are probably the most confusing rules in Pathfinder 2e. This app was created to guide players on determining the success or failure of a counteract check. The tool will also explain in clear language how all of the calculations were made.  

## Counteract Rules and Inspiration

- The rules for Counteracting on [Archives of Nethys](https://2e.aonprd.com/Rules.aspx?ID=3280&Redirected=1)
- The [reddit post](https://www.reddit.com/r/Pathfinder2e/comments/13pyaky/a_visual_guide_to_counteract_checks/) that made the counteract rules click for me.

## Setup

- clone this repo
- cd into `counteract_calculator`
- run `npm i`
- run `npm run dev`

## Deploying on surge

### The easy way
- run `npm run deploy` 
- follow the surge prompts. 
- Use the randomly generated domain or enter a custom domain.
- If you want to speed this process up, in your root directory create a file named `CNAME` and add your new surge url.
- From now on, running the deploy script will automatically populate the surge url.

## The slightly more complicated way

- run `npm run build`
- once the build completes, cd in to `dist`
- run `mv index.html 200.html`. this is a weird quirk of surge where it doesn't look for `index.html`. You can find more info on this in the [surge docs]()
- run `surge`
- 
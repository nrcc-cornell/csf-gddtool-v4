# csf-gddtool-v4
Cornell CSF Growing degree day calculator V4 (uses ACIS)

Use a `.env` file to hold your Mapbox token while developing, but when you go to deploy make sure to change `this.token = process.env.REACT_APP_MAPBOX_TOKEN;` in `/src/components/ToolContents.js` to `this.token = "YOUR_TOKEN"` or the tool in Climate Smart Farming will be broken.
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
//import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const HelpMain = () => {
        return (
            <Box maxWidth={800} padding={1} border={1} borderRadius={4} borderColor="primary.main" bgcolor="#f5f5dc">
               <h2>Data Sources and methods</h2>
               <h4><br/>&bull; ABOUT THE GROWING DEGREE DAY CALCULATOR</h4>
               <p>
               This tool plots Growing Degree Days (GDD), also called Growing Degree Units (GDUs), which measure heat accumulation in order to predict plant and insect development. In a stress-free environment, the development rate of a plant is dependent on temperature. Using the expected temperature of the summer season, based on previous years, this tool can help predict the best days to plant, harvest, and fertilize.
               </p>
               <p>
               GDDs are calculated by taking the average of the daily maximum and minimum air temperature, and then subtracting a base temperature. The base temperature is the lowest temperature at which a crop will grow.
               </p>
               <h4><br/>&bull; COMMON BASE TEMPERATURES USED FOR GDD CALCULATION</h4>
               <p>
               50°F is the most common base for GDD calculations. However, a number of other bases are used depending on the lifecycle of the plant or insect of interest. Here is a small sample:
               </p>
               <ul>
               <i>Plants</i>
                   <li>50°F : corn, sorghum, soybeans, tomato</li>
                   <li>46°F : sunflower, potato</li>
                   <li>42°F : wheat, barley, rye, oats, flaxseed, lettuce, asparagus</li>
               </ul>
               <ul>
               <i>Insects and Diseases</i>
                   <li>52°F : Green Cloverworm</li>
                   <li>50°F : Codling moth, Apple maggot</li>
                   <li>48°F : Alfalfa weevil</li>
                   <li>45°F : Corn rootworm, Oriental fruit moth</li>
                   <li>43°F : Stalk Borer</li>
                   <li>40°F : Onion maggot</li>
                   <li>39°F : Cabbage maggot</li>
                   <li>32°F : Apple scab</li>
               </ul>
               <h4>&bull; AIR TEMPERATURE DATA</h4>
               <p>
               The 2.5 x 2.5 mile gridded dataset of maximum and minimum air temperatures is produced daily for the Northeast United States by the <a href="http://www.nrcc.cornell.edu" target="_blank" rel="noopener noreferrer">Northeast Regional Climate Center</a>, using methods described in Degaetano and Belcher (2007). These data are available for use through the Applied Climate Information System (<a href="http://www.rcc-acis.org" target="_blank" rel="noopener noreferrer">ACIS</a>) web service.
               </p>
               <p>
               Degaetano, A.T. and B.N. Belcher. (2007). Spatial Interpolation of Daily Maximum and Minimum Air Temperature Based on Meteorological Model Analyses and Independent Observations. Journal of Applied Meteorology and Climatology. 46.
               </p>
               <h4>&bull; FORECASTS AND OUTLOOKS</h4>
               <p>
               Six-day forecasts of daily temperature extremes obtained through the National Weather Service's National Digital Forecast Database (Glahn and Ruth, 2003) provide the means to produce 6-day GDD forecasts.
               </p>
               <p>
               Seasonal outlooks are produced based on historical observations over recent decades. Minimum, maximum and average observed GDD accumulation over previous seasons provide expected guidelines and reference points based on what has occurred at a specific location in the past. 
               </p>
               <p>
               Glahn, H. R., and D. P. Ruth, 2003: The new digital forecast database of the National Weather Service. Bull. Amer. Meteor. Soc., 84, 195–201.
               </p>
            </Box>
        );
} 

export {HelpMain};


## Simple app to download eod bhavcopy from nse and unzip it  
  
**install:**  

     npm i bhavcopy-downloader

 
 **Usage**:
 
     const bhav = require('bhavcopy-downloader');
     //simply running this will download all data for 2020
     bhav()
     //for specific year and months use
     bhav("YEAR",[Array OF MONTHS with FIRST three letters])
     //Default param are  year="2020",months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
       
**Data will be save in data folder**  
***Example-***  
To download all data for year 2020  

    bhav("2020")

To download specific months  
  

    bhav("2020",["FEB","MAR"])





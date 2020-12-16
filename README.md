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
       
***Data will be saved in data folder, note small wait is added to reduce server load***  

 ****If you need to load all downloaded data to any relational database look into https://github.com/ubermachine/Stock-database-creator****    
 

***Example-***  
To download all data for year 2020  

    bhav("2020")

To download specific months  
  

    bhav("2020",["FEB","MAR"])





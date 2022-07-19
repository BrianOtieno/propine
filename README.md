<p align="center">
  <h1 align="center">Propine Crypto CLI Application</h1>
A basic crypto command-line application
</p>

<!-- Shields -->
<p align="center">
<a rel="license" href="http://creativecommons.org/licenses/by/"><img src="https://badgen.net/badge/License/ MIT/green"/></a>
<img src="https://badgen.net/badge/Last%20Update/Jul%202022/green" /> 
<a href="https://github.com/BrianOtieno/propine" target="_blank">
  <img src="https://badgen.net/badge/Propine/CLI Application/purple"  alt="Node.js CLI Application"/>
</a> 
</p>

<p>
  <h2>Installation</h2>

Clone the repository and change working directory to the cloned repository. Run npm install to install the dependencies. To run the CLI application, just run npm propine.js
```
$ git clone git@github.com:BrianOtieno/propine.git
$ cd propine
$ cd npm i 
```
</p> 



<p>
  <h2>Using CLI Application</h2>

Use the flags eg --date=2017-07-16, --token=ETH or a combination of both: --date=2017-07-16 --token=ETH
```
$ node propine.js --token=ETH
```
![Propine CLI](/propine/images/propine.png) 
</p> 

 
<p>
  <h2>Design Decisions</h2>
The csv data is too large thus loading the data into memory for caching isn't feasible. Data can thus be read into chunks by user queried input.

The UI used chalk and figlet to enhance the visual experience for the users, giving a better UX.

The portfolio value by date is a filter of the sum of transactions for that portfolio until the defined date.
</p>
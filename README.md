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
git clone git@github.com:BrianOtieno/propine.git
cd propine
cd npm i 
```
</p> 

<p>
  <h2>Using CLI Application</h2>

Use the flags eg --date=2017-07-16, --token=ETH or a combination of both: --date=2017-07-16 --token=ETH
```
node propine.js --token=ETH
```
![Propine CLI](/propine/images/propine.png) 
</p> 

<p>
  <h3>Querying By Date</h3>

Example: 
```
node propine.js --date=2019-10-25

```

![Propine CLI](/propine/images/date.png) 
</p>

<p>
  <h3>Querying By Token And Date</h3>

Example: 
```
node propine.js --token=ETH --date=2019-10-25

```

![Propine CLI](/propine/images/tokenanddate.png) 
</p>

<p>
  <h3>Querying By Token</h3>

Example: 
```
node propine.js --token=ETH

```

![Propine CLI](/propine/images/token.png) 
</p>

<p>
  <h2>Design Decisions</h2>
The csv data is too large thus loading the data into memory for on a lower end devices wouldn't be feasible. Data can thus be read in chunks by row.

Introduced id column on the data. For some weird reason, timestamp column wouldn't import while on first column. Maintained the first 5000 records to keep the application fast. Also, included the last 5000 records to enhance queries. 

<strong>NB:</strong> This might affect the token data balance and return negative portfolio amount if data withdrawals outweighs deposits in the first 5000 selections by the difference in the last 5000 selections.

The UI uses chalk and figlet to enhance the visual experience for the users, giving a better UX.

The portfolio value by date is a filter of the sum of transactions for that portfolio until but not greater than the date date passed in the arguments.
</p>
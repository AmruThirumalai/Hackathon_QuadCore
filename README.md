# Hackathon_QuadCore
# we got this folks
# Success Story 1: https://www.youtube.com/watch?v=ZOc1snumoVw
# Success Story 2: https://www.youtube.com/watch?v=GNpDHh5ltuY

# API Code
import requests
import json
import prettytable
headers = {'Content-type': 'application/json'}
data = json.dumps({"seriesid": ['CUUR0000SA0','SUUR0000SA0'],"startyear":"2011", "endyear":"2014"})
p = requests.post('https://api.bls.gov/publicAPI/v2/timeseries/data/', data=data, headers=headers)
json_data = json.loads(p.text)
for series in json_data['Results']['series']:
    x=prettytable.PrettyTable(["series id","year","period","value","footnotes"])
    seriesId = series['seriesID']
    for item in series['data']:
        year = item['year']
        period = item['period']
        value = item['value']
        footnotes=""
        for footnote in item['footnotes']:
            if footnote:
                footnotes = footnotes + footnote['text'] + ','
        if 'M01' <= period <= 'M12':
            x.add_row([seriesId,year,period,value,footnotes[0:-1]])
    output = open(seriesId + '.txt','w')
    output.write (x.get_string())
    output.close()


# JavaScript API
const fetch = require('node-fetch');
const fs = require('fs');

const headers = { 'Content-Type': 'application/json' };
const data = JSON.stringify({
    seriesid: ['CUUR0000SA0', 'SUUR0000SA0'],
    startyear: '2011',
    endyear: '2014'
});

fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
    method: 'POST',
    headers: headers,
    body: data
})
.then(response => response.json())
.then(jsonData => {
    jsonData.Results.series.forEach(series => {
        const seriesId = series.seriesID;
        const tableData = [];
        
        series.data.forEach(item => {
            const year = item.year;
            const period = item.period;
            const value = item.value;
            let footnotes = item.footnotes.map(fn => fn?.text).filter(Boolean).join(', ');
            
            if (period.startsWith('M')) {
                tableData.push({ 'Series ID': seriesId, 'Year': year, 'Period': period, 'Value': value, 'Footnotes': footnotes });
            }
        });
        
        console.table(tableData);
        fs.writeFileSync(`${seriesId}.txt`, JSON.stringify(tableData, null, 2));
    });
})
.catch(error => console.error('Error:', error));

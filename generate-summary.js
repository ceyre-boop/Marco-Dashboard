const fs = require('fs');
const path = require('path');

// Paths to CSV files
const shopCsvPath = '/Users/taboost/Documents/TABOOST- SHOP/taboost-shop-app/TABOOST_Platfrom-main/data/shop/shop-current.csv';
const liveCsvPath = '/Users/taboost/Documents/TABOOST- SHOP/taboost-shop-app/TABOOST_Platfrom-main/data/Live_Data_-_Current.csv';

// Parser function for CSV lines with quotes
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

// Cleaner for numbers
function cleanPrice(val) {
    if (!val) return 0;
    // Remove $, commas, quotes, spaces
    return parseFloat(val.replace(/[$, "]/g, '').trim()) || 0;
}

// Processing Shop CSV
let totalGmv = 0;
let shopCreators = 0;
let shopMap = new Map();

try {
    const shopData = fs.readFileSync(shopCsvPath, 'utf8');
    const lines = shopData.split('\n');
    for (let i = 1; i < lines.length; i++) {
        const cols = parseCSVLine(lines[i]);
        if (cols.length < 13) continue;
        const gmv = cleanPrice(cols[12]); // Total GMV is index 12
        const name = cols[0]; // Name is index 0
        if (gmv > 0) {
            totalGmv += gmv;
            shopCreators++;
            shopMap.set(name, (shopMap.get(name) || 0) + gmv);
        }
    }
} catch (e) {
    console.error('Error reading shop CSV:', e.message);
}

// Processing Live CSV
let totalLiveRev = 0; 
let liveCreators = 0;
let liveMap = new Map();

try {
    const liveData = fs.readFileSync(liveCsvPath, 'utf8');
    const lines = liveData.split('\n');
    for (let i = 1; i < lines.length; i++) {
        const cols = parseCSVLine(lines[i]);
        if (cols.length < 20) continue;
        const diamonds = cleanPrice(cols[19]); // 💎 is index 19
        const name = cols[2]; // Username is index 2
        if (diamonds > 0) {
            // Conversion: 1,000,000 diamonds approx $5,000 USD (common TikTok rate is $0.005 per coin/diamond)
            const usd = diamonds * 0.005; 
            totalLiveRev += usd;
            liveCreators++;
            liveMap.set(name, (liveMap.get(name) || 0) + usd);
        }
    }
} catch (e) {
    console.error('Error reading live CSV:', e.message);
}

// Find Top Creator
let topCreatorName = 'None';
let maxRev = 0;
const allNames = new Set([...shopMap.keys(), ...liveMap.keys()]);

allNames.forEach(name => {
    const total = (shopMap.get(name) || 0) + (liveMap.get(name) || 0);
    if (total > maxRev) {
        maxRev = total;
        topCreatorName = name;
    }
});

const topCreatorData = {
    name: topCreatorName,
    handle: '@' + topCreatorName.toLowerCase().replace(/\s+/g, ''),
    gmv: Math.round((shopMap.get(topCreatorName) || 0) / 1000) + 'k',
    live: Math.round((liveMap.get(topCreatorName) || 0) / 1000) + 'k'
};

// Summary Data object
const summary = {
    gmv: '$' + (totalGmv / 1000000).toFixed(2) + 'M',
    live: '$' + (totalLiveRev / 1000).toFixed(0) + 'k',
    creators: (liveCreators + shopCreators),
    commissions: '$' + (totalGmv * 0.1 / 1000).toFixed(0) + 'k',
    topCreator: topCreatorData,
    lastUpdated: new Date().toLocaleString()
};

const output = `const summaryData = ${JSON.stringify(summary, null, 2)};
document.getElementById('total-gmv').innerText = summaryData.gmv;
document.getElementById('total-live').innerText = summaryData.live;
document.getElementById('creator-count').innerText = summaryData.creators;
document.getElementById('total-commissions').innerText = summaryData.commissions;
document.getElementById('top-creator-name').innerText = summaryData.topCreator.name;
document.getElementById('top-creator-handle').innerText = summaryData.topCreator.handle;
document.getElementById('top-gmv').innerText = summaryData.topCreator.gmv.replace('k', '');
document.getElementById('top-live').innerText = summaryData.topCreator.live.replace('k', '');
document.getElementById('sync-time').innerText = 'Last updated: ' + summaryData.lastUpdated;
`;

const jsDir = '/Users/taboost/Documents/TABOOST- SHOP/marco-dashboard/js';
if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir);

fs.writeFileSync(path.join(jsDir, 'summary.js'), output);
console.log('Successfully updated summary.js with live data.');
console.log('Total GMV:', summary.gmv);
console.log('Total LIVE:', summary.live);
console.log('Top Creator:', summary.topCreator.name);

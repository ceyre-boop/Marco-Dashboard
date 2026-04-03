const summaryData = {
  "gmv": "$8.95M",
  "live": "$154k",
  "creators": 588,
  "commissions": "$895k",
  "topCreator": {
    "name": "Allee Baray",
    "handle": "@alleebaray",
    "gmv": "422k",
    "live": "0k"
  },
  "lastUpdated": "4/2/2026, 8:58:53 PM"
};
document.getElementById('total-gmv').innerText = summaryData.gmv;
document.getElementById('total-live').innerText = summaryData.live;
document.getElementById('creator-count').innerText = summaryData.creators;
document.getElementById('total-commissions').innerText = summaryData.commissions;
document.getElementById('top-creator-name').innerText = summaryData.topCreator.name;
document.getElementById('top-creator-handle').innerText = summaryData.topCreator.handle;
document.getElementById('top-gmv').innerText = summaryData.topCreator.gmv.replace('k', '');
document.getElementById('top-live').innerText = summaryData.topCreator.live.replace('k', '');
document.getElementById('sync-time').innerText = 'Last updated: ' + summaryData.lastUpdated;

const API_BASE = window.TABOOST_CONFIG.STITCH_API_BASE_URL;

async function fetchStitchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (e) {
        console.error(`Error fetching from ${endpoint}:`, e);
        return null;
    }
}

// Map endpoints
window.StitchAPI = {
    getKpiSnapshot: () => fetchStitchData('/kpi_snapshot'),
    getRevenueTrend: () => fetchStitchData('/revenue_trend'),
    getManagerPerformance: () => fetchStitchData('/manager_performance'),
    getShopLeaderboards: () => fetchStitchData('/shop_leaderboards'),
    getShopCreators: () => fetchStitchData('/shop_creators_current'),
    getTapProducts: () => fetchStitchData('/tap_products'),
    getLiveCreatorsUS: () => fetchStitchData('/live_creators_us'),
    getLiveCreatorsUK: () => fetchStitchData('/live_creators_uk'),
    getLiveRewards: () => fetchStitchData('/live_rewards'),
    getCreatorAlerts: () => fetchStitchData('/creator_alerts'),
    getAiInsights: () => fetchStitchData('/ai_insights'),
    getCeoReports: () => fetchStitchData('/ceo_reports'),
    getMilestoneLog: () => fetchStitchData('/milestone_log')
};

// Polling configuration
const POLL_INTERVAL = 15 * 60 * 1000; // 15 minutes

function updateLastSyncedUI() {
    const timeElements = document.querySelectorAll('.last-synced');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeElements.forEach(el => {
        el.innerText = `Last synced: ${now}`;
    });
}
window.StitchAPI.updateLastSyncedUI = updateLastSyncedUI;

function startAutoRefresh(callback) {
    // Initial fetch
    callback();
    updateLastSyncedUI();
    
    // Setup interval
    setInterval(() => {
        callback();
        updateLastSyncedUI();
    }, POLL_INTERVAL);
}
window.StitchAPI.startAutoRefresh = startAutoRefresh;

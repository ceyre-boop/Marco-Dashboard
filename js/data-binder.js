document.addEventListener('DOMContentLoaded', () => {
    // Utility to create loading shimmers
    function setShimmer(elementId, widthClass = 'w-16') {
        const el = document.getElementById(elementId);
        if (el) {
            el.innerHTML = `<div class="h-6 bg-gray-200 rounded animate-pulse ${widthClass} inline-block"></div>`;
        }
    }

    // Utility to set final values
    function setValue(elementId, value) {
        const el = document.getElementById(elementId);
        if (el && value !== undefined) {
            el.innerHTML = value;
        }
    }

    async function loadDashboardData() {
        console.log("Initiating Stitch API fetch...");
        
        // 1. Initial Shimmer State
        const idsToShimmer = ['total-gmv', 'total-live', 'creator-count', 'total-commissions', 'top-creator-name', 'top-creator-handle', 'top-gmv', 'top-live'];
        idsToShimmer.forEach(id => setShimmer(id));

        try {
            // 2. Fetch from Phase 2 Stitch API
            const kpi = await window.StitchAPI.getKpiSnapshot();
            
            // If the endpoint fails (CORS, Missing Auth, 404), throw error to trigger graceful local fallback
            if (!kpi || kpi.error || Object.keys(kpi).length === 0) {
                throw new Error("Stitch API not fully accessible or returned empty payload");
            }

            // 3. Map Data to DOM 
            setValue('total-gmv', kpi.total_gmv || kpi.shop_gmv);
            setValue('total-live', kpi.total_live || kpi.live_revenue);
            setValue('creator-count', kpi.creator_count);
            setValue('total-commissions', kpi.commissions);
            
            if(kpi.top_creator) {
                setValue('top-creator-name', kpi.top_creator.name);
                setValue('top-creator-handle', kpi.top_creator.handle);
                setValue('top-gmv', kpi.top_creator.gmv);
                setValue('top-live', kpi.top_creator.live);
            }

        } catch (e) {
            console.warn("⚠️ Stitch connection warning:", e.message);
            console.log("Fallback: Loading from local CSV extraction (js/summary.js)");
            
            // Fallback since N8N / Stitch Postgres might not be completely wired to the live schema yet
            if (typeof summaryData !== 'undefined') {
                setValue('total-gmv', summaryData.gmv);
                setValue('total-live', summaryData.live);
                setValue('creator-count', summaryData.creators);
                setValue('total-commissions', summaryData.commissions);
                setValue('top-creator-name', summaryData.topCreator.name);
                setValue('top-creator-handle', summaryData.topCreator.handle);
                setValue('top-gmv', summaryData.topCreator.gmv.replace('k', ''));
                setValue('top-live', summaryData.topCreator.live.replace('k', ''));
            } else {
                console.error("No local fallback data available.");
                idsToShimmer.forEach(id => setValue(id, 'N/A'));
            }
        }
    }

    // Phase 2: Start auto-refresh polling loop (15 minutes config)
    if (window.StitchAPI && window.StitchAPI.startAutoRefresh) {
        window.StitchAPI.startAutoRefresh(loadDashboardData);
    } else {
        loadDashboardData();
    }
});

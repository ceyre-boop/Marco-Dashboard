document.addEventListener('DOMContentLoaded', async () => {
    // 1. Revenue Trend Line Chart on index.html
    const revenueCtx = document.getElementById('revenueTrendChart');
    if (revenueCtx) {
        let chartLabels = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
        let shopData = [1.2, 1.5, 2.1, 4.5, 5.2, 7.8, 8.95];
        let liveData = [0.05, 0.08, 0.09, 0.1, 0.12, 0.14, 0.154];

        // Attempt to fetch from Stitch API
        if (window.StitchAPI) {
            try {
                const trend = await window.StitchAPI.getRevenueTrend();
                if (trend && !trend.error && trend.labels) {
                    chartLabels = trend.labels;
                    shopData = trend.shopData;
                    liveData = trend.liveData;
                }
            } catch(e) {
                console.warn("Trend data using local fallback.", e.message);
            }
        }

        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Shop GMV (M)',
                        data: shopData,
                        borderColor: '#E91E63',
                        backgroundColor: 'rgba(233, 30, 99, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                    },
                    {
                        label: 'LIVE Revenue (M)',
                        data: liveData,
                        borderColor: '#4B5563',
                        borderDash: [5, 5],
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 8,
                            font: { family: 'Inter', size: 10, weight: 'bold' }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Inter', size: 10, weight: 'bold' } }
                    },
                    y: {
                        grid: { color: '#f3f4f6' },
                        ticks: {
                            font: { family: 'Inter', size: 10 },
                            callback: function(value) { return '$' + value + 'M'; }
                        }
                    }
                }
            }
        });
    }
});

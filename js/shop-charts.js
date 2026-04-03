document.addEventListener('DOMContentLoaded', () => {
    // Top 15 Stacked Bar Chart
    const stackedCtx = document.getElementById('shopStackedChart');
    if (stackedCtx) {
        new Chart(stackedCtx, {
            type: 'bar',
            data: {
                labels: ['Allee B', 'Sophia L', 'Emma W', 'Sarah G', 'Mya K', 'Alex T', 'Jenna M', 'Sam S'],
                datasets: [
                    {
                        label: 'TaP GMV',
                        data: [422, 385, 310, 280, 215, 190, 160, 140],
                        backgroundColor: '#E91E63',
                        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 4, bottomRight: 4 }
                    },
                    {
                        label: 'LIVE GMV',
                        data: [45, 60, 20, 15, 65, 80, 10, 20],
                        backgroundColor: '#4B5563',
                        borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 }
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        grid: { display: false },
                        ticks: { font: { family: 'Inter', size: 9, weight: 'bold' } }
                    },
                    y: {
                        stacked: true,
                        grid: { color: '#f3f4f6' },
                        ticks: {
                            font: { family: 'Inter', size: 9 },
                            callback: function(value) { return '$' + value + 'k'; }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true, boxWidth: 6, font: { family: 'Inter', size: 10, weight: 'bold' } }
                    }
                }
            }
        });
    }

    // Commission Breakdown Donut Chart
    const donutCtx = document.getElementById('commissionDonutChart');
    if (donutCtx) {
        new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Creator Comm. (15%)', 'Agency Fee (5%)', 'TikTok Fee (5%)'],
                datasets: [{
                    data: [1342500, 447500, 447500],
                    backgroundColor: ['#E91E63', '#1F2937', '#9CA3AF'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, boxWidth: 6, font: { family: 'Inter', size: 9, weight: 'bold' } }
                    }
                }
            }
        });
    }
});

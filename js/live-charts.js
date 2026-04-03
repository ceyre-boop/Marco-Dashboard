document.addEventListener('DOMContentLoaded', () => {
    // Efficiency Scatter Plot (Hours vs Diamonds)
    const scatterCtx = document.getElementById('efficiencyScatterChart');
    if (scatterCtx) {
        new Chart(scatterCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Creators (US/UK)',
                    data: [
                        {x: 10, y: 5}, {x: 20, y: 15}, {x: 30, y: 35}, {x: 40, y: 40},
                        {x: 50, y: 80}, {x: 60, y: 65}, {x: 70, y: 120}, {x: 80, y: 95},
                        {x: 15, y: 8}, {x: 35, y: 42}, {x: 55, y: 70}, {x: 85, y: 150}
                    ],
                    backgroundColor: 'rgba(79, 70, 229, 0.6)', // Indigo for LIVE aesthetics
                    borderColor: '#4F46E5',
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: { display: true, text: 'Hours Streamed', font: { family: 'Inter', size: 10, weight: 'bold' } },
                        grid: { color: '#f3f4f6' }
                    },
                    y: {
                        title: { display: true, text: 'Diamonds (k)', font: { family: 'Inter', size: 10, weight: 'bold' } },
                        grid: { color: '#f3f4f6' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Tier Progression Bar Chart
    const barCtx = document.getElementById('tierProgressBarChart');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Tier 1', 'Tier 2', 'Tier 3', 'Elite', 'Global'],
                datasets: [{
                    label: 'Creators per Tier',
                    data: [420, 310, 150, 45, 12],
                    backgroundColor: ['#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8', '#4F46E5'],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Inter', size: 10, weight: 'bold' } }
                    },
                    y: {
                        grid: { color: '#f3f4f6' },
                        ticks: { font: { family: 'Inter', size: 10 } }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
});

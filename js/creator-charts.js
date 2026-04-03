document.addEventListener('DOMContentLoaded', () => {
    // Shared options for sparklines (no grid, no axes, no tooltip)
    const sparklineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
            x: { display: false },
            y: { display: false, min: 0 }
        },
        elements: {
            line: { tension: 0.4 },
            point: { radius: 0, hitRadius: 10, hoverRadius: 4 }
        }
    };

    // Allee Baray Sparkline
    const ctx1 = document.getElementById('sparkline1');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar'],
                datasets: [{
                    data: [65, 80, 94],
                    borderColor: '#E91E63',
                    borderWidth: 2,
                    backgroundColor: 'rgba(233, 30, 99, 0.1)',
                    fill: true
                }]
            },
            options: sparklineOptions
        });
    }

    // Sophia Lee Sparkline
    const ctx2 = document.getElementById('sparkline2');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar'],
                datasets: [{
                    data: [70, 75, 88],
                    borderColor: '#4F46E5',
                    borderWidth: 2,
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true
                }]
            },
            options: sparklineOptions
        });
    }
});

class CommandCenter {
    constructor() {
        this.webhooks = window.TABOOST_CONFIG.N8N_WEBHOOKS;
    }

    async triggerWebhook(buttonElement, webhookUrl, payload = {}) {
        const originalContent = buttonElement.innerHTML;
        
        // Disable button and show spinner
        buttonElement.disabled = true;
        buttonElement.innerHTML = `<span class="material-symbols-outlined text-sm animate-spin">progress_activity</span>`;

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                buttonElement.innerHTML = `✅ Report generating — check your email in a few minutes`;
                buttonElement.classList.add('bg-green-100', 'text-green-800');
                buttonElement.classList.remove('bg-[#E91E63]', 'text-white');
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Webhook error:', error);
            buttonElement.innerHTML = `❌ Something went wrong — try again`;
            buttonElement.classList.add('bg-red-100', 'text-red-800');
            buttonElement.classList.remove('bg-[#E91E63]', 'text-white');
            
            // Reset after 3 seconds on failure
            setTimeout(() => {
                buttonElement.disabled = false;
                buttonElement.innerHTML = originalContent;
                buttonElement.classList.remove('bg-red-100', 'text-red-800');
                buttonElement.classList.add('bg-[#E91E63]', 'text-white');
            }, 3000);
        }
    }

    init() {
        const fridayBtn = document.getElementById('btn-friday-wrap');
        const mondayBtn = document.getElementById('btn-monday-briefing');
        const manualBtn = document.getElementById('btn-manual-report');
        const loggerInput = document.getElementById('input-brand-logger');
        const loggerBtn = document.getElementById('btn-brand-logger');

        if (fridayBtn) {
            fridayBtn.addEventListener('click', () => this.triggerWebhook(fridayBtn, this.webhooks.FRIDAY_WRAP));
        }

        if (mondayBtn) {
            mondayBtn.addEventListener('click', () => this.triggerWebhook(mondayBtn, this.webhooks.MONDAY_BRIEFING));
        }

        if (manualBtn) {
            manualBtn.addEventListener('click', () => this.triggerWebhook(manualBtn, this.webhooks.MANUAL_REPORT));
        }

        if (loggerBtn && loggerInput) {
            loggerBtn.addEventListener('click', () => {
                const text = loggerInput.value.trim();
                if (text) {
                    // Pre-confirmation preview would go here
                    if(confirm(`Send to Brand Deal Logger?\n\n"${text}"`)) {
                        this.triggerWebhook(loggerBtn, this.webhooks.LOGGER, { text });
                        loggerInput.value = '';
                    }
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.TaboostCommandCenter = new CommandCenter();
    window.TaboostCommandCenter.init();
});

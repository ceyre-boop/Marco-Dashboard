window.TABOOST_CONFIG = {
    // Phase 2: Data API
    STITCH_API_BASE_URL: 'https://api.stitch.withgoogle.com/v1/projects/2429591476405611189',
    
    // Phase 3: n8n Webhooks
    N8N_WEBHOOKS: {
        FRIDAY_WRAP: 'https://taboost.app.n8n.cloud/webhook-test/stitch-sync',
        MONDAY_BRIEFING: 'https://taboost.app.n8n.cloud/webhook-test/stitch-sync',
        MANUAL_REPORT: 'https://taboost.app.n8n.cloud/webhook-test/stitch-sync',
        LOGGER: 'https://taboost.app.n8n.cloud/webhook-test/stitch-sync'
    },
    
    // Phase 4: Environment Variables
    FIREBASE_AUTH_REDIRECT: 'https://your-project-id.firebaseapp.com/__/auth/handler',
    GPT_MODEL: 'gpt-5',
    OPENAI_PROXY: null
};

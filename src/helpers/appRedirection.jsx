export function redirectToAppStore() {
    const appStoreUrl = 'https://apps.apple.com/in/app/farm2bag-com/id6449624498';
    window.location.href = appStoreUrl;
}

export function redirectToPlayStore() {
    const packageName = 'com.farm2bag';
    const playStoreUrl = `https://play.google.com/store/apps/details?id=${packageName}&pcampaignid=web_share`;
    window.location.href = playStoreUrl;
}

import https from 'https';

export async function fetchWikipediaSummary(lang: string = 'he'): Promise<string> {
    return new Promise((resolve) => {
        // Fallback default language map in case the user specified language code is slightly off
        const langCodeMap: Record<string, string> = {
            'en': 'en', 'he': 'he', 'fr': 'fr', 'zh': 'zh',
            'it': 'it', 'de': 'de', 'ja': 'ja', 'ar': 'ar', 'es': 'es'
        };
        const wikiLang = langCodeMap[lang.toLowerCase()] || 'en';

        // Use Wikipedia REST API to fetch a random article summary
        const url = `https://${wikiLang}.wikipedia.org/api/rest_v1/page/random/summary`;

        https.get(url, {
            headers: {
                'User-Agent': 'SentiSynth-CLI/1.0 (Integration/Synthetic Data Gen)'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        resolve(parsed.extract || parsed.description || parsed.title || 'Summary not found.');
                    } catch (e) {
                        resolve('Information not available at this time.');
                    }
                } else if (res.statusCode === 429) {
                    resolve('Wikipedia rate limit exceeded. Generating alternative synthetic text.');
                } else {
                    resolve('Wikipedia summary unavailable.');
                }
            });
        }).on('error', () => {
            resolve('Wikipedia service unreachable. Check network connection.');
        });
    });
}

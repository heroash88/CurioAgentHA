import type {
    CardEvent,
    WeatherCardData,
    TimerCardData,
    CalculationCardData,
    YouTubeCardData,
    ImageCardData,
    SportsScoreCardData,
    RecipeCardData,
    NewsCardData,
    DefinitionCardData,
    TranslationCardData,
    FunFactCardData,
    QuoteCardData,
    ListCardData,
    StopwatchCardData,
} from './cardTypes';

/**
 * Analyze AI transcript text and produce a CardEvent if card-worthy content is detected.
 * Pure function. Returns at most one event per call.
 */
export function analyzeTranscript(text: string, turnHadToolCall: boolean = false): CardEvent | null {
    if (turnHadToolCall || !text || text.trim().length < 5) return null;

    // CLOSE_CARDS — global signal to hide all active cards
    if (/CLOSE_CARDS/i.test(text)) {
        return { type: 'close_all', data: {} };
    }

    const normalized = text.toLowerCase();

    // Priority order: timer/alarm → weather → calculation → reminder
    const timer = detectTimer(normalized, text);
    if (timer) return timer;

    const stopwatch = detectStopwatch(normalized);
    if (stopwatch) return stopwatch;

    const weather = detectWeather(normalized, text);
    if (weather) return weather;

    const calc = detectCalculation(text);
    if (calc) return calc;

    // Extended priority: youtube → image → sportsScore → recipe → news → definition → translation → funFact → quote → list
    const youtube = detectYouTube(normalized, text);
    if (youtube) return youtube;

    const image = detectImage(normalized, text);
    if (image) return image;

    const sportsScore = detectSportsScore(normalized, text);
    if (sportsScore) return sportsScore;

    const recipe = detectRecipe(normalized, text);
    if (recipe) return recipe;

    const news = detectNews(normalized, text);
    if (news) return news;

    const definition = detectDefinition(normalized, text);
    if (definition) return definition;

    const translation = detectTranslation(normalized, text);
    if (translation) return translation;

    const funFact = detectFunFact(normalized, text);
    if (funFact) return funFact;

    const quote = detectQuote(normalized, text);
    if (quote) return quote;

    const list = detectList(normalized, text);
    if (list) return list;

    const smartHome = detectSmartHome(normalized);
    if (smartHome) return smartHome;

    return null;
}

/**
 * Async analysis — handles tokens that require network fetches (e.g. IMAGE_SEARCH).
 * Call after analyzeTranscript (synchronous detectors) when the turn is complete.
 */
export async function analyzeTranscriptAsync(
    text: string
): Promise<CardEvent | null> {
    if (!text) return null;

    // IMAGE_SEARCH: <query> — uses Google Custom Search API with configured CX (or the current default).
    const imageSearchMatch = text.match(/IMAGE_SEARCH:\s*(.+?)(?:\n|$)/i);
    
    if (imageSearchMatch) {
        const query = imageSearchMatch[1].trim();

        // --- WIKIPEDIA FETCH ---
        console.log('[ImageSearch] Attempting Wikipedia fetch for query: ' + query);
        try {
            const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(query.replace(/\s+/g, '_'));
            const res = await fetch(url);
            
            if (res.ok) {
                const json = await res.json();
                if (json.thumbnail && json.thumbnail.source) {
                    const shortCaption = json.extract 
                        ? (json.extract.length > 150 ? json.extract.substring(0, 150) + '...' : json.extract)
                        : query;
                        
                    return {
                        type: 'image',
                        data: { imageUrl: json.thumbnail.source, caption: shortCaption } as unknown as Record<string, unknown>,
                        autoDismissMs: 12000,
                    };
                } else {
                    console.warn(`[ImageSearch] Wikipedia article found but no thumbnail: ${query}`);
                }
            } else {
                console.warn(`[ImageSearch] Wikipedia returned ${res.status} for query: ${query}`);
            }
        } catch (err) {
            console.warn('[ImageSearch] Wikipedia fetch error:', err);
        }
    }

    return null;
}

function detectTimer(normalized: string, original: string): CardEvent | null {
    // Match patterns like "set a 5 minute timer", "timer for 10 minutes", "alarm for 7 AM"
    const timerDurationPattern = /(?:set(?:ting)?|start(?:ing)?|creat(?:e|ing))\s+(?:a\s+)?(\d+)\s*(second|minute|hour|min|sec|hr)s?\s*(?:timer|countdown)/i;
    const timerForPattern = /timer\s+(?:for\s+)?(\d+)\s*(second|minute|hour|min|sec|hr)s?/i;
    const alarmPattern = /alarm\s+(?:for\s+)?(\d{1,2}):?(\d{2})?\s*(am|pm)?/i;
    const namedTimerPattern = /(?:called|named|labeled)\s+["""]?([^"""]+)["""]?/i;

    let duration = 0;
    let isAlarm = false;
    let label = '';

    const durationMatch = original.match(timerDurationPattern) || original.match(timerForPattern);
    if (durationMatch) {
        const amount = parseInt(durationMatch[1], 10);
        const unit = durationMatch[2].toLowerCase();
        if (unit.startsWith('sec')) duration = amount * 1000;
        else if (unit.startsWith('min')) duration = amount * 60 * 1000;
        else if (unit.startsWith('hr') || unit.startsWith('hour')) duration = amount * 3600 * 1000;
        label = `${amount} ${unit} timer`;
    }

    const alarmMatch = original.match(alarmPattern);
    if (alarmMatch && !durationMatch) {
        isAlarm = true;
        let hours = parseInt(alarmMatch[1], 10);
        const minutes = alarmMatch[2] ? parseInt(alarmMatch[2], 10) : 0;
        const ampm = alarmMatch[3]?.toLowerCase();
        if (ampm === 'pm' && hours < 12) hours += 12;
        if (ampm === 'am' && hours === 12) hours = 0;

        const now = new Date();
        const target = new Date(now);
        target.setHours(hours, minutes, 0, 0);
        if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1);
        duration = target.getTime() - now.getTime();
        label = `Alarm ${alarmMatch[1]}:${(minutes).toString().padStart(2, '0')} ${ampm || ''}`.trim();
    }

    if (duration <= 0 && !isAlarm) {
        // Direct command fallback: "set a timer", "start a timer" (default 5 min if not specified?)
        // Or just return a placeholder if we want the UI to prompt for duration.
        // For now, let's handle "set a [number] minute timer" which is already handled above.
        // If they just say "start timer", we can default to 5 minutes.
        if (normalized.includes('start timer') || normalized.includes('set timer')) {
            duration = 5 * 60 * 1000;
            label = '5 Minute Timer';
        } else {
            return null;
        }
    }

    const nameMatch = original.match(namedTimerPattern);
    if (nameMatch) label = nameMatch[1].trim();

    const targetTime = Date.now() + duration;
    const data: TimerCardData = {
        label,
        isAlarm,
        targetTime,
        duration,
        completionState: 'running',
    };

    return {
        type: 'timer',
        data: data as unknown as Record<string, unknown>,
        persistent: true,
    };
}

function detectStopwatch(normalized: string): CardEvent | null {
    const keywords = ['stopwatch', 'count up', 'count upward', 'elapsed timer'];
    const hasKeyword = keywords.some(kw => normalized.includes(kw));
    if (!hasKeyword) return null;

    // Must NOT match when a parseable duration value is present (timer detection handles those)
    const hasDuration = /\d+\s*(second|minute|hour|min|sec|hr)s?/i.test(normalized);
    if (hasDuration) return null;

    const data: StopwatchCardData = {
        startTime: Date.now(),
        pausedElapsed: 0,
        running: true,
    };

    return {
        type: 'stopwatch',
        data: data as unknown as Record<string, unknown>,
        persistent: true,
    };
}

function detectWeather(normalized: string, original: string): CardEvent | null {
    // Exclude cooking/recipe context — "bake at 400 degrees" is NOT weather
    const cookingExclusions = ['bake', 'cook', 'oven', 'preheat', 'recipe', 'ingredient', 'minutes', 'chicken', 'beef', 'pasta', 'sauce', 'garlic', 'olive oil'];
    if (cookingExclusions.some(kw => normalized.includes(kw))) return null;

    // Require actual weather-specific keywords (not just "degrees" which is too generic)
    const weatherKeywords = ['weather', 'forecast', 'sunny', 'cloudy', 'rainy', 'rain', 'snow', 'wind', 'humidity', 'clear sky', 'overcast', 'partly cloudy'];
    const hasWeatherKeyword = weatherKeywords.some(kw => normalized.includes(kw));
    // Also accept "temperature" + "outside/today/tonight/tomorrow" as weather context
    const hasTempContext = normalized.includes('temperature') && /outside|today|tonight|tomorrow|currently|right now/.test(normalized);
    if (!hasWeatherKeyword && !hasTempContext) return null;

    // Detect if user is asking about future weather / forecast
    const forecastKeywords = ['forecast', 'next few days', 'this week', 'week ahead', 'upcoming days', 'next 5 days', 'next five days', '5 day', '5-day', 'tomorrow', 'next week'];
    const isForecast = forecastKeywords.some(kw => normalized.includes(kw));

    // Try to extract temperature — must be a reasonable weather temp (not 400°F oven temp)
    const tempMatch = original.match(/(-?\d{1,3})\s*°?\s*(F|C|fahrenheit|celsius)?/i);
    
    let temperature = 72; // Default for offline if no temp found
    let unit: 'F' | 'C' = 'F';

    if (tempMatch) {
        temperature = parseInt(tempMatch[1], 10);
        // Reject unreasonable weather temperatures (below -60 or after 140°F / 60°C)
        if (temperature > 140 || temperature < -60) return null;
        unit = (tempMatch[2]?.toUpperCase().startsWith('C') ? 'C' : 'F') as 'F' | 'C';
    }

    let condition = 'clear';
    if (normalized.includes('rain') || normalized.includes('shower')) condition = 'rain';
    else if (normalized.includes('snow') || normalized.includes('sleet')) condition = 'snow';
    else if (normalized.includes('cloud') || normalized.includes('overcast')) condition = 'cloudy';
    else if (normalized.includes('sun') || normalized.includes('clear')) condition = 'clear';
    else if (normalized.includes('storm') || normalized.includes('thunder')) condition = 'storm';
    else if (normalized.includes('fog') || normalized.includes('mist')) condition = 'fog';

    // Extract humidity if mentioned
    const humidityMatch = original.match(/humidity\s*(?:is|of|at|:)?\s*(\d{1,3})\s*%/i);
    const humidity = humidityMatch ? parseInt(humidityMatch[1], 10) : undefined;

    const highLowMatch = original.match(/high\s+(?:of\s+)?(-?\d{1,3}).*?low\s+(?:of\s+)?(-?\d{1,3})/i)
        || original.match(/(-?\d{1,3})\s*\/\s*(-?\d{1,3})/);
    const high = highLowMatch ? parseInt(highLowMatch[1], 10) : temperature + 5;
    const low = highLowMatch ? parseInt(highLowMatch[2], 10) : temperature - 5;

    // Try to extract location
    const locationMatch = original.match(/weather\s+(?:in|for|at)\s+([A-Z][a-zA-Z\s]+?)(?:\.|\?|,|!|$)/i);
    const location = locationMatch ? locationMatch[1].trim() : undefined;

    const data: WeatherCardData = { temperature, condition, high, low, unit, humidity, forecastMode: isForecast, location };
    return {
        type: 'weather',
        data: data as unknown as Record<string, unknown>,
        autoDismissMs: isForecast ? 25000 : undefined, // longer dismiss for forecast cards
    };
}

function detectCalculation(original: string): CardEvent | null {
    // Match patterns like "5 + 3 = 8", "the answer is 42", "equals 100"
    const equationMatch = original.match(/(\d[\d\s+\-*/×÷().^]+\d)\s*(?:=|equals|is)\s*(-?[\d,.]+)/);
    if (!equationMatch) return null;

    const data: CalculationCardData = {
        equation: equationMatch[1].trim(),
        result: equationMatch[2].trim(),
    };
    return {
        type: 'calculation',
        data: data as unknown as Record<string, unknown>,
        autoDismissMs: 8000,
    };
}



function detectYouTube(_normalized: string, original: string): CardEvent | null {
    try {
        // AI wants to close the video player
        if (/YOUTUBE_CLOSE/i.test(original)) {
            window.dispatchEvent(new Event('curio:close-video'));
            return null;
        }

        const searchMatch = original.match(/YOUTUBE_SEARCH:\s*(.+?)(?:\n|$)/i);
        if (searchMatch) {
            return {
                type: 'youtube',
                data: {
                    searchQuery: searchMatch[1].trim(),
                    title: searchMatch[1].trim(),
                } as unknown as Record<string, unknown>,
                persistent: true,
            };
        }

        const patterns = [
            /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
            /youtu\.be\/([a-zA-Z0-9_-]{11})/i,
            /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
            /YOUTUBE_ID:\s*([a-zA-Z0-9_-]{11})/i,
        ];
        for (const pattern of patterns) {
            const match = original.match(pattern);
            if (match) {
                const videoId = match[1];
                // Extract surrounding sentence as title
                const urlIndex = original.indexOf(match[0]);
                const before = original.substring(0, urlIndex).trim();
                const after = original.substring(urlIndex + match[0].length).trim();
                const title = before || after || 'YouTube Video';

                const data: YouTubeCardData = { videoId, title };
                return {
                    type: 'youtube',
                    data: data as unknown as Record<string, unknown>,
                    persistent: true,
                };
            }
        }
        return null;
    } catch {
        return null;
    }
}

function detectImage(_normalized: string, original: string): CardEvent | null {
    try {
        const imageUrlPattern = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i;
        const match = original.match(imageUrlPattern);
        if (!match) return null;

        const imageUrl = match[1];
        // Extract surrounding sentence as caption
        const urlIndex = original.indexOf(match[0]);
        const before = original.substring(0, urlIndex).trim();
        const after = original.substring(urlIndex + match[0].length).trim();
        const caption = before || after || '';

        const data: ImageCardData = { imageUrl, caption };
        return {
            type: 'image',
            data: data as unknown as Record<string, unknown>,
            autoDismissMs: 8000,
        };
    } catch {
        return null;
    }
}

function detectSportsScore(normalized: string, original: string): CardEvent | null {
    try {
        const keywords = ['score', 'beat', 'defeated', 'won', 'lost', 'final score', 'quarter-final', 'semifinal', 'semi-final', 'championship', 'league', 'match', 'game'];
        const hasKeyword = keywords.some(kw => normalized.includes(kw));
        if (!hasKeyword) return null;

        // Helper to infer status from text
        const inferStatus = (): string => {
            if (/final\s*score|final$/i.test(normalized)) return 'Final';
            if (/quarter.?final/i.test(normalized)) return 'Quarter-finals';
            if (/semi.?final/i.test(normalized)) return 'Semi-finals';
            if (/half.?time/i.test(normalized)) return 'Half-time';
            if (/in progress|live|ongoing/i.test(normalized)) return 'In Progress';
            return 'Final';
        };

        // Pattern: "Team1 N - N Team2" or "Team1 N–N Team2"
        const dashPattern = /([A-Z][a-zA-Z\s]+?)\s+(\d+)\s*[-–]\s*(\d+)\s+([A-Z][a-zA-Z\s]+)/;
        const dashMatch = original.match(dashPattern);
        if (dashMatch) {
            const data: SportsScoreCardData = {
                homeTeam: dashMatch[1].trim(),
                awayTeam: dashMatch[4].trim(),
                homeScore: parseInt(dashMatch[2], 10),
                awayScore: parseInt(dashMatch[3], 10),
                status: inferStatus(),
            };
            return {
                type: 'sportsScore',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 15000,
            };
        }

        // Pattern: "Team1 beat/defeated Team2 N to N" or "Team1 defeated Team2 N-N"
        const beatPattern = /([A-Z][a-zA-Z\s]+?)\s+(?:beat|defeated|won against|edged|topped)\s+([A-Z][a-zA-Z\s]+?)\s+(\d+)\s*(?:to|[-–])\s*(\d+)/i;
        const beatMatch = original.match(beatPattern);
        if (beatMatch) {
            const data: SportsScoreCardData = {
                homeTeam: beatMatch[1].trim(),
                awayTeam: beatMatch[2].trim(),
                homeScore: parseInt(beatMatch[3], 10),
                awayScore: parseInt(beatMatch[4], 10),
                status: inferStatus(),
            };
            return {
                type: 'sportsScore',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 15000,
            };
        }

        // Pattern: "Team1 lost to Team2 N-N" (flip scores — Team2 won)
        const lostPattern = /([A-Z][a-zA-Z\s]+?)\s+lost\s+to\s+([A-Z][a-zA-Z\s]+?)\s+(\d+)\s*(?:to|[-–])\s*(\d+)/i;
        const lostMatch = original.match(lostPattern);
        if (lostMatch) {
            const data: SportsScoreCardData = {
                homeTeam: lostMatch[2].trim(),
                awayTeam: lostMatch[1].trim(),
                homeScore: parseInt(lostMatch[4], 10),
                awayScore: parseInt(lostMatch[3], 10),
                status: inferStatus(),
            };
            return {
                type: 'sportsScore',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 15000,
            };
        }

        // Pattern: "score was N-N" or "score is N to N" with team names nearby
        const scoreWasPattern = /score\s+(?:was|is|ended)\s+(\d+)\s*(?:to|[-–])\s*(\d+)/i;
        const scoreWasMatch = original.match(scoreWasPattern);
        if (scoreWasMatch) {
            // Try to find team names in the surrounding text
            const teamPattern = /([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)/g;
            const teams: string[] = [];
            let m;
            while ((m = teamPattern.exec(original)) !== null) {
                const name = m[1].trim();
                if (name.length > 2 && !/^(The|Yesterday|Today|Tomorrow|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December|Champions|League|Quarter|Semi|Final|Score|Game|Match)$/i.test(name)) {
                    teams.push(name);
                }
            }
            if (teams.length >= 2) {
                const data: SportsScoreCardData = {
                    homeTeam: teams[0],
                    awayTeam: teams[1],
                    homeScore: parseInt(scoreWasMatch[1], 10),
                    awayScore: parseInt(scoreWasMatch[2], 10),
                    status: inferStatus(),
                };
                return {
                    type: 'sportsScore',
                    data: data as unknown as Record<string, unknown>,
                    autoDismissMs: 15000,
                };
            }
        }

        return null;
    } catch {
        return null;
    }
}

function detectRecipe(normalized: string, original: string): CardEvent | null {
    try {
        // Broader keyword matching for conversational recipes
        const keywords = [
            'recipe for', 'recipe is', 'ingredients', "here's how to make", "you'll need",
            'steps to make', 'how to cook', 'how to make', 'here is a recipe',
            // Conversational cooking patterns
            'toss some', 'mix together', 'combine the', 'stir in', 'add the',
            'bake at', 'cook for', 'preheat', 'season with', 'marinate',
        ];
        // Need at least one keyword AND cooking-related content
        const hasKeyword = keywords.some(kw => normalized.includes(kw));
        const hasCookingContext = /\b(chicken|beef|pork|fish|pasta|rice|garlic|onion|olive oil|butter|salt|pepper|flour|sugar|egg|milk|cheese|sauce|oven|pan|pot|bake|cook|fry|boil|grill|roast)\b/i.test(normalized);
        if (!hasKeyword || !hasCookingContext) return null;

        // Extract title
        const titleMatch = original.match(/recipe\s+(?:for|is)\s+(.+?)(?:\.|,|:|!|$)/i)
            || original.match(/how\s+to\s+(?:make|cook)\s+(.+?)(?:\.|,|:|!|$)/i);
        const title = titleMatch ? titleMatch[1].trim() : 'Recipe';

        // Try structured ingredients (bulleted/numbered)
        const ingredients: string[] = [];
        const ingredientMatches = original.match(/[-•*]\s*([^\n,]+)/g);
        if (ingredientMatches) {
            for (const item of ingredientMatches) {
                ingredients.push(item.replace(/^[-•*]\s*/, '').trim());
            }
        }

        // If no structured ingredients, extract cooking items from conversational text
        if (ingredients.length === 0) {
            const foodItems = original.match(/\b(?:chicken|beef|pork|fish|salmon|shrimp|pasta|rice|garlic|onion|olive oil|butter|salt|pepper|flour|sugar|eggs?|milk|cheese|cream|lemon|tomato|basil|oregano|thyme|rosemary|paprika|cumin|Italian seasoning|garlic powder|soy sauce|honey|vinegar)\b/gi);
            if (foodItems) {
                const unique = [...new Set(foodItems.map(f => f.toLowerCase()))];
                unique.forEach(item => ingredients.push(item.charAt(0).toUpperCase() + item.slice(1)));
            }
        }

        // Try structured steps
        const steps: string[] = [];
        const stepMatches = original.match(/\d+[.)]\s*([^\n]+)/g);
        if (stepMatches) {
            for (const step of stepMatches) {
                steps.push(step.replace(/^\d+[.)]\s*/, '').trim());
            }
        }

        // If no structured steps, extract cooking actions as steps
        if (steps.length === 0) {
            const actionPatterns = original.match(/(?:toss|mix|combine|stir|add|bake|cook|fry|boil|grill|roast|season|preheat|marinate|let it|serve)\s+[^.!]+[.!]/gi);
            if (actionPatterns) {
                actionPatterns.slice(0, 5).forEach(step => steps.push(step.trim()));
            }
        }

        const data: RecipeCardData = { title, ingredients, steps };
        return {
            type: 'recipe',
            data: data as unknown as Record<string, unknown>,
            autoDismissMs: 12000,
        };
    } catch {
        return null;
    }
}

function detectNews(normalized: string, original: string): CardEvent | null {
    try {
        const keywords = ['breaking news', 'headline', 'reported', 'according to', 'latest news', 'top stories', 'news update', 'current events'];
        const hasKeyword = keywords.some(kw => normalized.includes(kw));
        if (!hasKeyword) return null;

        // Try to extract source attribution
        const sourceMatch = original.match(/(?:according to|reported by|source:\s*|from\s+)([A-Z][a-zA-Z\s]+?)(?:[,.]|\s+that|\s+reports)/i);
        const source = sourceMatch ? sourceMatch[1].trim() : 'News';

        // Try to extract multiple headlines from numbered or newline-separated items
        const items: Array<{ headline: string; source: string; summary: string }> = [];

        // Match numbered items: "1. headline", "1) headline", "2. headline", etc.
        const numberedItems = original.match(/\d+[.)]\s*([^\n]+)/g);
        // Match newline-separated lines that look like headlines (non-empty, not too short)
        const lines = original.split('\n').map(l => l.trim()).filter(l => l.length > 10);

        if (numberedItems && numberedItems.length > 1) {
            for (const item of numberedItems) {
                const cleaned = item.replace(/^\d+[.)]\s*/, '').replace(/^[-•*]\s*/, '').trim();
                if (cleaned.length > 0) {
                    items.push({ headline: cleaned, source, summary: '' });
                }
            }
        } else if (lines.length > 1) {
            for (const line of lines) {
                const cleaned = line.replace(/^\d+[.)]\s*/, '').replace(/^[-•*]\s*/, '').trim();
                if (cleaned.length > 0) {
                    items.push({ headline: cleaned, source, summary: '' });
                }
            }
        }

        // Fallback: single headline extraction
        if (items.length === 0) {
            const headlineMatch = original.match(/headline[:\s]+(.+?)(?:\.|$)/i);
            const headline = headlineMatch ? headlineMatch[1].trim() : original.substring(0, 80).trim();
            const summary = original.substring(0, 200).trim();
            items.push({ headline, source, summary });
        }

        const data: NewsCardData = { items };
        return {
            type: 'news',
            data: data as unknown as Record<string, unknown>,
            autoDismissMs: 8000,
        };
    } catch {
        return null;
    }
}

function detectDefinition(_normalized: string, original: string): CardEvent | null {
    try {
        // "X is defined as Y", "X means Y", "definition of X", "the word X means Y", "X refers to Y"
        const patterns = [
            /(?:the\s+word\s+)?[""]?(\w+)[""]?\s+is\s+defined\s+as\s+(.+?)(?:\.|$)/i,
            /(?:the\s+word\s+)?[""]?(\w+)[""]?\s+means\s+(.+?)(?:\.|$)/i,
            /definition\s+of\s+[""]?(\w+)[""]?[:\s]+(.+?)(?:\.|$)/i,
            /(?:the\s+word\s+)[""]?(\w+)[""]?\s+means\s+(.+?)(?:\.|$)/i,
            /[""]?(\w+)[""]?\s+refers\s+to\s+(.+?)(?:\.|$)/i,
        ];

        for (const pattern of patterns) {
            const match = original.match(pattern);
            if (match) {
                const word = match[1].trim();
                const definition = match[2].trim();
                if (!word || !definition) continue;

                const data: DefinitionCardData = { word, definition };
                return {
                    type: 'definition',
                    data: data as unknown as Record<string, unknown>,
                    autoDismissMs: 8000,
                };
            }
        }
        return null;
    } catch {
        return null;
    }
}

function detectTranslation(normalized: string, original: string): CardEvent | null {
    try {
        const languages = ['spanish', 'french', 'german', 'italian', 'portuguese', 'japanese', 'chinese', 'korean', 'russian', 'arabic', 'hindi', 'dutch', 'swedish', 'greek', 'turkish', 'polish', 'hebrew', 'thai', 'vietnamese', 'indonesian'];

        // "X translates to Y"
        const translatesTo = original.match(/[""]?(.+?)[""]?\s+translates\s+to\s+[""]?(.+?)[""]?(?:\s+in\s+(\w+))?(?:\.|$)/i);
        if (translatesTo) {
            const targetLang = translatesTo[3] || languages.find(l => normalized.includes(l)) || 'Unknown';
            const data: TranslationCardData = {
                originalText: translatesTo[1].trim(),
                translatedText: translatesTo[2].trim(),
                sourceLanguage: 'English',
                targetLanguage: targetLang.charAt(0).toUpperCase() + targetLang.slice(1),
            };
            return {
                type: 'translation',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 8000,
            };
        }

        // "X means Y in Spanish/French/etc."
        const meansIn = original.match(/[""]?(.+?)[""]?\s+means\s+[""]?(.+?)[""]?\s+in\s+(\w+)/i);
        if (meansIn) {
            const targetLang = meansIn[3];
            if (languages.includes(targetLang.toLowerCase())) {
                const data: TranslationCardData = {
                    originalText: meansIn[1].trim(),
                    translatedText: meansIn[2].trim(),
                    sourceLanguage: 'English',
                    targetLanguage: targetLang.charAt(0).toUpperCase() + targetLang.slice(1),
                };
                return {
                    type: 'translation',
                    data: data as unknown as Record<string, unknown>,
                    autoDismissMs: 8000,
                };
            }
        }

        // "in Spanish, X is Y" or "the translation of X is Y"
        const inLang = original.match(/in\s+(\w+),?\s+[""]?(.+?)[""]?\s+is\s+[""]?(.+?)[""]?(?:\.|$)/i);
        if (inLang && languages.includes(inLang[1].toLowerCase())) {
            const data: TranslationCardData = {
                originalText: inLang[2].trim(),
                translatedText: inLang[3].trim(),
                sourceLanguage: 'English',
                targetLanguage: inLang[1].charAt(0).toUpperCase() + inLang[1].slice(1),
            };
            return {
                type: 'translation',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 8000,
            };
        }

        // "the translation of X is Y"
        const theTranslation = original.match(/the\s+translation\s+(?:of\s+)?[""]?(.+?)[""]?\s+is\s+[""]?(.+?)[""]?(?:\.|$)/i);
        if (theTranslation) {
            const targetLang = languages.find(l => normalized.includes(l)) || 'Unknown';
            const data: TranslationCardData = {
                originalText: theTranslation[1].trim(),
                translatedText: theTranslation[2].trim(),
                sourceLanguage: 'English',
                targetLanguage: targetLang.charAt(0).toUpperCase() + targetLang.slice(1),
            };
            return {
                type: 'translation',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 8000,
            };
        }

        return null;
    } catch {
        return null;
    }
}

function detectFunFact(normalized: string, original: string): CardEvent | null {
    try {
        const phrases = ['fun fact', 'did you know', 'interesting fact', "here's a fact"];
        const hasPhrase = phrases.some(p => normalized.includes(p));
        if (!hasPhrase) return null;

        // Reject conversational/suggestive mentions — the AI offering or asking about fun facts
        // rather than actually delivering one
        const rejectPatterns = [
            'want to hear a fun fact',
            'want a fun fact',
            'like a fun fact',
            'share a fun fact',
            'tell you a fun fact',
            'how about a fun fact',
            'maybe a fun fact',
            'i can share',
            'i could share',
            'would you like',
            'shall i',
            'want me to',
            'i can tell you',
        ];
        if (rejectPatterns.some(p => normalized.includes(p))) return null;

        // Require the fact text after the trigger phrase to be substantial (at least 30 chars)
        let fact = original;
        for (const phrase of phrases) {
            const idx = normalized.indexOf(phrase);
            if (idx !== -1) {
                const afterPhrase = original.substring(idx + phrase.length).replace(/^[:\s,!]+/, '').trim();
                if (afterPhrase.length > 0) {
                    fact = afterPhrase;
                    break;
                }
            }
        }

        if (fact.length < 30) return null;

        const data: FunFactCardData = { fact };
        return {
            type: 'funFact',
            data: data as unknown as Record<string, unknown>,
            autoDismissMs: 8000,
        };
    } catch {
        return null;
    }
}

function detectQuote(_normalized: string, original: string): CardEvent | null {
    try {
        // Pattern: "..." — Author or "..." - Author
        const dashAttr = original.match(/["""](.+?)["""]\s*[—–-]\s*([A-Z][a-zA-Z\s.]+)/);
        if (dashAttr) {
            const data: QuoteCardData = { quote: dashAttr[1].trim(), author: dashAttr[2].trim() };
            return {
                type: 'quote',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 8000,
            };
        }

        // Pattern: "..." by Author
        const byAttr = original.match(/["""](.+?)["""]\s+by\s+([A-Z][a-zA-Z\s.]+)/);
        if (byAttr) {
            const data: QuoteCardData = { quote: byAttr[1].trim(), author: byAttr[2].trim() };
            return {
                type: 'quote',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 8000,
            };
        }

        // Pattern: Author once said "..."
        const onceSaid = original.match(/([A-Z][a-zA-Z\s.]+?)\s+once\s+said\s+["""](.+?)["""]/);
        if (onceSaid) {
            const data: QuoteCardData = { quote: onceSaid[2].trim(), author: onceSaid[1].trim() };
            return {
                type: 'quote',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 8000,
            };
        }

        // Pattern: as Author said, "..."
        const asSaid = original.match(/as\s+([A-Z][a-zA-Z\s.]+?)\s+said,?\s+["""](.+?)["""]/i);
        if (asSaid) {
            const data: QuoteCardData = { quote: asSaid[2].trim(), author: asSaid[1].trim() };
            return {
                type: 'quote',
                data: data as unknown as Record<string, unknown>,
                autoDismissMs: 8000,
            };
        }

        return null;
    } catch {
        return null;
    }
}

function detectList(normalized: string, original: string): CardEvent | null {
    try {
        const phrases = ['here are', 'top 5', 'top 10', 'top 3', 'the list'];
        const ordinalPattern = /first\b.*second\b.*third\b/i;
        const hasPhrase = phrases.some(p => normalized.includes(p)) || ordinalPattern.test(normalized);
        if (!hasPhrase) return null;

        // Try to extract title from "here are the top X ..." or "top 5 ..."
        const titleMatch = original.match(/(?:here\s+are\s+(?:the\s+)?|top\s+\d+\s+)(.+?)(?:[:\n.]|$)/i);
        const title = titleMatch ? titleMatch[1].trim() : 'List';

        // Try to extract items from numbered or bulleted patterns
        const items: string[] = [];
        const numberedItems = original.match(/\d+[.)]\s*([^\n]+)/g);
        if (numberedItems) {
            for (const item of numberedItems) {
                items.push(item.replace(/^\d+[.)]\s*/, '').trim());
            }
        }

        // Try bullet items
        if (items.length === 0) {
            const bulletItems = original.match(/[-•*]\s*([^\n]+)/g);
            if (bulletItems) {
                for (const item of bulletItems) {
                    items.push(item.replace(/^[-•*]\s*/, '').trim());
                }
            }
        }

        // If no structured items found, try splitting by "first", "second", "third" etc.
        if (items.length === 0) {
            const ordinals = original.match(/(?:first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)[,:\s]+([^,.]+)/gi);
            if (ordinals) {
                for (const item of ordinals) {
                    items.push(item.replace(/^(?:first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)[,:\s]+/i, '').trim());
                }
            }
        }

        // Require at least 2 actual structured items — don't show a card for casual speech
        if (items.length < 2) return null;

        const data: ListCardData = { title, items };
        return {
            type: 'list',
            data: data as unknown as Record<string, unknown>,
            autoDismissMs: 8000,
        };
    } catch {
        return null;
    }
}

function detectSmartHome(normalized: string): CardEvent | null {
    const turnOn = /(?:turn|switch|power)\s+on\s+(?:the\s+)?(.+)/i;
    const turnOff = /(?:turn|switch|power)\s+off\s+(?:the\s+)?(.+)/i;
    const toggle = /toggle\s+(?:the\s+)?(.+)/i;

    let action = '';
    let device = '';

    const onMatch = normalized.match(turnOn);
    if (onMatch) {
        action = 'turn_on';
        device = onMatch[1].trim();
    } else {
        const offMatch = normalized.match(turnOff);
        if (offMatch) {
            action = 'turn_off';
            device = offMatch[1].trim();
        } else {
            const toggleMatch = normalized.match(toggle);
            if (toggleMatch) {
                action = 'toggle';
                device = toggleMatch[1].trim();
            }
        }
    }

    if (action && device) {
        // We'll emit a special 'ha' event that the UI can pick up to call MCP
        return {
            type: 'ha',
            data: {
                action,
                device,
                entityId: '', // Will be resolved by OfflineClient
            },
        };
    }

    return null;
}

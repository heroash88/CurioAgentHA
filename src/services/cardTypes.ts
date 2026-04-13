// Card type identifiers
export type CardType =
  | 'device' | 'weather' | 'timer' | 'media' | 'calculation' | 'reminder'
  | 'image' | 'youtube' | 'music' | 'news' | 'funFact' | 'definition' | 'list'
  | 'quote' | 'sportsScore' | 'recipe' | 'translation' | 'finance' | 'stopwatch'
  | 'calendar' | 'alarm' | 'map' | 'places' | 'airQuality' | 'joke' | 'trivia'
  | 'unitConversion' | 'astronomy' | 'commute' | 'camera' | 'thermostat' | 'ha';

// Card event emitted by interceptor/analyzer
export interface CardEvent {
  type: CardType | string;
  data: Record<string, unknown>;
  autoDismissMs?: number;
  persistent?: boolean;
}

// Internal card state managed by reducer
export interface Card {
  id: string;
  type: CardType | string;
  data: Record<string, unknown>;
  createdAt: number;
  autoDismissMs: number;
  persistent: boolean;
  animationState: 'entering' | 'visible' | 'exiting' | 'removed';
}

// Reducer actions
export type CardAction =
  | { type: 'ADD_CARD'; payload: CardEvent }
  | { type: 'REMOVE_CARD'; payload: { id: string } }
  | { type: 'UPDATE_CARD'; payload: { id: string; data: Partial<Card['data']> } }
  | { type: 'SET_ANIMATION_STATE'; payload: { id: string; state: Card['animationState'] } }
  | { type: 'DISMISS_ALL' }
  | { type: 'DISMISS_CAMERA' };

// Props passed to every card type component
export interface CardComponentProps {
  card: Card;
  onDismiss: () => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
}

// Card type registry entry
export interface CardTypeRegistration {
  component: React.ComponentType<CardComponentProps>;
  defaultAutoDismissMs: number;
}

// Card Manager context value
export interface CardManagerContextValue {
  cards: Card[];
  dispatch: React.Dispatch<CardAction>;
  emitCardEvent: (event: CardEvent) => void;
  registerCardType: (type: string, registration: CardTypeRegistration) => void;
  enabled: boolean;
  registry: Map<string, CardTypeRegistration>;
  pauseTimer: (cardId: string) => void;
  resumeTimer: (cardId: string) => void;
}

// --- Data interfaces for each card type ---

export type DeviceSupportedAction = 'turn_on' | 'turn_off' | 'toggle' | 'lock' | 'unlock' | 'open_cover' | 'close_cover' | 'stop_cover';

export type DeviceControlKind = 'toggle' | 'lock' | 'cover' | 'readonly';

export type MediaSupportedAction = 'media_play' | 'media_pause' | 'media_next_track';

export interface DeviceCardData {
  entityId: string;
  friendlyName: string;
  domain: string;
  action: string;
  state: string;
  resolvedState?: string;
  controlKind: string;
  supportedActions: DeviceSupportedAction[];
  error?: string;
}

export interface WeatherCardData {
  temperature: number;
  condition: string;
  high: number;
  low: number;
  humidity?: number;
  forecastMode?: boolean;
  forecast?: Array<{ time: string; temp: number; condition: string }>;
  daily?: Array<{ date: string; highF: number; lowF: number; highC: number; lowC: number; condition: string; humidity?: number }>;
  unit: 'F' | 'C';
  location?: string;
}

export interface TimerCardData {
  label: string;
  isAlarm: boolean;
  targetTime: number;
  duration: number;
  completionState: 'running' | 'completed' | 'dismissed';
}

export interface MediaCardData {
  entityId: string;
  playerName: string;
  playbackState: 'playing' | 'paused' | 'idle';
  trackTitle?: string;
  artistName?: string;
  supportedActions: MediaSupportedAction[];
}

export interface CalculationCardData {
  equation: string;
  result: string;
}

export interface ReminderCardData {
  text: string;
  scheduledTime: string;
  dueDateTime?: string;
}

export interface ImageCardData {
  imageUrl: string;
  caption: string;
}

export interface YouTubeCardData {
  videoId?: string;
  searchQuery?: string;
  title?: string;
}

export type MusicPlaybackState = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error';

export interface MusicCardData {
  playerId: string;
  videoId: string;
  query: string;
  title: string;
  artistOrChannel: string;
  thumbnailUrl: string;
  playbackState: MusicPlaybackState;
  currentTimeSeconds: number;
  durationSeconds: number;
  volume: number;
  source: 'youtube';
  error?: string;
  autoplayBlocked?: boolean;
}

export interface NewsCardData {
  items: Array<{
    headline: string;
    source: string;
    summary: string;
    url?: string;
  }>;
}

export interface FunFactCardData {
  fact: string;
}

export interface DefinitionCardData {
  word: string;
  pronunciation?: string;
  partOfSpeech?: string;
  definition: string;
}

export interface ListCardData {
  title: string;
  items: string[];
  itemIds?: string[];
  deletable?: boolean;
}

export interface QuoteCardData {
  quote: string;
  author: string;
}

export interface SportsScoreCardData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
  homeLogoUrl?: string;
  awayLogoUrl?: string;
}

export interface RecipeCardData {
  title: string;
  ingredients: string[];
  steps: string[];
}

export interface TranslationCardData {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface StopwatchCardData {
  startTime: number;
  pausedElapsed: number;
  running: boolean;
}

export interface FinanceCardData {
  symbol: string;
  name?: string;
  price: number;
  change: number;
  changePercent: number;
  currency?: string;
  marketCap?: string;
}

// --- New card data interfaces ---

export interface CalendarCardData {
  events: Array<{
    title: string;
    startTime: string;
    endTime?: string;
    location?: string;
    allDay?: boolean;
  }>;
  date: string;
}

export interface AlarmCardData {
  alarms: Array<{
    id: string;
    label: string;
    time: string; // HH:mm
    enabled: boolean;
    days?: string[]; // e.g. ['Mon','Tue']
    targetTime?: number;
  }>;
  mode: 'list' | 'ringing';
  ringingAlarmId?: string;
}

export interface MapCardData {
  origin?: string;
  destination: string;
  travelMode: 'driving' | 'walking' | 'transit' | 'bicycling';
  distance?: string;
  duration?: string;
  steps?: Array<{ instruction: string; distance: string }>;
  mapUrl?: string;
  encodedPolyline?: string;
  staticMapUrl?: string;
}

export interface PlacesCardData {
  query: string;
  places: Array<{
    name: string;
    address: string;
    rating?: number;
    userRatingCount?: number;
    priceLevel?: string;
    openNow?: boolean;
    location?: { latitude: number; longitude: number };
    staticMapUrl?: string;
    mapsUrl?: string;
  }>;
  centerMapUrl?: string;
}

export interface AirQualityCardData {
  aqi: number;
  category: string;
  pollutant?: string;
  pm25?: number;
  pm10?: number;
  o3?: number;
  no2?: number;
  advice?: string;
}

export interface JokeCardData {
  setup: string;
  punchline: string;
  category?: string;
}

export interface TriviaCardData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  category?: string;
  revealed?: boolean;
}

export interface UnitConversionCardData {
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  category: string; // e.g. 'length', 'weight', 'temperature', 'volume'
}

export interface AstronomyCardData {
  sunrise?: string;
  sunset?: string;
  moonPhase?: string;
  moonIllumination?: number;
  dayLength?: string;
  goldenHour?: string;
  nextEvent?: string;
  nextEventTime?: string;
}

export interface CommuteCardData {
  origin: string;
  destination: string;
  duration: string;
  durationInTraffic?: string;
  distance: string;
  trafficCondition: 'light' | 'moderate' | 'heavy' | 'unknown';
  route?: string;
  departureTime?: string;
}

export interface CameraCardData {
  entityId: string;
  cameraName: string;
  streamUrl?: string;
  snapshotUrl?: string;
  haUrl?: string;
  haToken?: string;
  isStreaming: boolean;
  cameras?: { entity_id: string; name: string }[];
}

export interface ThermostatCardData {
  entityId: string;
  name: string;
  currentTemp: number;
  targetTemp: number;
  hvacMode: 'heat' | 'cool' | 'heat_cool' | 'auto' | 'off' | 'fan_only' | 'dry';
  humidity?: number;
  unit: 'F' | 'C';
  supportedModes: string[];
}

// Timer persistence
export interface PersistedTimer {
  id: string;
  label: string;
  isAlarm: boolean;
  targetTime: number;
  duration: number;
  createdAt: number;
}

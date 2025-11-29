export type EventType = 'birth' | 'travel' | 'movement' | 'arrest' | 'speech' | 'death';

export type Chapter =
  | "Early Life"
  | "South Africa"
  | "Freedom Struggle"
  | "Independence"
  | "Final Days";

export interface LifeEvent {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  type: EventType;
  chapter?: Chapter;
  images?: string[];
  source?: string;
}

export interface AppState {
  currentIndex: number;
  isPlaying: boolean;
  speed: number;
  followCamera: boolean;
  showStats: boolean;
  isLooping: boolean;
}
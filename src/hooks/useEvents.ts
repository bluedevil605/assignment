import { useFetch } from './useFetch';
import { getEvents } from '../services/eventsService';

export const useEvents = () => useFetch(getEvents);

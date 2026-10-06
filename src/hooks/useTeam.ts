import { useFetch } from './useFetch';
import { getTeam } from '../services/teamService';

export const useTeam = () => useFetch(getTeam);

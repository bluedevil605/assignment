import { useFetch } from './useFetch';
import { getPlans } from '../services/plansService';

export const usePlans = () => useFetch(getPlans);

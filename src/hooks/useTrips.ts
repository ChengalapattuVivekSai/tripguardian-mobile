import { useMemo } from 'react';
import { Trip } from '../types';

const SAMPLE_TRIPS: Trip[] = [
  { id: '1', title: 'City Walking Tour', description: 'Explore the historic downtown.', date: '2026-07-01' },
  { id: '2', title: 'Coastal Boat Ride', description: 'Sunset trip along the coast.', date: '2026-07-05' },
];

export function useTrips() {
  const trips = useMemo(() => SAMPLE_TRIPS, []);

  function getTripById(id: string) {
    return trips.find((t) => t.id === id) || null;
  }

  return { trips, getTripById };
}

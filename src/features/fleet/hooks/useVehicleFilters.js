import { useState, useMemo } from 'react';
import { applyFilters } from '../utils/fleetUtils';

export const useVehicleFilters = (vehicles = []) => {
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    sortBy: '',
    sortDirection: 'asc',
  });

  const filteredVehicles = useMemo(
    () => applyFilters(vehicles, filters),
    [vehicles, filters]
  );

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const setStatusFilter = (status) => updateFilter('status', status);
  const setSearchQuery = (search) => updateFilter('search', search);
  const setSorting = (sortBy, sortDirection = 'asc') => {
    setFilters((prev) => ({ ...prev, sortBy, sortDirection }));
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      search: '',
      sortBy: '',
      sortDirection: 'asc',
    });
  };

  return {
    filters,
    filteredVehicles,
    setStatusFilter,
    setSearchQuery,
    setSorting,
    clearFilters,
    updateFilter,
  };
};

import { TableFilter } from "../table/interfaces";

export interface FilterProps {
  filters: TableFilter[];
  hasApply?: boolean;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

export interface Filter {
  label: string;
  value: string | number;
}

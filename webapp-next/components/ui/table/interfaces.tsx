import { FilterProps } from "@chakra-ui/react";
import { ReactNode, SyntheticEvent } from "react";
import { Filter } from "../filters/interface";

export interface DataResponse<TItem> {
  count: number;
  items: TItem[];
}

export interface TableProps<TItem> {
  columnDefs: ColumnDef<TItem>[];
  retrieveData: (
    page: number,
    numberPerPage: number,
    search: string,
    selectedFilters: Filter[]
  ) => Promise<DataResponse<TItem>>;
  onNewItem?: () => void;
  onDelete?: (item: TItem) => Promise<TItem>;
  onUpdate?: (item: TItem) => Promise<TItem>;
  shadow?: "sm" | "md" | "lg";
  changeActions: ChangeAction<TItem>[];
  displaySearchbar?: boolean;
  filters?: TableFilter[];
  lightMode?: boolean;
  noBorder?: boolean;
  triggerRetrieve?: boolean;
  hideNewItem?: boolean;
  newItemLabel?: string;
}

export interface TableFilter {
  title: string;
  slug: string;
  items: Filter[];
}

export interface ColumnDef<TItem> {
  key: keyof TItem;
  label: string;
  renderItem?: (item: TItem) => ReactNode;
  prefix?: string;
  suffix?: string;
  size?: string;
  displayInFilter?: boolean;
  hide?: boolean;
  clickActionKey?: ChangeAction<TItem>["key"];
}

export interface ChangeAction<TItem> {
  key: string;
  label: string;
  hide?: (item: TItem) => boolean;
  icon?: ReactNode;
  action: (item: TItem) => void | Promise<any>;
}

export interface TableCrasProps {
  filters: any;
}

export interface TableInvoiceMissionsProps {
  filters: any;
}

export interface TableExternalBillsProps {
  filters: any;
}

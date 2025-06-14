export type GenericSchema = {
  Functions: Record<string, GenericFunction>;
  Tables: Record<string, GenericTable>;
  Views: Record<string, GenericView>;
};

type GenericFunction = {
  Args: Record<string, unknown>;
  Returns: unknown;
};

type GenericNonUpdatableView = {
  Relationships: GenericRelationship[];
  Row: Record<string, unknown>;
};

type GenericRelationship = {
  columns: string[];
  foreignKeyName: string;
  isOneToOne?: boolean;
  referencedColumns: string[];
  referencedRelation: string;
};

type GenericTable = {
  Insert: Record<string, unknown>;
  Relationships: GenericRelationship[];
  Row: Record<string, unknown>;
  Update: Record<string, unknown>;
};

type GenericUpdatableView = {
  Insert: Record<string, unknown>;
  Relationships: GenericRelationship[];
  Row: Record<string, unknown>;
  Update: Record<string, unknown>;
};

type GenericView = GenericNonUpdatableView | GenericUpdatableView;

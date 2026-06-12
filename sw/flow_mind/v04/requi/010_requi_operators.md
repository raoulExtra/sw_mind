Guard :=
  { op: <operator>, field: <string>, value: <literal> }
  | { <operator>: { field: <string>, value: <literal> } }
  | { and: [Guard, ...] }
  | { or: [Guard, ...] }
  | { not: Guard }
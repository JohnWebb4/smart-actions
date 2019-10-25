interface Field {
  kind: string;
  [type: string]: string | number | { values: Field[] };
}

interface Fields {
  [field: string]: Field;
}

function fieldsToPojo(fields: Fields): { [field: string]: string } {
  return Object.entries(fields).reduce((memo, [key, field]) => {
    return {
      ...memo,
      [key]: fieldToPojo(field)
    };
  }, {});
}

function fieldToPojo(field: Field): string | number {
  const value = field[field.kind];
  let newValue: string | number;

  if (typeof value === "object" && value.values) {
    newValue = value.values.reduce(
      (memo, currentField) => [memo, fieldToPojo(currentField)].join(" "),
      ""
    );
  } else {
    newValue = value as string | number;
  }

  return newValue;
}

export { fieldsToPojo };

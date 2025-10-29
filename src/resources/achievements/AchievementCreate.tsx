import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
} from "react-admin";

export const AchievementCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Назва" validate={required()} fullWidth />
      <TextInput
        source="description"
        label="Опис"
        validate={required()}
        multiline
        rows={3}
        fullWidth
      />
      <TextInput source="icon" label="Іконка" validate={required()} fullWidth />
      <SelectInput
        source="type"
        label="Тип"
        choices={[
          { id: "bronze", name: "Бронзовий" },
          { id: "silver", name: "Срібний" },
          { id: "gold", name: "Золотий" },
          { id: "diamond", name: "Діамантовий" },
        ]}
        validate={required()}
      />
      <SelectInput
        source="category"
        label="Категорія"
        choices={[
          { id: "words", name: "Слова" },
          { id: "phrases", name: "Фрази" },
          { id: "exercises", name: "Вправи" },
          { id: "grammar", name: "Граматика" },
          { id: "streak", name: "Streak" },
          { id: "points", name: "Бали" },
        ]}
        validate={required()}
      />
      <NumberInput
        source="target"
        label="Ціль"
        validate={[required(), minValue(1)]}
      />
      <NumberInput
        source="points"
        label="Бали за досягнення"
        validate={[required(), minValue(1)]}
        defaultValue={10}
      />
      <BooleanInput source="isActive" label="Активно" defaultValue={true} />
    </SimpleForm>
  </Create>
);

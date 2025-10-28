import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  useRecordContext,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import { Box, Typography } from "@mui/material";

const RuleTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `Edit "${record.title}"` : ""}</span>;
};

export const GrammarRuleEdit = () => (
  <Edit title={<RuleTitle />}>
    <SimpleForm>
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Rule Information
        </Typography>

        <ReferenceInput source="topicId" reference="grammar/admin/topics">
          <SelectInput optionText="title" validate={required()} fullWidth />
        </ReferenceInput>

        <TextInput
          source="title"
          validate={required()}
          fullWidth
          helperText="The title of the grammar rule"
        />

        <TextInput
          source="description"
          validate={required()}
          multiline
          rows={6}
          fullWidth
          helperText="Detailed explanation of the rule"
        />

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Examples
        </Typography>

        <ArrayInput source="examples" validate={required()}>
          <SimpleFormIterator inline>
            <TextInput
              source=""
              label="Example"
              helperText={false}
              fullWidth
              sx={{ width: "100%" }}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
    </SimpleForm>
  </Edit>
);

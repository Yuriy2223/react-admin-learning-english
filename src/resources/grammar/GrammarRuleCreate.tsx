import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  ArrayInput,
  SimpleFormIterator,
  useGetList,
} from "react-admin";
import { Box, Typography, Alert } from "@mui/material";

export const GrammarRuleCreate = () => {
  const { data: topics, isLoading } = useGetList("grammar/admin/topics");

  if (isLoading) return null;

  return (
    <Create title="Create New Grammar Rule">
      <SimpleForm>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          {!topics || topics.length === 0 ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Please create a topic first before adding rules
            </Alert>
          ) : null}

          <Typography variant="h6" gutterBottom>
            Rule Information
          </Typography>

          <ReferenceInput source="topicId" reference="grammar/admin/topics">
            <SelectInput
              optionText="title"
              validate={required()}
              fullWidth
              helperText="Select the topic this rule belongs to"
            />
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

          <ArrayInput
            source="examples"
            validate={required()}
            defaultValue={[""]}
          >
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
    </Create>
  );
};

import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  FilterButton,
  TopToolbar,
  CreateButton,
  ReferenceInput,
  AutocompleteInput,
  useGetList,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const ruleFilters = [
  <ReferenceInput
    key="topic"
    source="topicId"
    reference="grammar/admin/topics"
    alwaysOn
  >
    <AutocompleteInput
      optionText="title"
      label="Topic"
      sx={{ minWidth: 300 }}
      clearIcon={null}
    />
  </ReferenceInput>,
];

const Empty = () => (
  <Box textAlign="center" m={5}>
    <Typography variant="h6" gutterBottom>
      No grammar rules yet
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Please select a topic from the filter above to view its rules
    </Typography>
  </Box>
);

const GrammarRuleListContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: topics, isLoading } = useGetList("grammar/admin/topics");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentFilter = searchParams.get("filter");
    const filterObj = currentFilter ? JSON.parse(currentFilter) : null;

    if (!filterObj?.topicId && topics && topics.length > 0 && !isLoading) {
      const firstTopicId = topics[0].id;
      searchParams.set("filter", JSON.stringify({ topicId: firstTopicId }));
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [topics, isLoading, navigate, location]);

  return (
    <List
      filters={ruleFilters}
      actions={<ListActions />}
      empty={<Empty />}
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <TextField source="title" />
        <TextField source="description" label="Опис" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export const GrammarRuleList = GrammarRuleListContent;

import { Admin, Resource } from "react-admin";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import { Dashboard } from "./components/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CommentIcon from "@mui/icons-material/Comment";
import SchoolIcon from "@mui/icons-material/School";
import RuleIcon from "@mui/icons-material/Rule";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { UserList } from "./resources/users/UserList";
import { UserEdit } from "./resources/users/UserEdit";
import { UserShow } from "./resources/users/UserShow";
import { VocabularyTopicList } from "./resources/vocabulary/TopicList";
import { VocabularyTopicEdit } from "./resources/vocabulary/TopicEdit";
import { VocabularyTopicCreate } from "./resources/vocabulary/TopicCreate";
import { VocabularyWordList } from "./resources/vocabulary/WordList";
import { VocabularyWordEdit } from "./resources/vocabulary/WordEdit";
import { VocabularyWordCreate } from "./resources/vocabulary/WordCreate";
import { PhrasesTopicList } from "./resources/phrases/PhrasesTopicList";
import { PhrasesTopicEdit } from "./resources/phrases/PhrasesTopicEdit";
import { PhrasesTopicCreate } from "./resources/phrases/PhrasesTopicCreate";
import { PhraseList } from "./resources/phrases/PhraseList";
import { PhraseEdit } from "./resources/phrases/PhraseEdit";
import { PhraseCreate } from "./resources/phrases/PhraseCreate";
import { GrammarTopicList } from "./resources/grammar/GrammarTopicList";
import { GrammarTopicEdit } from "./resources/grammar/GrammarTopicEdit";
import { GrammarTopicCreate } from "./resources/grammar/GrammarTopicCreate";
import { GrammarRuleList } from "./resources/grammar/GrammarRuleList";
import { GrammarRuleEdit } from "./resources/grammar/GrammarRuleEdit";
import { GrammarRuleCreate } from "./resources/grammar/GrammarRuleCreate";
import { GrammarQuestionList } from "./resources/grammar/GrammarQuestionList";
import { GrammarQuestionCreate } from "./resources/grammar/GrammarQuestionCreate";
import { GrammarQuestionEdit } from "./resources/grammar/GrammarQuestionEdit";
import { ExerciseTopicList } from "./resources/exercises/ExerciseTopicList";
import { ExerciseTopicCreate } from "./resources/exercises/ExerciseTopicCreate";
import { ExerciseTopicEdit } from "./resources/exercises/ExerciseTopicEdit";
import { ExerciseList } from "./resources/exercises/ExerciseList";
import { ExerciseCreate } from "./resources/exercises/ExerciseCreate";
import { ExerciseEdit } from "./resources/exercises/ExerciseEdit";
import { AchievementList } from "./resources/achievements/AchievementList";
import { AchievementCreate } from "./resources/achievements/AchievementCreate";
import { AchievementEdit } from "./resources/achievements/AchievementEdit";
import { LoginPage } from "./components/LoginPage";

export default function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      title="English Learning Admin"
      loginPage={LoginPage}
      requireAuth
    >
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        show={UserShow}
        icon={PeopleIcon}
        options={{ label: "Users" }}
      />

      <Resource
        name="vocabulary/admin/topics"
        list={VocabularyTopicList}
        edit={VocabularyTopicEdit}
        create={VocabularyTopicCreate}
        icon={SchoolIcon}
        options={{ label: "Vocabulary Topics" }}
      />

      <Resource
        name="vocabulary/admin/words"
        list={VocabularyWordList}
        edit={VocabularyWordEdit}
        create={VocabularyWordCreate}
        icon={AssignmentIcon}
        options={{ label: "Vocabulary" }}
      />

      <Resource
        name="phrases/admin/topics"
        list={PhrasesTopicList}
        edit={PhrasesTopicEdit}
        create={PhrasesTopicCreate}
        icon={SchoolIcon}
        options={{ label: "Phrases Topics" }}
      />

      <Resource
        name="phrases/admin/phrase"
        list={PhraseList}
        edit={PhraseEdit}
        create={PhraseCreate}
        icon={CommentIcon}
        options={{ label: "Phrases" }}
      />

      <Resource
        name="grammar/admin/topics"
        list={GrammarTopicList}
        edit={GrammarTopicEdit}
        create={GrammarTopicCreate}
        icon={SchoolIcon}
        options={{ label: "Grammar Topics" }}
      />

      <Resource
        name="grammar/admin/rules"
        list={GrammarRuleList}
        edit={GrammarRuleEdit}
        create={GrammarRuleCreate}
        icon={RuleIcon}
        options={{ label: "Grammar Rules" }}
      />

      <Resource
        name="grammar/admin/questions"
        list={GrammarQuestionList}
        edit={GrammarQuestionEdit}
        create={GrammarQuestionCreate}
        icon={QuizIcon}
        options={{ label: "Grammar Questions" }}
      />

      <Resource
        name="exercises/admin/topics"
        list={ExerciseTopicList}
        create={ExerciseTopicCreate}
        edit={ExerciseTopicEdit}
        icon={SchoolIcon}
        options={{ label: "Exercise Topics" }}
      />

      <Resource
        name="exercises/admin/exercises"
        list={ExerciseList}
        create={ExerciseCreate}
        edit={ExerciseEdit}
        icon={AssignmentIcon}
        options={{ label: "Exercises" }}
      />

      <Resource
        name="achievements/admin"
        list={AchievementList}
        create={AchievementCreate}
        edit={AchievementEdit}
        icon={EmojiEventsIcon}
        options={{ label: "Achievements" }}
      />
    </Admin>
  );
}

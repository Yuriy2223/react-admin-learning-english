import { Card, CardContent, CardHeader, Box, Typography } from "@mui/material";
import { Title, useGetList } from "react-admin";
import BookIcon from "@mui/icons-material/Book";
import ChatIcon from "@mui/icons-material/Chat";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleIcon from "@mui/icons-material/People";

const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: "50%",
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { data: users, isLoading: usersLoading } = useGetList("users");
  const { data: vocabTopics, isLoading: vocabLoading } = useGetList(
    "vocabulary/admin/topics"
  );
  const { data: phraseTopics, isLoading: phrasesLoading } = useGetList(
    "phrases/admin/topics"
  );
  const { data: grammarTopics, isLoading: grammarLoading } = useGetList(
    "grammar/admin/topics"
  );
  const { data: exerciseTopics, isLoading: exercisesLoading } = useGetList(
    "exercises/admin/topics"
  );
  const { data: achievements, isLoading: achievementsLoading } =
    useGetList("achievements/admin");

  const isLoading =
    usersLoading ||
    vocabLoading ||
    phrasesLoading ||
    grammarLoading ||
    exercisesLoading ||
    achievementsLoading;

  return (
    <>
      <Title title="Панель адміністратора" />
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          Панель адміністратора
        </Typography>
        <Typography color="textSecondary" paragraph>
          Ласкаво просимо до адмін-панелі English Learning
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={3} mt={2}>
          <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 250 }}>
            <StatCard
              title="Користувачів"
              value={isLoading ? 0 : users?.length || 0}
              icon={<PeopleIcon />}
              color="#3f51b5"
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 250 }}>
            <StatCard
              title="Теми словника"
              value={isLoading ? 0 : vocabTopics?.length || 0}
              icon={<BookIcon />}
              color="#f44336"
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 250 }}>
            <StatCard
              title="Теми фраз"
              value={isLoading ? 0 : phraseTopics?.length || 0}
              icon={<ChatIcon />}
              color="#ff9800"
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 250 }}>
            <StatCard
              title="Теми граматики"
              value={isLoading ? 0 : grammarTopics?.length || 0}
              icon={<MenuBookIcon />}
              color="#4caf50"
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 250 }}>
            <StatCard
              title="Теми вправ"
              value={isLoading ? 0 : exerciseTopics?.length || 0}
              icon={<FitnessCenterIcon />}
              color="#9c27b0"
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 250 }}>
            <StatCard
              title="Досягнень"
              value={isLoading ? 0 : achievements?.length || 0}
              icon={<EmojiEventsIcon />}
              color="#ff5722"
            />
          </Box>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={3} mt={3}>
          <Box sx={{ flex: "1 1 calc(50% - 12px)", minWidth: 300 }}>
            <Card>
              <CardHeader title="Швидкі дії" />
              <CardContent>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography>• Створити нову тему словника</Typography>
                  <Typography>• Додати граматичне правило</Typography>
                  <Typography>• Створити нове досягнення</Typography>
                  <Typography>• Додати вправу</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: "1 1 calc(50% - 12px)", minWidth: 300 }}>
            <Card>
              <CardHeader title="Статистика" />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Загальна кількість контенту в системі
                </Typography>
                <Box mt={2}>
                  <Typography>
                    <strong>Всього тем:</strong>{" "}
                    {(vocabTopics?.length || 0) +
                      (phraseTopics?.length || 0) +
                      (grammarTopics?.length || 0) +
                      (exerciseTopics?.length || 0)}
                  </Typography>
                  <Typography>
                    <strong>Активних користувачів:</strong> {users?.length || 0}
                  </Typography>
                  <Typography>
                    <strong>Досягнень:</strong> {achievements?.length || 0}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

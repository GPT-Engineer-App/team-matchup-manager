import React, { useState } from "react";
import { Container, Text, VStack, HStack, Input, Button, Select, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [groupSize, setGroupSize] = useState(4);
  const [tournamentMode, setTournamentMode] = useState("Round Robin");
  const [fields, setFields] = useState(1);
  const [scores, setScores] = useState({});

  const addTeam = () => {
    if (teamName.trim() !== "") {
      setTeams([...teams, teamName]);
      setTeamName("");
    }
  };

  const removeTeam = (index) => {
    const newTeams = teams.filter((_, i) => i !== index);
    setTeams(newTeams);
  };

  const handleScoreChange = (team1, team2, score) => {
    setScores({
      ...scores,
      [`${team1}-${team2}`]: score,
    });
  };

  return (
    <Container centerContent maxW="container.lg" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Tournament Planner</Text>

        <HStack width="100%">
          <Input placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          <IconButton aria-label="Add Team" icon={<FaPlus />} onClick={addTeam} />
        </HStack>

        <VStack width="100%" alignItems="flex-start">
          {teams.map((team, index) => (
            <HStack key={index} width="100%">
              <Text>{team}</Text>
              <IconButton aria-label="Remove Team" icon={<FaTrash />} onClick={() => removeTeam(index)} />
            </HStack>
          ))}
        </VStack>

        <HStack width="100%">
          <Text>Group Size:</Text>
          <Select value={groupSize} onChange={(e) => setGroupSize(Number(e.target.value))}>
            {[4, 8, 16].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </HStack>

        <HStack width="100%">
          <Text>Tournament Mode:</Text>
          <Select value={tournamentMode} onChange={(e) => setTournamentMode(e.target.value)}>
            {["Round Robin", "Knockout"].map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </Select>
        </HStack>

        <HStack width="100%">
          <Text>Fields:</Text>
          <Select value={fields} onChange={(e) => setFields(Number(e.target.value))}>
            {[1, 2, 3, 4].map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </Select>
        </HStack>

        <Text fontSize="xl">Scores</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Team 1</Th>
              <Th>Team 2</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teams.map((team1, index1) =>
              teams.map(
                (team2, index2) =>
                  index1 < index2 && (
                    <Tr key={`${team1}-${team2}`}>
                      <Td>{team1}</Td>
                      <Td>{team2}</Td>
                      <Td>
                        <Input placeholder="Score" value={scores[`${team1}-${team2}`] || ""} onChange={(e) => handleScoreChange(team1, team2, e.target.value)} />
                      </Td>
                    </Tr>
                  ),
              ),
            )}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;

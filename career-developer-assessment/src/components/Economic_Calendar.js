import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Input,
  Select,
  Button,
  HStack,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options);
};

const formatTime = (dateString) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-GB", options);
};

const EconomicCalendar = () => {
  const api_key = "221d78e9d052438:k9no7md76vyiglo";
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    country: "",
    importance: "",
    id: "",
    lastUpdate: "",
  });
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get(
        `https://api.tradingeconomics.com/calendar?c=${api_key}&f=json`
      );
      setEvents(response.data);
      setFilteredEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    if (!isFiltering) {
      let filtered = events;

      if (filters.date) {
        filtered = filtered.filter((event) =>
          event.Date.includes(filters.date)
        );
      }

      if (filters.country) {
        filtered = filtered.filter((event) =>
          event.Country.toLowerCase().includes(filters.country.toLowerCase())
        );
      }

      if (filters.importance) {
        filtered = filtered.filter(
          (event) => event.Importance === parseInt(filters.importance)
        );
      }

      if (filters.id) {
        filtered = filtered.filter(
          (event) => event.CalendarId === parseInt(filters.id)
        );
      }

      if (filters.lastUpdate) {
        filtered = filtered.filter((event) =>
          event.LastUpdate.includes(filters.lastUpdate)
        );
      }

      setFilteredEvents(filtered);
      setIsFiltering(true);
    } else {
      setFilters({
        date: "",
        country: "",
        importance: "",
      });
      setFilteredEvents(events);
      setIsFiltering(false);
    }
  };

  const tableHeaderBg = useColorModeValue("#53a8b6");
  const tableHeaderColor = useColorModeValue("white", "gray.800");
  const tableRowHoverBg = useColorModeValue("#ececec");

  return (
    <Box overflowX="auto" p="2">
        <Heading textAlign={'center'} fontSize={'lg'} fontWeight={'bold'} mb={2}>Economic Calendar</Heading>
      <HStack mb={4}>
        <Input
          placeholder="Filter by Date (YYYY-MM-DD)"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        <Input
          placeholder="Filter by Country"
          name="country"
          value={filters.country}
          onChange={handleFilterChange}
        />
        <Select
          placeholder="Filter by Importance"
          name="importance"
          value={filters.importance}
          onChange={handleFilterChange}
        >
          <option value="1">Low(1)</option>
          <option value="2">Medium(2)</option>
          <option value="3">High(3)</option>
        </Select>
        <Button
          width={300}
          colorScheme={isFiltering ? "red" : "green"}
          onClick={applyFilters}
        >
          {isFiltering ? "Clear Filters" : "Apply Filters"}
        </Button>
      </HStack>
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="blue">
          <Thead bg={tableHeaderBg}>
            <Tr>
              <Th color={tableHeaderColor}>ID</Th>
              <Th color={tableHeaderColor}>Date</Th>
              <Th color={tableHeaderColor}>Time</Th>
              <Th color={tableHeaderColor}>Country</Th>
              <Th color={tableHeaderColor}>Category</Th>
              <Th color={tableHeaderColor}>Event</Th>
              <Th color={tableHeaderColor}>Reference</Th>
              <Th color={tableHeaderColor}>Source</Th>
              <Th color={tableHeaderColor}>Importance</Th>
              <Th color={tableHeaderColor}>Last Update Date</Th>
              <Th color={tableHeaderColor}>Last Update Time</Th>
              <Th color={tableHeaderColor}>Ticker</Th>
              <Th color={tableHeaderColor}>Symbol</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEvents.map((event) => (
              <Tr key={event.CalendarId} _hover={{ bg: tableRowHoverBg }}>
                <Td>{event.CalendarId}</Td>
                <Td>{formatDate(event.Date)}</Td>
                <Td>{formatTime(event.Date)}</Td>
                <Td>{event.Country}</Td>
                <Td>{event.Category}</Td>
                <Td>{event.Event}</Td>
                <Td>{event.Reference}</Td>
                <Td>
                  {event.SourceURL ? (
                    <a
                      href={event.SourceURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  ) : (
                    "N/A"
                  )}
                </Td>
                <Td>{event.Importance}</Td>
                <Td>{formatDate(event.LastUpdate)}</Td>
                <Td>{formatTime(event.LastUpdate)}</Td>
                <Td>{event.Ticker}</Td>
                <Td>{event.Symbol}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default EconomicCalendar;

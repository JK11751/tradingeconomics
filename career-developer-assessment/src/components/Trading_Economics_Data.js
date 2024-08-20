import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Heading,
} from '@chakra-ui/react';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://brains.tradingeconomics.com/v2/search/wb,fred,comtrade?q=nigeria&pp=50&p=0&_=1557934352427&stance=2')
      .then(response => {
        setData(response.data.hits);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <Box py={4}>
      <Heading textAlign={'center'} fontSize={'lg'} fontWeight={'bold'} mb={4}>Trading Economics Data</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Country</Th>
              <Th>Category</Th>
              <Th>Currency</Th>
              <Th>Frequency</Th>
              <Th>Name</Th>
              <Th>URL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>{item.country || "N/A"}</Td>
                <Td>{item.category}</Td>
                <Td>{item.currency}</Td>
                <Td>{item.frequency}</Td>
                <Td>{item.pretty_name}</Td>
                <Td>
                  <Link href={`https://tradingeconomics.com${item.url}`} isExternal color="teal.500">
                    Link
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default DataTable;

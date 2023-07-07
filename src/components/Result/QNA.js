import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { useQuery } from 'react-query';
import { fetchResults } from '../../services/authService';
import { useAlert } from '../../context/NotificationProvider';
import { Box, CircularProgress } from '@mui/material';

const QNA = () => {

  const { showNotification } = useAlert();
  const { isLoading: resultLoading, data: result } = useQuery(
    ["results", ],
    fetchResults,
    {
      enabled: true,

      onError: (error) => {
        showNotification?.(error.response.data?.message, { type: "error" });
      },
    }
  );

  return (
    <Box>
      {
        resultLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) :
        <Table celled striped selectable size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>S/N</Table.HeaderCell>
              <Table.HeaderCell>User ID</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {result.map((item, i) => (
              <Table.Row key={i + 1}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{item.user}</Table.Cell>
                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell>{item.score}%</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      }
    </Box>
  );
};

QNA.propTypes = {
  questionsAndAnswers: PropTypes.array.isRequired
};

export default QNA;

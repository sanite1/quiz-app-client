// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, } from 'semantic-ui-react';
import { Box, Typography } from '@mui/material';

const Result = ({
  message, message2
}) => {


  return (
    <Container>
      <Box
        sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        height: "80vh",
        }}
    >
        <Box>
            <Typography variant="h1" sx={{textAlign: "center", color: "black !important", display: "block", width: "100%"}}>
                {message}<br/>
                {message2}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 5
                }}
            >
                {/*  */}
            </Box>
        </Box>
    </Box>
    </Container>
  );
};

Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired
};

export default Result;

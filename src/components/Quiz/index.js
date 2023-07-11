import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  // Box,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header
} from 'semantic-ui-react';
import he from 'he';

import Countdown from '../Countdown';
import { getLetter } from '../../utils';
import { Box, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { useAlert } from '../../context/NotificationProvider';
import { calculateResult, storeAnswer } from '../../services/authService';

const Quiz = ({ data, countdownTime, endQuiz }) => {

  const storedCurrentNumber = localStorage.getItem('currentNumber');

  const [questionIndex, setQuestionIndex] = useState(parseInt(storedCurrentNumber, 10));
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [, setTimeTaken] = useState(null);

  const handleItemClick = (e, { name }) => {
    console.log(name);
    setUserSlectedAns(name);
  };

  const { showNotification } = useAlert();
  const { mutate,  } = useMutation(storeAnswer, {
    onError: (error) => {
      showNotification?.(error.response.data.message, { type: "error" });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { mutate: calculate,  } = useMutation(calculateResult, {
    onError: (error) => {
      showNotification?.(error.response.data.message, { type: "error" });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  console.log(data[1].data.email);

  const handleNext =  () => {

    const payload = {
      userId: data[1].data._id,
      questionId: data[0][questionIndex]._id,
      selectedOption: userSlectedAns,
    }
    mutate(payload);

    if (questionIndex === data[0].length - 1) {
      const payload2 = {
        userId: data[1].data._id,
        username: data[1].data.email,
      }
      calculate(payload2)
      setQuestionIndex(questionIndex + 1);
      const updatedCurrentNumber = questionIndex + 1;
      localStorage.setItem('currentNumber', updatedCurrentNumber.toString());
      return endQuiz({
        message: "You Have Completed The Exam",
        message2: "Your Score Has Been Recorded!"
      });
    }

    setQuestionIndex(questionIndex + 1);
    const updatedCurrentNumber = questionIndex + 1;
    localStorage.setItem('currentNumber', updatedCurrentNumber.toString());
  
    setUserSlectedAns(null);
  };

  // const timeOver =  timeTaken => {
    
  //   const payload2 = {
  //     userId: data[1].data._id,
  //     username: data[1].data.email,
  //   }
  //   calculate(payload2)
  //   setQuestionIndex(questionIndex + 1);
  //   const updatedCurrentNumber = questionIndex + 1;
  //   localStorage.setItem('currentNumber', updatedCurrentNumber.toString());
  //   return endQuiz({
  //     message: "You Have Elapsed Your Time.",
  //     message2: "Your Score Has Been Recorded!"
  //   });
  // };

  const getBoldText = (text) => {
    return <Typography sx={{ fontWeight: 700, display: "inline", color: "black"}}>{text}</Typography>
  }

  return (
    <Item.Header>
      <Box 
        sx={{
          width: {xs: "95%", md: "70%"},
          margin: "auto",
        }}
      >
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Extra>
                  <Header as="h4" block floated="left">
                    <Icon name="info circle" />
                    <Header.Content>
                      {`Question No.${questionIndex + 1} of ${data[0].length}`}
                    </Header.Content>
                  </Header>
                  {/* <Countdown as="h4"
                    countdownTime={countdownTime}
                    timeOver={timeOver}
                    setTimeTaken={setTimeTaken}
                  /> */}
                </Item.Extra>
                <br />
                <Item.Meta>
                  <Message size="huge" floating>
                    <b>{`Query: [${data[0][questionIndex].query}] (Research on`} <a href={`https://www.google.com/search?q=${data[0][questionIndex].query}`} target="_blank" rel='noreferrer'>Google</a> {`)`}</b>
                  </Message>
                  {/* <br /> */}
                  <Typography sx={{color: "black !important"}}>
                    {`Please assume that a/an`} {getBoldText(data[0][questionIndex].language)} {`speaking user issued this query from `} {getBoldText(data[0][questionIndex].state)} {` (in `} {getBoldText(data[0][questionIndex].country)} {`) on `} {getBoldText(data[0][questionIndex].date)} {`.`}
                  </Typography>
                  <Typography variant="h4" sx={{color: "black !important", marginLeft: "5%"}}>
                    {`Suggested ${data[0][questionIndex].resultType}`}
                  </Typography>
                  <a href={`https://${data[0][questionIndex].resultLink}`} target="_blank" rel='noreferrer' style={{display: "block",width: "90%", margin: "auto", }}>
                    <Box
                      sx={{
                        padding: "12px", border: "1px solid lightgray",
                        borderRadius: "10px"
                      }}
                    >
                      <Typography variant="h5" sx={{color: "black !important"}}>
                        {`${data[0][questionIndex].resultText}.`}
                      </Typography>
                      <Typography variant="caption" sx={{color: "black !important"}}>
                        {`${data[0][questionIndex].resultLink}.`}
                      </Typography>
                    </Box>
                  </a>
                  <Item.Description>
                    {/* <h3>Please choose one of the following answers:</h3> */}
                  </Item.Description>
                  <Divider />
                  <Menu vertical size="medium" width="100%" fluid>
                    {data[0][questionIndex].options.map((option, i) => {
                      const letter = getLetter(i);
                      const decodedOption = he.decode(option);

                      return (
                        <Menu.Item fluid
                          key={decodedOption}
                          name={decodedOption}
                          active={userSlectedAns === decodedOption}
                          onClick={handleItemClick}
                        >
                          <b style={{ marginRight: '8px' }}>{letter}</b>
                          {decodedOption}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Item.Meta>
                <Divider />
                <Item.Extra>
                  <Button
                    primary
                    content= {questionIndex === data[0].length - 1 ? "Finish" : "Next"}
                    onClick={handleNext}
                    floated="right"
                    size="small"
                    icon="right chevron"
                    labelPosition="right"
                    disabled={!userSlectedAns}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Box>
    </Item.Header>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired
};

export default Quiz;

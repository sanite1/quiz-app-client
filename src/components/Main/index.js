import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Message,
  Visibility,
} from 'semantic-ui-react';
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import mindImg from '../../images/mind.svg';
import { useEffect } from 'react';
import { VisibilityOff } from '@mui/icons-material';
import { useAlert } from '../../context/NotificationProvider';
import { fetchQuestions, login } from '../../services/authService';

const textboxStyles = {
  marginBottom: "30px",
  color: "black !important",
  background: "#FFF",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    outline: "none",
    borderRadius: "3px",
    color: "#000",
  },
  "& .MuiInputBase-input:hover": {
    border: "0",
    outline: "none",
    borderRadius: "5px",
    color: "#000",
  },
  "& .MuiFormHelperText-root": {
    color: "red !important",
    background: "#fff",
    width: "100%",
    margin: 0,
  },
  "& .Mui-active": {
    // border: errors.email
    //   ? "1px solid red"
    //   : "1px solid white",
    outline: "none",
    borderRadius: "5px",
  },
  "& .Mui-focused": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#000", // Change the border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000", // Change the border color when active/focused
    },
  },
}

const Main = ({ startQuiz }) => {
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 3500,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  // const [offline, setOffline] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = yup.object().shape({
    email: yup.string().required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
  });

  const { handleSubmit, trigger, control } = useForm({
    resolver: yupResolver(schema),
  });
  const [values, setValues] = useState({
    vertical: "bottom",
    horizontal: "center",
    open: false,
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  const { showNotification } = useAlert();


  const { isLoading: questionsLoading, data: questions } = useQuery(
    ["questions", ],
    fetchQuestions,
    {
      enabled: true,

      onError: (error) => {
        showNotification?.(error.response.data?.message, { type: "error" });
      },
    }
  );

  const { mutate, isLoading } = useMutation(login, {
    onError: (error) => {
      // showNotification?.(error.response.data.message, { type: "error" });
      setProcessing(false);
      setError(error.response.data.message || error.message);
    },
    onSuccess: (data) => {
      setProcessing(false);
      setError("Success");
      console.log(data);
      console.log(questions);
      setCountdownTime({
        hours: 0,
        minutes: 3500,
        seconds: 0,
      })
      if (data.data.examTaken === true) {
        setError("You have taken this exam already!");
      } else {
        startQuiz(
          [questions, data],
          countdownTime.hours + countdownTime.minutes + countdownTime.seconds
        );
      }
    },
  });
  const onBeginExam = (payload) => {
    
    setProcessing(true);
    mutate(payload);
  };

  
  // if (offline) return <Offline />;

  return (
    <Container>
      <Segment>
        { 
          questionsLoading ? (
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
          <Item.Group divided>
            <Item>
              <Item.Image src={mindImg} />
              <Item.Content>
                <Item.Header>
                  <h1>The Search Relevance EXAM</h1>
                </Item.Header>
                {error && (
                  <Message error onDismiss={() => setError(null)}>
                    <Message.Header>{error}</Message.Header>
                    {error.message}
                  </Message>
                )}
                <Divider />
                <Typography mb="5" sx={{color: "black !important"}}>
                  input the credentials given to you for the exam...
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { ref, ...fields },
                    fieldState: { error },
                  }) => (
                    <TextField
                      variant="outlined"
                      size="small"
                      InputProps={{
                        style: {
                          fontSize: "16px",
                          color: "#000 !important",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                        },
                      }}
                      sx={textboxStyles}
                      placeholder="Username"
                      fullWidth
                      {...fields}
                      inputRef={ref}
                      error={Boolean(error?.message)}
                      helperText={error?.message}
                      onKeyUp={() => {
                        trigger("email");
                      }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { ref, ...fields },
                    fieldState: { error },
                  }) => (
                    <TextField
                      variant="outlined"
                      sx={textboxStyles}
                      placeholder="Password"
                      fullWidth
                      size="small"
                      {...fields}
                      type={values.showPassword ? "text" : "password"}
                      InputLabelProps={{
                        style: {
                          color: "black",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={handleClickShowPassword}>
                            {values.showPassword === true ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        ),
                        style: {
                          fontSize: "16px",
                        },
                      }}
                      inputRef={ref}
                      error={Boolean(error?.message)}
                      helperText={error?.message}
                      onKeyUp={() => {
                        trigger("password");
                      }}
                    />
                  )}
                />
                
                <Typography>
                  Note*:<br />
                  - Once you begin the exam you must not close the page else it will not be recorded.<br />
                  - You only get one attempt.<br />
                  - When the timer runs out, it automatically submits so no need to panic.<br />
                  - Make sure you pay close attention to each query.<br />
                </Typography>
                <Divider />
                <Item.Extra>
                  <Button
                    primary
                    size="medium"
                    icon="send"
                    labelPosition="left"
                    content={processing ? 'Processing...' : 'Begin Exam'}
                    onClick={handleSubmit(onBeginExam)}
                    disabled={processing || isLoading}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        }
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;

import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Button } from 'semantic-ui-react';

import { Box, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import { calculateScore, calculateGrade, timeConverter } from '../../utils';
import { useState } from 'react';
import { useEffect } from 'react';
import { createQuestion } from '../../services/authService';
import { useAlert } from '../../context/NotificationProvider';


const textboxStyles = {
  // marginBottom: "30px",
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
    background: "#f5f5f5",
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

const Stats = ({}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { showNotification } = useAlert();
  const [processing, setProcessing] = useState(false);

  const schema = yup.object().shape({
    query: yup.string().required("Query Is Required"),
    language: yup.string().required("Language Is Required"),
    state: yup.string().required("State Is Required"),
    country: yup.string().required("Country Is Required"),
    date: yup.string().required("Date Is Required"),
    resultType: yup.string().required("Result Type Is Required"),
    resultText: yup.string().required("Result Text Is Required"),
    resultLink: yup.string().required("Result Link Is Required"),
    correctAnswer: yup.string().required("Correct Answer Is Required"),
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

  const { mutate, isLoading } = useMutation(createQuestion, {
    onError: (error) => {
      showNotification?.(error.response.data.message, { type: "error" });
      setProcessing(false);
    },
    onSuccess: (data) => {
      showNotification?.(data.message, { type: "success" });
      setProcessing(false);
      console.log(data);
      // console.log(questions);
    },
  });
  const onSubmit = (payload) => {
    setProcessing(true);
    mutate(payload);
  };



  return (
    <Segment>
      { 
          isLoading ? (
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the query
              </Typography>
              <Controller
                name="query"
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
                    placeholder="sewing machine"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("query");
                    }}
                  />
                )}
              />
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the language
              </Typography>
              <Controller
                name="language"
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
                    placeholder="English"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("language");
                    }}
                  />
                )}
              />
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the state
              </Typography>
              <Controller
                name="state"
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
                    placeholder="us/pennysylvania/montgomery/oreland"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("state");
                    }}
                  />
                )}
              />
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the country
              </Typography>
              <Controller
                name="country"
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
                    placeholder="USA"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("country");
                    }}
                  />
                )}
              />
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the date
              </Typography>
              <Controller
                name="date"
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
                    placeholder="2022-06-05"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("date");
                    }}
                  />
                )}
              />
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the result type
              </Typography>
              <Controller
                name="resultType"
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
                    placeholder="Website"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("resultType");
                    }}
                  />
                )}
              />
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the result text
              </Typography>
              <Controller
                name="resultText"
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
                    placeholder="Amazon.com: Sewing Machines - Sewing Products: Art, Crafts & Sewing"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("resultText");
                    }}
                  />
                )}
              />
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the result link
              </Typography>
              <Controller
                name="resultLink"
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
                    placeholder="amazon.com"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("resultLink");
                    }}
                  />
                )}
              />
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the correct answer
              </Typography>
              <Controller
                name="correctAnswer"
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
                    placeholder="Highly Satisfying"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("correctAnswer");
                    }}
                  />
                )}
              />
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{display: "flex", justifyContent: "end", alignItems: "end", height: "100%"}}>
              <Button
                primary
                content="Send"
                onClick={handleSubmit(onSubmit)}
                size="medium"
                floated='right'
                icon="send"
                labelPosition="left"
                disabled={isLoading}
                style={{ marginRight: 15, marginBottom: 8 }}
              />
            </Box>
          </Grid>
        </Grid>
      }
      
    </Segment>
  );
};

Stats.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired
};

export default Stats;

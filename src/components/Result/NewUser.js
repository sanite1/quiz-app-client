import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Button } from 'semantic-ui-react';

import { Box, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation,  } from "react-query";
import { useState } from 'react';
import { useEffect } from 'react';
import { createUser } from '../../services/authService';
import { useAlert } from '../../context/NotificationProvider';
import { Visibility, VisibilityOff } from '@mui/icons-material';


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

const NewUser = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { showNotification } = useAlert();

  const schema = yup.object().shape({
    email: yup.string().required("Query Is Required"),
    password: yup.string().required("Language Is Required"),
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

  const { mutate, isLoading } = useMutation(createUser, {
    onError: (error) => {
      showNotification?.(error.response.data.message || error.response.data.error, { type: "error" });
      // setProcessing(false);
    },
    onSuccess: (data) => {
      showNotification?.(data.message, { type: "success" });
      // setProcessing(false);
      console.log(data);
      // console.log(questions);
    },
  });
  const onSubmit = (payload) => {
    // setProcessing(true);
    mutate(payload);
  };


  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
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
                Enter the email / username
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
                    placeholder="example@sbs.com"
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
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Header as="h1" textAlign="center" block>
              <Typography mb="5" sx={{color: "black !important", textAlign: "left"}}>
                Enter the password
              </Typography>
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
                      placeholder="*********"
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
            </Header>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{display: "flex", justifyContent: "start", alignItems: "end", mt: 3, height: "100%"}}>
              <Button
                primary
                content="Create"
                onClick={handleSubmit(onSubmit)}
                size="big"
                floated='left'
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

NewUser.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired
};

export default NewUser;

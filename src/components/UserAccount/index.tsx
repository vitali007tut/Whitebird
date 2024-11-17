import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as sx from "./styles";

type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
  website: string;
};

type TData = {
  name: string;
  email: string;
  company: string;
  street: string;
  city: string;
  phone: string;
  website: string;
};

export const UserAccount = () => {
  const { id } = useParams();
  const [user, setUser] = useState<TUser>();
  const { register, handleSubmit, reset } = useForm<TData>();
  const navigate = useNavigate();
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        reset({
          name: json.name,
          phone: json.phone,
          email: json.email,
          website: json.website,
          company: json.company.name,
          city: json.address.city,
          street: json.address.street,
        });
        setUser(json);
      });
  }, [id, reset, url]);

  const submit = (data: TData) => {
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        website: data.website,
        company: { name: data.company },
        address: { city: data.city, street: data.street },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
  };

  return (
    <>
      {!user && <h3 style={{ textAlign: "center" }}>Loading...</h3>}
      {user && (
        <>
          <h1 style={{ textAlign: "center" }}>
            {`${user?.username}`}'s personal account
          </h1>
          <Box
            component={"form"}
            sx={sx.form}
            onSubmit={handleSubmit((data) => submit(data))}
          >
            <TextField
              sx={sx.field}
              label="name"
              defaultValue=" "
              {...register("name")}
            />
            <TextField
              {...register("phone")}
              sx={sx.field}
              label="phone"
              defaultValue=" "
            />
            <TextField
              {...register("email")}
              sx={sx.field}
              label="email"
              defaultValue=" "
            />
            <TextField
              {...register("website")}
              sx={sx.field}
              label="website"
              defaultValue=" "
            />
            <TextField
              {...register("company")}
              sx={sx.field}
              label="company"
              defaultValue=" "
            />
            <TextField
              {...register("city")}
              sx={sx.field}
              label="city"
              defaultValue=" "
            />
            <TextField
              {...register("street")}
              sx={sx.field}
              label="street"
              defaultValue=" "
            />
            <Button variant="contained" type="submit" size="medium">
              Submit
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="medium"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

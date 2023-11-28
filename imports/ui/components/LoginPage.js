import React, { useEffect } from "react";
import { Meteor } from 'meteor/meteor';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTracker } from 'meteor/react-meteor-data';

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const user = useTracker(() => Meteor.user());

  useEffect(() => {
    if (user) {
      navigate("/");
      console.log(user);
    }
  }, [user, navigate]);

  const onLogin = async (data) => {
    const username = data.username;
    const password = data.password;
    setLoading(true);

    Meteor.loginWithPassword(username, password, (error) => {
      setLoading(false);
      if (error) {
        console.error(error);
      } else {
        navigate("/");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <div>
          <label>АВТОРИЗАЦИЯ</label>
          <div>
            <label htmlFor="username">
              Имя пользователя:
            </label>
            <input
              type="text"
              placeholder="username..."
              {...register("username", {
                required: "Необходимо ввести имя пользователя",
              })}
            />
            <label>
              {errors.username?.message}
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Пароль:
            </label>
            <input
              type="password"
              placeholder="password..."
              {...register("password", {
                required: "Необходимо ввести пароль",
              })}
            />
            <label>
              {errors.password?.message}
            </label>
          </div>
          <button disabled={loading}>
            {loading ? "Loading" : "ВОЙТИ"}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
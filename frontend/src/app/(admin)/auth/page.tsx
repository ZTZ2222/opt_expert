"use client";

import { useObtainTokenMutation } from "@/redux/features/auth/authSlice";
import { useActions, useAppSelector } from "@/redux/hooks";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Auth = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showSpinner, setShowSpinner] = useState<boolean>(true);

  const { setToken } = useActions();

  const router = useRouter();

  const [loginUser, { data, isSuccess, isError, error }] =
    useObtainTokenMutation();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.access_token !== null,
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin");
    }
    setShowSpinner(false);
  }, [isAuthenticated, router, setShowSpinner]);

  const handleLogin = async () => {
    if (username && password) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      await loginUser(formData);
    } else {
      throw new Error("username and password fields required");
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setToken(data);
      if (rememberMe) {
        localStorage.setItem("token", JSON.stringify(data.access_token));
      } else {
        localStorage.removeItem("token");
      }
      router.push("/admin");
    }
    if (isError) {
      console.error("Login error:", error);
    }
  }, [isSuccess, isError, data, error, rememberMe]);

  if (showSpinner) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex h-screen items-center justify-center bg-gradient-to-br from-teal-100 to-indigo-100">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Вход в систему
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Typography color="gray" className="mt-1 font-normal">
              Введите свои данные для входа.
            </Typography>
            <Input
              crossOrigin={undefined}
              onChange={(e) => setUsername(e.target.value)}
              label="Логин"
              size="lg"
            />
            <Input
              crossOrigin={undefined}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
              size="lg"
            />
            <div className="-ml-2.5">
              <Checkbox
                crossOrigin={undefined}
                label="Запомнить меня"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleLogin}>
              Войти
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Забыли пароль?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Сбросить пароль
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </main>
    );
  }
};

export default Auth;

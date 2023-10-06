"use client";

import Carousel from "@/components/Carousel";
import { LogoSvg } from "@/components/svg";
import { Button } from "@/components/ui/Button";
import { IRequestItemCreate } from "@/interfaces/request.interface";
import { useGetPageContentsQuery } from "@/redux/features/app_utils/pageContentSlice";
import { useCreateRequestItemMutation } from "@/redux/features/app_utils/requestSlice";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Button as MTButton,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [createRequest, { isSuccess, isError }] =
    useCreateRequestItemMutation();
  const [openRequest, setOpenRequest] = useState(false);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const handleOpenRequest = () => setOpenRequest(!openRequest);
  const handleOpenSubscribe = () => setOpenSubscribe(!openSubscribe);

  const { data } = useGetPageContentsQuery();

  const [request, setRequest] = useState<IRequestItemCreate>(
    {} as IRequestItemCreate,
  );

  const handleChange = (field: keyof IRequestItemCreate, value: any) => {
    setRequest(() => ({
      ...request,
      [field]: value,
    }));
  };

  const handleSendRequest = () => {
    if (request.name && request.telephone && request.text) {
      createRequest(request);
    } else {
      toast.info("Заполните все необходимые поля.");
    }
    handleOpenRequest();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success(
        "Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.",
      );
    } else if (isError) {
      toast.dismiss();
      toast.success(`Упс! Произошла ошибка! Попробуйте еще раз.`);
    }
  }, [isSuccess, isError, toast]);

  return (
    <main className="flex w-full flex-col bg-gradient-to-b from-primaryBlue to-primaryBlack">
      <hr className="h-[1px] w-full self-center border-0 bg-gray-500 from-bgButton2 to-bgButton1 md:mt-3 md:w-5/6 md:bg-gradient-to-r" />
      <div className="relative flex flex-col justify-center md:flex-row">
        <div className="left-0 top-9 mt-5 md:absolute md:ml-5 md:mt-0 md:w-1/5">
          <LogoSvg className="w-full text-[172px] xl:text-[242px]" />
        </div>
        <div className="flex flex-col items-center px-6 pt-8 text-center md:w-3/5 lg:pt-24">
          <h1
            className={`font-sans text-xl font-black uppercase text-white md:text-2xl lg:text-4xl xl:text-6xl`}
          >
            {data?.entities["главная"]?.paragraph1 ||
              "ваш эксперт в оптовоМ БИЗНЕСЕ №1!"}
          </h1>
          <p className="mt-4 text-xs text-white md:mt-5 md:text-base lg:text-xl">
            {data?.entities["главная"]?.paragraph2 ||
              "Занимайтесь бизнесом, а мы займемся поиском и доставкой товара!"}
          </p>
          <div className="mb-16 mt-7 flex w-full flex-col gap-10 md:mb-24 md:mt-12 lg:mb-40 lg:mt-20 xl:items-center">
            <Button
              onClick={handleOpenRequest}
              className="h-10 w-auto text-[10px] font-bold uppercase shadow-md shadow-gray-600 hover:shadow-around hover:shadow-blue-700 md:h-12 md:text-xs xl:w-[605px] xl:text-lg"
            >
              Оставить заявку на подбор товаров
            </Button>
            <Dialog open={openRequest} handler={handleOpenRequest}>
              <DialogHeader>Хотите оставить заявку?</DialogHeader>
              <DialogBody divider className="flex flex-col gap-5">
                <Input
                  value={request.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  crossOrigin={undefined}
                  label="Ваше имя"
                />
                <Input
                  value={request.telephone || ""}
                  type="tel"
                  onChange={(e) => handleChange("telephone", e.target.value)}
                  crossOrigin={undefined}
                  label="Телефон"
                />
                <Textarea
                  value={request.text || ""}
                  onChange={(e) => handleChange("text", e.target.value)}
                  label="Напишите какие товары вы ищите"
                />
              </DialogBody>
              <DialogFooter className="gap-5">
                <MTButton
                  variant="outlined"
                  color="pink"
                  onClick={handleOpenRequest}
                >
                  Закрыть
                </MTButton>
                <MTButton
                  variant="gradient"
                  color="purple"
                  onClick={handleSendRequest}
                >
                  Отправить заявку
                </MTButton>
              </DialogFooter>
            </Dialog>
            <Button
              onClick={handleOpenSubscribe}
              className="h-10 w-auto text-[10px] font-bold uppercase shadow-md shadow-gray-600 hover:shadow-around hover:shadow-blue-700 md:h-12 md:text-xs xl:w-[605px] xl:text-lg"
            >
              Подписаться на рассылку маржинальных товаров
            </Button>
            <Dialog open={openSubscribe} handler={handleOpenSubscribe}>
              <DialogHeader>
                Хотите быть в курсе самых выгодных предложений?
              </DialogHeader>
              <DialogBody divider className="flex flex-col gap-5">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-normal opacity-70"
                >
                  Для того, чтобы получать рассылки, Вам необходимо сохранить
                  номер телефона в контакты и написать слово «рассылка», иначе
                  WhatsApp не будет пропускать рассылки на Ваш номер.
                </Typography>
              </DialogBody>
              <DialogFooter className="gap-5">
                <MTButton
                  variant="outlined"
                  color="pink"
                  onClick={handleOpenSubscribe}
                >
                  Закрыть
                </MTButton>
                <MTButton
                  variant="gradient"
                  color="purple"
                  onClick={handleOpenSubscribe}
                >
                  Написать в WhatsApp
                </MTButton>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
      </div>
      <Carousel />
    </main>
  );
}

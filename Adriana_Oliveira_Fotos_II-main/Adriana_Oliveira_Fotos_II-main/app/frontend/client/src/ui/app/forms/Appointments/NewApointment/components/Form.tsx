import React, { useEffect, useState } from "react";
import {
  TextInput,
  Datepicker,
  Select,
  Label,
  Flowbite,
  Button,
} from "flowbite-react";
import { AppointmentDataProps } from "../../../../../../types/AppointmentData/AppointmentDataProps";
import { Controller, useForm } from "react-hook-form";
import { customTheme } from "../../../../../../components/Shared/FlowbiteCustomTheme/FlowbiteCustomTheme";
import { getClientList } from "../../../../../../helpers/clients/getClientList";

interface FormProps {
  data: AppointmentDataProps;
  setData: () => void;
    prevData?: AppointmentDataProps;
    sendData: () => void;
}

export default function Form({ data, setData, prevData, sendData}: FormProps) {

    
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
    const [clientSelected, setClientSelected] = useState("");

    const submitForm = (formData) => {
      const newAppointment = {
        title: formData.title,
        description: formData.description,
        dateInitial: formData.dateInitial,
        hourInitial: formData.hourInitial,
        dateFinal: formData.dateFinal,
        hourFinal: formData.hourFinal,
        userAssociated: clientSelected,
      };
      setData(newAppointment);
    };


  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    getClientList().then(setClientList);
  }, []);

  const handleClientChange = (event) => {
    setClientSelected(event.target.value);
  };

  return (
    <>
      <form
        className="form bg-accent xxs:w-11/12 mx-auto my-4 py-8 rounded-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="text-3xl font-bold text-center mb-9 text-secondary">
          Novo Compromisso
        </h1>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="title"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Título:"
            />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  {...register("title", { required: "Campo obrigatório" })}
                  type="text"
                  placeholder="Dê um título ao compromisso..."
                  className="w-11/12"
                  color={errors.title ? "failure" : "primary"}
                />
              )}
            />

            {errors && errors.title && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="description"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Descrição:"
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  {...register("description", {
                    required: "Campo obrigatório",
                  })}
                  type="text"
                  placeholder="Forneça uma descrição ao compromisso..."
                  className="w-11/12"
                  color={errors.description ? "failure" : "primary"}
                />
              )}
            />

            {errors && errors.description && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="dateInitial"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Data de início:"
            />
            <Controller
              control={control}
              name="dateInitial"
              render={({ field }) => (
                <>
                  <Flowbite theme={{ theme: customTheme }}>
                    <Datepicker
                      minDate={new Date()}
                      language="pt-BR"
                      id="dateInitial"
                      name="dateInitial"
                      placeholder="Selecione a data de início do compromisso..."
                      labelTodayButton="Hoje"
                      labelClearButton="Limpar"
                      color={errors.dateInitial ? "failure" : "primary"}
                      onSelectedDateChanged={(date) => field.onChange(date)}
                      className="w-11/12 rounded-lg p-2"
                    />
                  </Flowbite>
                  <input
                    type="hidden"
                    {...field}
                    {...register("dateInitial", {
                      required: "Campo obrigatório",
                    })}
                  />
                </>
              )}
            />
            {errors && errors.dateInitial && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.dateInitial.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="hourInitial"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Horário de início:"
            />
            <Controller
              control={control}
              name="hourInitial"
              render={({ field }) => (
                <>
                  <TextInput
                    type="time"
                    color={errors.hourInitial ? "failure" : "primary"}
                    className="w-11/12 rounded-lg p-2 border-none"
                    placeholder="Selecione o horário de início do compromisso..."
                    {...field}
                    defaultValue={prevData ? prevData.hourInitial : ""}
                  />
                  <input
                    type="hidden"
                    id="time"
                    {...field}
                    {...register("hourInitial", {
                      required: "Campo obrigatório",
                    })}
                  />
                </>
              )}
            />
            {errors && errors.hourInitial && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.hourInitial.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="dateFinal"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Data de término:"
            />
            <Controller
              control={control}
              name="dateFinal"
              render={({ field }) => (
                <>
                  <Flowbite theme={{ theme: customTheme }}>
                    <Datepicker
                      minDate={new Date()}
                      language="pt-BR"
                      id="dateFinal"
                      name="dateFinal"
                      placeholder="Selecione a data de término do compromisso..."
                      labelTodayButton="Hoje"
                      labelClearButton="Limpar"
                      color={errors.dateFinal ? "failure" : "primary"}
                      onSelectedDateChanged={(date) => field.onChange(date)}
                      className="w-11/12 rounded-lg p-2"
                    />
                  </Flowbite>
                  <input
                    type="hidden"
                    {...field}
                    {...register("dateFinal", {
                      required: "Campo obrigatório",
                    })}
                  />
                </>
              )}
            />
            {errors && errors.dateFinal && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.dateFinal.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="hourFinal"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Horário de término:"
            />
            <Controller
              control={control}
              name="hourFinal"
              render={({ field }) => (
                <>
                  <TextInput
                    type="time"
                    color={errors.hourFinal ? "failure" : "primary"}
                    className="w-11/12 rounded-lg p-2 border-none"
                    placeholder="Selecione o horário de término do compromisso..."
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <input
                    type="hidden"
                    id="time"
                    {...field}
                    {...register("hourFinal", {
                      required: "Campo obrigatório",
                    })}
                  />
                </>
              )}
            />
            {errors && errors.hourFinal && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.hourFinal.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="userAssociated"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Usuário Associado:"
            />
            <Controller
              name="userAssociated"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  {...register("userAssociated", {
                    required: "Campo obrigatório",
                  })}
                  onChange={handleClientChange}
                  id="userAssociated"
                  name="userAssociated"
                  color={errors.userAssociated ? "failure" : "primary"}
                  className="w-11/12 text-center rounded-lg p-2"
                >
                  <option disabled selected value="">
                    Selecione...
                  </option>
                  {clientList &&
                    clientList.map((option, index) => (
                      <option key={index} value={option.email}>
                        {option.fullName + " - " + option.registryType}
                      </option>
                    ))}
                </Select>
              )}
            />

            {errors && errors.userAssociated && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.userAssociated.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="bg-secondary w-11/12 mt-4">
            Salvar
          </Button>
        </div>
      </form>
    </>
  );
}

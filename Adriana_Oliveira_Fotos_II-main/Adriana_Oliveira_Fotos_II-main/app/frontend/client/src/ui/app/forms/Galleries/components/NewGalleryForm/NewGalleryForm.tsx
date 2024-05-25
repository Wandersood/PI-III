import {
  Button,
  Datepicker,
  Flowbite,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { customTheme } from "../../../../../../components/Shared/FlowbiteCustomTheme/FlowbiteCustomTheme";
import { DefaultSizeOptions } from "../../../../../../lib/gallery/options/DefaultSizeOptions";
import { PackOptions } from "../../../../../../lib/gallery/options/PackOptions";
import { createGallery } from "../../../../../../services/GalleryDataService";
import { getClientList } from "../../../../../../helpers/gallery/getClientList";
import { useEffect, useState } from "react";

export default function NewGalleryForm() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const [clientList, setClientList] = useState([]);

  async function submitForm(data) {
    try {
      await createGallery(data);
      alert("Galeria criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar galeria...", error);
      alert("Erro ao criar galeria...");
    }
  }

  useEffect(() => {
    getClientList().then((clientList) => {
      const clients = Array.from(clientList);
      setClientList(clients);
      
    });
  }, []);


  return (
    <>
      <form
        className="xs:w-11/12 lg:w-1/2 mx-auto bg-accent p-4 my-4 rounded-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="text-3xl font-bold text-center mb-9 text-secondary">
          Nova Galeria
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
                  {...register("title", {
                    required: "Obrigatório preencher o título da galeria.",
                  })}
                  type="text"
                  placeholder="Dê um título à galeria..."
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
              htmlFor="createdAt"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Data da galeria:"
            />
            <Controller
              control={control}
              name="createdAt"
              render={({ field }) => (
                <>
                  <Flowbite theme={{ theme: customTheme }}>
                    <Datepicker
                      maxDate={new Date()}
                      language="pt-BR"
                      id="createdAt"
                      name="createdAt"
                      placeholder="Selecione a data da galeria..."
                      labelTodayButton="Hoje"
                      labelClearButton="Limpar"
                      onSelectedDateChanged={(date) => field.onChange(date)}
                      className="w-11/12 rounded-lg p-2"
                    />
                  </Flowbite>
                  <input type="hidden" {...field} {...register("createdAt")} />
                </>
              )}
            />
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="photosNumber"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Pacote:"
            />
            <Controller
              name="photosNumber"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      className="w-11/12"
                      {...field}
                      {...register("photosNumber", {
                        required: "Obrigatório preencher o pacote da galeria.",
                      })}
                      color={errors.photosNumber ? "failure" : "primary"}
                    >
                      <option disabled selected value="">
                        Selecione...
                      </option>
                      {PackOptions &&
                        PackOptions.map((option, index) => (
                          <option key={option.index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </Select>
                    {errors && errors.photosNumber && (
                      <span className="text-red-500 font-medium text-[14px]">
                        {errors.photosNumber.message}
                      </span>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="category"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Categoria:"
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  {...register("category", {
                    required: "Obrigatório preencher a categoria da galeria.",
                  })}
                  type="text"
                  placeholder="Dê uma categoria à galeria (Tipo de ensaio)..."
                  className="w-11/12"
                  color={errors.category ? "failure" : "primary"}
                />
              )}
            />
            {errors && errors.category && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.category.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="defaultSize"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Tamanho de exibição:"
            />
            <Controller
              name="defaultSize"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  {...register("defaultSize", {
                    required:
                      "Obrigatório preencher o tamanho de exibição da galeria.",
                  })}
                  className="w-11/12"
                  color={errors.defaultSize ? "failure" : "primary"}
                >
                  <option disabled selected value="">
                    Selecione...
                  </option>
                  {DefaultSizeOptions &&
                    DefaultSizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </Select>
              )}
            />
            {errors && errors.defaultSize && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.defaultSize.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="clientAssociated"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Cliente associado:"
            />
            <Controller
              name="clientAssociated"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      className="w-11/12"
                      {...field}
                      {...register("clientAssociated", {
                        required: "Obrigatório associar cliente à galeria.",
                      })}
                      color={errors.clientAssociated ? "failure" : "primary"}
                    >
                      <option disabled selected value="">
                        Selecione...
                      </option>
                      {clientList.map((option, index) => (
                          <option key={option.id} value={option.id}>
                            {option.fullName}
                          </option>
                        ))}
                    </Select>
                    {errors && errors.clientAssociated && (
                      <span className="text-red-500 font-medium text-[14px]">
                        {errors.clientAssociated.message}
                      </span>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-11/12 text-lg bg-success">
            Salvar
          </Button>
        </div>
      </form>
    </>
  );
}

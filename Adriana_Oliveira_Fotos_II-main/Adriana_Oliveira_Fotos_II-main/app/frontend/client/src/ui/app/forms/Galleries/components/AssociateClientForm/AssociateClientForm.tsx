import { Button, Label, Select, HelperText } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { PackOptions } from "../../../../../../lib/gallery/options/PackOptions";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

export default function AssociateClientForm() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState();
  const [selectedContractFile, setSelectedContractFile] = useState();
  const [selectedTermsFile, setSelectedTermsFile] = useState();

  const submitForm = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form
        className="xs:w-11/12 mx-auto p-4 my-4 rounded-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="contract"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Contrato associado:"
            />
            <Controller
              name="contract"
              control={control}
              rules={{
                required: "Obrigatório submeter o contrato associado.",
              }}
              render={({ field: { onChange, onBlur, ref } }) => {
                const { getRootProps, getInputProps } = useDropzone({
                  accept: ".pdf",
                  maxFiles: 3,
                  onDrop: (acceptedFiles) => {
                    if (
                      acceptedFiles[0] &&
                      acceptedFiles[0].type === "application/pdf"
                    ) {
                      setSelectedContractFile(acceptedFiles[0]);
                      onChange(acceptedFiles);
                    } else {
                      alert(
                        "Por favor, envie um arquivo PDF para upload de contrato."
                      );
                    }
                  },
                });

                return (
                  <div {...getRootProps()} className="w-11/12">
                    <input
                      {...getInputProps()}
                      onBlur={onBlur}
                      ref={ref}
                      type="file"
                      className="hidden"
                    />
                    <label
                      htmlFor="contract"
                      className="block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      style={errors.contract ? { borderColor: "red" } : {}}
                    >
                      Escolha o contrato associado...
                    </label>
                    {selectedContractFile && (
                      <p className="mt-2 text-sm text-gray-600">
                        {selectedContractFile.name}
                      </p>
                    )}
                  </div>
                );
              }}
            />
            {errors && errors.contract && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.contract.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="termsOfUse"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Termo de uso de imagem associado:"
            />
            <Controller
              name="termsOfUse"
              control={control}
              rules={{
                required:
                  "Obrigatório submeter o termo de uso de imagem associado.",
              }}
              render={({ field: { onChange, onBlur, ref } }) => {
                const { getRootProps, getInputProps } = useDropzone({
                  accept: ".pdf",
                  maxFiles: 3,
                  onDrop: (acceptedFiles) => {
                    if (
                      acceptedFiles[0] &&
                      acceptedFiles[0].type === "application/pdf"
                    ) {
                      setSelectedTermsFile(acceptedFiles[0]);
                      onChange(acceptedFiles);
                    } else {
                      alert(
                        "Por favor, envie um arquivo PDF para upload de termo de uso de imagem."
                      );
                    }
                  },
                });

                return (
                  <div {...getRootProps()} className="w-11/12">
                    <input
                      {...getInputProps()}
                      onBlur={onBlur}
                      ref={ref}
                      type="file"
                      className="hidden"
                    />
                    <label
                      htmlFor="termsOfUse"
                      className="block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      style={errors.contract ? { borderColor: "red" } : {}}
                    >
                      Escolha o termo de uso de imagem associado...
                    </label>
                    {selectedTermsFile && (
                      <p className="mt-2 text-sm text-gray-600">
                        {selectedTermsFile.name}
                      </p>
                    )}
                  </div>
                );
              }}
            />
            {errors && errors.termsOfUse && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.termsOfUse.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-success text-white rounded-md hover:bg-green-600 transition-colors duration-200 ease-in-out w-11/12"
          >
            Salvar
          </Button>
        </div>
      </form>
    </>
  );
}

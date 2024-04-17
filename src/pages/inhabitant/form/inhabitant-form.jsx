import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { getById, create, update } from "@/proxies/inhabitant";

/* eslint-disable react/prop-types */
export default function InhabitantForm({ isEdit }) {
  const { register, watch, setValue, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const inhabitantType = ["PROPIETARIO", "INQUILINO (A)"];
  

  useEffect(() => {
    const subscription = watch((value) =>
      setIsValidForm(Object.values(value).every((v) => v !== null && v !== ""))
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (isEdit) {
      setIsLoadingUpdate(true);

      getById(id).subscribe({
        next: (value) => {
          setValue("moradorId", value.moradorId);
          setValue("administradorId", value.administradorId);
          setValue("nombre", value.nombre);
          setValue("apellido", value.apellido);
          setValue("tipoMorador", value.tipoMorador);
          setValue("direccion", value.direccion);
        },

        complete: () => setIsLoadingUpdate(false),
      });
    }
  }, [id, isEdit, setValue]);

  const onSubmitForm = (data) => {
    setIsLoading(true);

    if (!isEdit) {
      create(data).subscribe({
        next: (value) => {
          console.log({ value });

          navigate("/inhabitant");
        },
        complete: () => {
          setIsLoading(false);
        },
      });
    } else {
      update(id, data).subscribe({
        next: (value) => {
          console.log({ value });

          navigate("/inhabitant");
        },
        complete: () => {
          setIsLoading(false);
        },
      });
    }
  };

  return (
    <div className="section">
      <section className="hero">
        <div className="hero-body">
          <p className="title">{isEdit ? "Editar" : "Registrar"} morador</p>
          <p className="subtitle">Creación o edición del morador</p>
        </div>
      </section>

      <div className="box">
        {isLoadingUpdate ? (
          <div className="has-text-centered">
            <BeatLoader color="#36d7b7" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="field">
              <label className="label">Código de morador</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Ingrese codigo"
                  {...register("moradorId")}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Código de administrador</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Ingrese codigo"
                  {...register("administradorId")}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Ingrese nombre"
                  {...register("nombre")}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Apellido</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Ingrese apellido"
                  {...register("apellido")}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Tipo de morador</label>
              <div className="control">
                <div className="select">
                  <select {...register("tipoMorador")}>
                    {inhabitantType.map((inhabitant) => (
                      <option key={inhabitant} value={inhabitant}>
                        {inhabitant}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Dirección</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Ingrese direccion"
                  {...register("direccion")}
                />
              </div>
            </div>

            <div className="buttons">
              <button
                className={
                  isLoading
                    ? "button is-primary is-loading"
                    : "button is-primary"
                }
                type="submit"
                disabled={!isValidForm}
              >
                Registrar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { list } from "@/proxies/admin";

export default function AdminIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [adminName, setAdminName] = useState("");
  const columns = ["Nombre", "Apellido", "Tipo doc", "Numero doc", "Acciones"];

  const getAdmins = useCallback(() => {
    setIsLoading(true);

    list().subscribe({
      next: (value) => {
        if (value?.length) {
          setAdmins(value);
          return;
        }

        console.error(value);
      },

      complete: () => {
        setIsLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    getAdmins();
  }, [getAdmins]);

  const handleInputChange = (e) => {
    setAdminName(e.target.value);
  };

  const onSearch = () => {
    setAdmins(
      admins.filter((a) =>
        String(a.nombre).toLowerCase().match(String(adminName).toLowerCase())
      )
    );
  };

  const onClear = () => {
    setAdminName("");
    getAdmins();
  };

  return (
    <div className="section">
      <section className="hero has-background-primary-light mb-4">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <div className="hero-body">
                <p className="title">Administradores</p>
                <p className="subtitle">
                  Registro y creacion de administradores
                </p>
              </div>
            </div>
          </div>

          <div className="level-right">
            <div className="level-item">
              <div className="hero-body">
                <Link className="button" to="/admin/create">
                  Registrar
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </section>

      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                  value={adminName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="level-item pt-5">
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" onClick={onSearch}>
                  Buscar
                </button>
              </div>
              <div className="control">
                <button className="button is-link is-light" onClick={onClear}>
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="box">
        {isLoading ? (
          <div className="has-text-centered">
            <BeatLoader color="#36d7b7" />
          </div>
        ) : (
          <div className="table-container">
            <table className="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.administradorId}>
                    <td>{admin.nombre}</td>
                    <td>{admin.apellido}</td>
                    <td>{admin.tipoDocumento}</td>
                    <td>{admin.numeroDocumento}</td>
                    <td>
                      <div className="buttons">
                        <Link
                          className="button is-small is-warning"
                          to={`/admin/edit/${admin.administradorId}`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"
                              fill="currentColor"
                            />
                            <path
                              d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

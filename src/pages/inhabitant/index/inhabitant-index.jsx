import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { list } from "@/proxies/inhabitant";

export default function InhabitantIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [inhabitants, setInhabitants] = useState([]);
  const [inhabitantName, setInhabitantName] = useState("");
  const columns = ["Nombre", "Apellido", "Dirección", "Tipo", "Acciones"];

  const getInhabitants = useCallback(() => {
    setIsLoading(true);

    list().subscribe({
      next: (value) => {
        if (value?.length) {
          setInhabitants(value);
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
    getInhabitants();
  }, [getInhabitants]);

  const handleInputChange = (e) => {
    setInhabitantName(e.target.value);
  };

  const onSearch = () => {
    setInhabitants(
      inhabitants.filter((a) =>
        String(a.nombre)
          .toLowerCase()
          .match(String(inhabitantName).toLowerCase())
      )
    );
  };

  const onClear = () => {
    setInhabitantName("");
    getInhabitants();
  };

  return (
    <div className="section">
      <section className="hero has-background-primary-light mb-4">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <div className="hero-body">
                <p className="title">Moradores</p>
                <p className="subtitle">Registro y creacion de propietarios</p>
              </div>
            </div>
          </div>

          <div className="level-right">
            <div className="level-item">
              <div className="hero-body">
                <Link className="button" to="/inhabitant/create">
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
                  value={inhabitantName}
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
                {inhabitants.map((inhabitant) => (
                  <tr key={inhabitant.moradorId}>
                    <td>{inhabitant.nombre}</td>
                    <td>{inhabitant.apellido}</td>
                    <td>{inhabitant.direccion}</td>
                    <td>{inhabitant.tipoMorador}</td>
                    <td>
                      <div className="buttons">
                        <Link
                          className="button is-small is-warning"
                          to={`/inhabitant/edit/${inhabitant.moradorId}`}
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
                        <button className="button is-small is-danger">
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
                              d="M3.49997 12.8995C2.71892 13.6805 2.71892 14.9468 3.49997 15.7279L7.35785 19.5858H4.08576C3.53347 19.5858 3.08576 20.0335 3.08576 20.5858C3.08576 21.1381 3.53347 21.5858 4.08576 21.5858H20.0858C20.638 21.5858 21.0858 21.1381 21.0858 20.5858C21.0858 20.0335 20.638 19.5858 20.0858 19.5858H10.9558L20.4705 10.071C21.2516 9.28999 21.2516 8.02366 20.4705 7.24261L16.2279 2.99997C15.4468 2.21892 14.1805 2.21892 13.3995 2.99997L3.49997 12.8995ZM7.82579 11.4021L4.91418 14.3137L9.15683 18.5563L12.0684 15.6447L7.82579 11.4021ZM9.24 9.98787L13.4826 14.2305L19.0563 8.65683L14.8137 4.41418L9.24 9.98787Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
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

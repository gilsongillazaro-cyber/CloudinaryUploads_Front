import Header from "./components/header";
import Posts from "./components/posts";
import "./App.css";
import api from "./services/api.js";
import { toast } from "react-toastify";
import { useRef, useState, useEffect } from "react";
import { useContext } from "react";
import { FuncaoContext } from "./Funcao.jsx";

function App() {
  const titulo = useRef();
  const seleci = useRef();
  const texto = useRef();
  const load = useRef();

  useEffect(() => {
    function online() {
      document.title = "cloudinary uploads";
    }

    function offline() {
      document.title = "sem internet";
      toast.warning("sem internet concte-se a red", {
        position: "top-center",
      });
    }

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    if (navigator.onLine) {
      online();
    } else {
      offline();
    }

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  const { funcao } = useContext(FuncaoContext);
  const [arquivos, setArquivos] = useState([]);
  const inputArquivo = useRef();

  async function FazerUpload(e) {
    e.preventDefault();
    texto.current.style.display = "none";
    load.current.style.display = "block";
    try {
      const formData = new FormData();
      formData.append("titulo", titulo.current.value);
      for (const arquivo of arquivos) {
        formData.append("arquivos", arquivo);
      }
      const response = await api.post(
        `${import.meta.env.VITE_Back}/fazer/uploads`,
        formData,
      );
      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      texto.current.style.display = "block";
      load.current.style.display = "none";
      titulo.current.value = "";
      setArquivos([]);
      inputArquivo.current.value = "";
      seleci.current.innerHTML = `
  <i class="bi bi-file-earmark-plus-fill"></i>
  selecione os arquivos
`;
      await funcao?.();
    } catch (erro) {
      texto.current.style.display = "block";
      load.current.style.display = "none";
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  return (
    <div className="App">
      <Header />
      <div className="conteiner">
        <h1>
          Faça uploads de vários arquivos para o{" "}
          <span>
            cloudinary
            <sup>
              <i class="bi bi-cloud-arrow-up-fill"></i>
            </sup>
          </span>
        </h1>

        <form onSubmit={FazerUpload}>
          <input
            type="text"
            ref={titulo}
            placeholder="digite o titulo da coleção"
          />
          <div>
            <label htmlFor="foto">
              <p ref={seleci}>
                <i class="bi bi-file-earmark-plus-fill"></i> selecione os
                arquivos
              </p>
              <input
                ref={inputArquivo}
                type="file"
                id="foto"
                multiple
                onChange={(e) => {
                  const novos = [...e.target.files];

                  setArquivos((antigos) => {
                    const lista = [...antigos, ...novos];

                    seleci.current.innerHTML = `
      <i class="bi bi-check-all"></i>
      arquivos selecionados ${lista.length}
    `;

                    return lista;
                  });
                }}
              />
            </label>
            <button>
              <p ref={texto}>
                <i class="bi bi-cloud-arrow-up-fill"></i> fazer upload
              </p>
              <h2 className="load" ref={load}>
                <i class="bi bi-arrow-repeat"></i>
              </h2>
            </button>
          </div>
        </form>
      </div>
      <Posts />
    </div>
  );
}

export default App;

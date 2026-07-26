import "../styles/posts.css";
import api from "../services/api.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { FuncaoContext } from "../Funcao.jsx";
function Posts() {
  const [arquivos, setArquivos] = useState([]);
  async function PegarUploads() {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_Back}/pegar/uploads`,
      );
      setArquivos(response.data.uploads);
      toast.success(response.data.mensagem, {
        position: "top-center",
      });
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  const { setFuncao } = useContext(FuncaoContext);

  useEffect(() => {
    PegarUploads();
    setFuncao(() => PegarUploads);
  }, []);
  return (
    <section>
      <h1 className="to">
        todos os{" "}
        <span>
          <i class="bi bi-cloud-arrow-up-fill"></i> uploads
        </span>
      </h1>
      <ul id="listat">
        {arquivos && arquivos.length > 0 ? (
          arquivos
            .slice()
            .reverse()
            .map((arquivo) => (
              <li className="item" key={arquivo._id}>
                <ul>
                  {arquivo.arquivos
                    .slice()
                    .reverse()
                    .map((arq) => (
                      <li key={arq._id}>
                        {arq.tipo === "image" ? (
                          <img src={arq.url} alt={arquivo.titulo} />
                        ) : (
                          <video src={arq.url} controls></video>
                        )}
                      </li>
                    ))}
                </ul>
                <h1>{arquivo.titulo}</h1>
              </li>
            ))
        ) : (
          <div class="sem-uploads">
  <i class="bi bi-cloud-slash"></i>
  <h3>Ainda sem uploads</h3>
  <p>Carrega imagens ou vídeos para começar.</p>
</div>
        )}
      </ul>
    </section>
  );
}
export default Posts;

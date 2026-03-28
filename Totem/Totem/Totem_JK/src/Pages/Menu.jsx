import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import comboGorila from "../assets/Image/ComboGorila.png";
import comboJK from "../assets/Image/ComboJK.png";
import comboPadrao from "../assets/Image/Combo.png";
import comboMico from "../assets/Image/ComboMico.png";
import comboSagui from "../assets/Image/ComboSagui.png";
import combokids from "../assets/Image/ComboKids.png";

import burger1 from "../assets/Image/hamburguer1.png";
import burger2 from "../assets/Image/hamburguer2.png";
import burger3 from "../assets/Image/hamburguer3.png";
import burger4 from "../assets/Image/hamburguer4.png";
import burger5 from "../assets/Image/hamburguer5.png";
import burger6 from "../assets/Image/hamburguer6.png";

import refri from "../assets/Image/Refri1.png";
import refri2 from "../assets/Image/Refri2.png";
import refri3 from "../assets/Image/Refri3.png";
import refri4 from "../assets/Image/Refri4.png";
import refri5 from "../assets/Image/Refri5.png";

import batata from "../assets/Image/batata.png";
import batata2 from "../assets/Image/Batata2.png";
import batata3 from "../assets/Image/Batata3.png";
import batata4 from "../assets/Image/Batata4.png";

import sobremesa from "../assets/Image/sorvete.png";
import sobremesa2 from "../assets/Image/milk.png";
import sobremesa3 from "../assets/Image/brownie.png";
import sobremesa4 from "../assets/Image/torta.png";
import sobremesa5 from "../assets/Image/donuts.png";


const categorias = [
  "Combos Mata Fome",
  "Hambúrgueres",
  "Refrigerantes",
  "Batata",
  "Sobremesas",
];

const produtos = {
  "Combos Mata Fome": [
    { id: 1, nome: "Combo Gorila", preco: 59.9, imagem: comboGorila },
    { id: 2, nome: "Combo JK", preco: 34.9, imagem: comboJK },
    { id: 3, nome: "Combo orangotango", preco: 39.9, imagem: comboPadrao },
    { id: 4, nome: "Combo Mico", preco: 42.9, imagem: comboMico },
    { id: 5, nome: "Combo Sagui", preco: 39.9, imagem: comboSagui },
    { id: 6, nome: "Combo Kids", preco: 42.9, imagem: combokids },
  ],
  "Hambúrgueres": [
    { id: 7, nome: "JK Smash", preco: 22.9, imagem: burger1 },
    { id: 8, nome: "Sagui Burguer", preco: 24.9, imagem: burger2 },
    { id: 9, nome: "Gorila Burguer", preco: 21.9, imagem: burger3 },
    { id: 10, nome: "Mico Burguer", preco: 21.9, imagem: burger4 },
    { id: 11, nome: "orangotango Burguer", preco: 21.9, imagem: burger5 },
    { id: 12, nome: "Cheddar Burguer", preco: 21.9, imagem: burger6 },
  ],
  Refrigerantes: [
    { id: 13, nome: "Coca-Cola 500ml", preco: 7.9, imagem: refri },
    { id: 14, nome: "Guaraná 500ml", preco: 6.9, imagem: refri2 },
    { id: 15, nome: "Fanta Laranja", preco: 6.9, imagem: refri3 },
    { id: 16, nome: "Sprite", preco: 6.9, imagem: refri4 },
    { id: 17, nome: "Coca Zero", preco: 7.9, imagem: refri },
    { id: 18, nome: "Suco Del Valle Uva", preco: 8.9, imagem: refri5 },
  ],

  Batata: [
    { id: 19, nome: "Batata Pequena", preco: 8.9, imagem: batata },
    { id: 20, nome: "Batata Média", preco: 10.9, imagem: batata3 },
    { id: 21, nome: "Batata Grande", preco: 12.9, imagem: batata4 },
    { id: 22, nome: "Batata com Cheddar", preco: 14.9, imagem: batata2 },
  ],

  Sobremesas: [
    { id: 23, nome: "Sorvete", preco: 6.9, imagem: sobremesa },
    { id: 24, nome: "Milkshake", preco: 12.9, imagem: sobremesa2 },
    { id: 25, nome: "Brownie", preco: 9.9, imagem: sobremesa3 },
    { id: 26, nome: "Torta de Morango", preco: 10.9, imagem: sobremesa4 },
    { id: 27, nome: "Donuts de pistache", preco: 7.9, imagem: sobremesa5 },
  ],
};

export default function Menu() {
  const navigate = useNavigate();
  const [categoriaAtiva, setCategoriaAtiva] = useState("Combos Mata Fome");
  const [quantidades, setQuantidades] = useState({});
  const [animandoCarrinho, setAnimandoCarrinho] = useState(null);

  const itensCategoria = useMemo(() => {
    return produtos[categoriaAtiva] || [];
  }, [categoriaAtiva]);

  function aumentar(id) {
    setQuantidades((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    setAnimandoCarrinho(id);
    setTimeout(() => setAnimandoCarrinho(null), 500);
  }

  function diminuir(id) {
    setQuantidades((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  }

  const totalItens = Object.values(quantidades).reduce((acc, qnt) => acc + qnt, 0);
  function confirmarPedido() {
    const itensSelecionados = [];

    Object.entries(quantidades).forEach(([id, quantidade]) => {
      if (quantidade > 0) {
        for (const categoria in produtos) {
          const produto = produtos[categoria].find((item) => item.id === Number(id));
          if (produto) {
            itensSelecionados.push({
              ...produto,
              quantidade,
              categoria,
            });
            break;
          }
        }
      }
    });

    navigate("/carrinho", {
      state: { itens: itensSelecionados },
    });
  }
  return (
    <div className="menu-screen">
      <header className="menu-header">
        <h1>Menu</h1>

        <div className="cart-button">
          <ShoppingCart size={24} />
          {totalItens > 0 && <span className="cart-badge">{totalItens}</span>}
        </div>
      </header>

      <main className="menu-content">
        <aside className="menu-sidebar">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`category-btn ${categoriaAtiva === categoria ? "active" : ""}`}
              onClick={() => setCategoriaAtiva(categoria)}
            >
              {categoria}
            </button>
          ))}
        </aside>

        <section className="menu-products">
          <AnimatePresence mode="wait">
            <motion.div
              key={categoriaAtiva}
              className="products-grid"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              {itensCategoria.map((produto) => (
                <motion.div
                  key={produto.id}
                  className="product-card"
                  layout
                >
                  <div className="product-image-area">
                    <img src={produto.imagem} alt={produto.nome} className="product-image" />

                    <AnimatePresence>
                      {animandoCarrinho === produto.id && (
                        <motion.div
                          className="fly-dot"
                          initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                          animate={{ opacity: 1, scale: 1, x: 180, y: -180 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  <h3>{produto.nome}</h3>
                  <p className="price">R$ {produto.preco.toFixed(2).replace(".", ",")}</p>

                  <div className="quantity-controls">
                    <button onClick={() => diminuir(produto.id)}>-</button>
                    <span>{quantidades[produto.id] || 0}</span>
                    <button onClick={() => aumentar(produto.id)}>+</button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="confirm-area">
            <button className="confirm-button" onClick={confirmarPedido}>
              CONFIRMAR PEDIDO
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
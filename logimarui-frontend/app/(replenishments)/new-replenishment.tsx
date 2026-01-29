import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";

/**
 * =========================
 * MOCKS (depois vira API)
 * =========================
 */
type Produto = {
  codProduto: string;
  nomeProduto: string;
  unidades: Array<{ unidade: string; max: number }>;
};

type Nota = {
  numero: string; // "xxxxxx-005"
  produtos: Produto[];
};

type Cliente = {
  codCliente: string;
  nomeCliente: string;
  notas: Nota[];
};

type Mapa = {
  codMapa: string;
  mapaRota: string;
  clientes: Cliente[];
};

type MotoristaLogado = {
  codMotorista: string;
  nomeMotorista: string;
  codVeiculo: string;
  placa: string;
  mapas: Mapa[];
};

const MOCK_MOTORISTA: MotoristaLogado = {
  codMotorista: "123",
  nomeMotorista: "Motorista Teste",
  codVeiculo: "V12",
  placa: "ABC1D23",
  mapas: [
    {
      codMapa: "M001",
      mapaRota: "Rota 07",
      clientes: buildClientes("M001"),
    },
    {
      codMapa: "M002",
      mapaRota: "Rota 03",
      clientes: buildClientes("M002"),
    },
    {
      codMapa: "M003",
      mapaRota: "Rota 11",
      clientes: buildClientes("M003"),
    },
  ],
};

// gera clientes/notas/produtos (mock com volume, pra testar paginação)
function buildClientes(seed: string): Cliente[] {
  const clientes: Cliente[] = [];
  for (let i = 1; i <= 12; i++) {
    const codCliente = `${seed}-${String(1000 + i)}`;
    const nomeCliente = `Cliente ${i} (${seed})`;
    const notas = buildNotas(codCliente, i);
    clientes.push({ codCliente, nomeCliente, notas });
  }
  return clientes;
}

function buildNotas(codCliente: string, idx: number): Nota[] {
  // cliente tem de 1 a 3 notas "normalmente", mas vamos gerar mais pra testar paginação
  const total = idx % 3 === 0 ? 25 : idx % 2 === 0 ? 12 : 6; // só pra simular casos grandes
  const notas: Nota[] = [];
  for (let n = 1; n <= total; n++) {
    const numero = `${String(100000 + n)}-005`;
    notas.push({
      numero,
      produtos: buildProdutos(codCliente, numero),
    });
  }
  return notas;
}

function buildProdutos(codCliente: string, numeroNota: string): Produto[] {
  // simulando lista maior, mas controlada por modal + paginação
  const base: Produto[] = [
    {
      codProduto: "789123",
      nomeProduto: "Cerveja Pilsen 600ml",
      unidades: [
        { unidade: "UN", max: 10 },
        { unidade: "CX", max: 2 },
      ],
    },
    {
      codProduto: "789456",
      nomeProduto: "Brahma Lata 350ml",
      unidades: [{ unidade: "UN", max: 24 }],
    },
    {
      codProduto: "789777",
      nomeProduto: "Skol 600ml",
      unidades: [{ unidade: "UN", max: 6 }],
    },
    {
      codProduto: "789999",
      nomeProduto: "Refrigerante Cola 2L",
      unidades: [{ unidade: "CX", max: 1 }],
    },
  ];

  // “embaralha” um pouco só pra simular diferenças por nota
  const shift =
    (parseInt(numeroNota.slice(0, 2), 10) + codCliente.length) % base.length;
  return [...base.slice(shift), ...base.slice(0, shift)];
}

/**
 * =========================
 * UI - Select Modal
 * =========================
 */
type Option = { key: string; label: string };

function SelectField({
  label,
  value,
  placeholder,
  disabled,
  options,
  onSelect,
  pageSize = 10,
  allowDoubleTapSearch = true,
  rightAddon,
}: {
  label: string;
  value?: string;
  placeholder: string;
  disabled?: boolean;
  options: Option[];
  onSelect: (opt: Option) => void;
  pageSize?: number;
  allowDoubleTapSearch?: boolean;
  rightAddon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [searchMode, setSearchMode] = useState(false);
  const lastTapRef = useRef<number>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const paginated = useMemo(() => {
    return filtered.slice(0, page * pageSize);
  }, [filtered, page, pageSize]);

  function handleOpen() {
    if (disabled) return;

    // double tap = abre com search
    if (allowDoubleTapSearch) {
      const now = Date.now();
      if (now - lastTapRef.current < 280) {
        setSearchMode(true);
        setOpen(true);
        setPage(1);
        return;
      }
      lastTapRef.current = now;
    }

    setSearchMode(false);
    setOpen(true);
    setPage(1);
  }

  function handlePick(opt: Option) {
    onSelect(opt);
    setOpen(false);
    setQuery("");
    setPage(1);
    setSearchMode(false);
  }

  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>

      <Pressable
        onPress={handleOpen}
        style={[styles.selectBox, disabled && styles.selectBoxDisabled]}
      >
        <Text style={[styles.selectText, !value && styles.selectPlaceholder]}>
          {value || placeholder}
        </Text>

        <View style={styles.selectRight}>
          {rightAddon}
          <Text style={styles.chev}>▼</Text>
        </View>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>{label}</Text>

            {searchMode && (
              <TextInput
                value={query}
                onChangeText={(t) => {
                  setQuery(t);
                  setPage(1);
                }}
                placeholder="Digite para filtrar (apenas itens válidos)"
                placeholderTextColor="#777"
                style={styles.modalSearch}
                autoFocus
              />
            )}

            <FlatList
              data={paginated}
              keyExtractor={(item) => item.key}
              onEndReached={() => {
                if (paginated.length < filtered.length)
                  setPage((p) => p + 1);
              }}
              onEndReachedThreshold={0.6}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => handlePick(item)}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <Text style={styles.modalEmpty}>Nenhum item encontrado.</Text>
              }
              style={{ maxHeight: 360 }}
            />

            <View style={styles.modalFooter}>
              <Text style={styles.modalHint}>
                Toque para escolher • Toque duas vezes no campo para filtrar
              </Text>
              <TouchableOpacity
                onPress={() => setOpen(false)}
                style={styles.modalClose}
              >
                <Text style={styles.modalCloseText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

/**
 * =========================
 * Tela: Nova Reposição
 * =========================
 */
type Motivo = "FALTA" | "AVARIA" | "QUALIDADE";

type Linha = {
  id: string;
  nota: string;
  codProduto: string;
  nomeProduto: string;
  quantidade: number;
  unidade: string;
  motivo: Motivo;
  fotoCanhoto?: string; // depois vira URI real
  fotoAvaria?: string; // depois vira URI real
};

export default function NewReplenishmentScreen() {
  // “Sessão” do motorista (mock)
  const motorista = MOCK_MOTORISTA;

  // ✅ Modal de sucesso
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Seleções principais
  const [codMapa, setCodMapa] = useState(motorista.mapas[0]?.codMapa ?? "");
  const [codCliente, setCodCliente] = useState("");
  const [nota, setNota] = useState("");
  const [codProduto, setCodProduto] = useState("");
  const [unidade, setUnidade] = useState("");
  const [quantidade, setQuantidade] = useState<number | null>(null);
  const [motivo, setMotivo] = useState<Motivo | "">("");

  // Fotos (placeholders por enquanto)
  const [fotoCanhoto, setFotoCanhoto] = useState<string | undefined>(undefined);
  const [fotoAvaria, setFotoAvaria] = useState<string | undefined>(undefined);

  // Linhas
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const hasLinhas = linhas.length > 0;

  // Travar mapa/cliente quando já existe linha
  const lockMapaCliente = hasLinhas;

  // dados derivados
  const mapaAtual = useMemo(
    () => motorista.mapas.find((m) => m.codMapa === codMapa),
    [motorista.mapas, codMapa]
  );

  const clientesAtual = useMemo(() => mapaAtual?.clientes ?? [], [mapaAtual]);

  const clienteAtual = useMemo(
    () => clientesAtual.find((c) => c.codCliente === codCliente),
    [clientesAtual, codCliente]
  );

  const notasAtual = useMemo(() => clienteAtual?.notas ?? [], [clienteAtual]);

  const notaAtual = useMemo(
    () => notasAtual.find((n) => n.numero === nota),
    [notasAtual, nota]
  );

  const produtosAtual = useMemo(() => notaAtual?.produtos ?? [], [notaAtual]);

  const produtoAtual = useMemo(
    () => produtosAtual.find((p) => p.codProduto === codProduto),
    [produtosAtual, codProduto]
  );

  const unidadesDisponiveis = useMemo(
    () => produtoAtual?.unidades ?? [],
    [produtoAtual]
  );

  const maxQtdDaUnidade = useMemo(() => {
    const u = unidadesDisponiveis.find((x) => x.unidade === unidade);
    return u?.max ?? 0;
  }, [unidadesDisponiveis, unidade]);

  // ✅ Reset centralizado (evita esquecer campo)
  function resetForm() {
    setLinhas([]);
    setCodMapa(motorista.mapas[0]?.codMapa ?? "");
    setCodCliente("");
    setNota("");
    setCodProduto("");
    setUnidade("");
    setQuantidade(null);
    setMotivo("");
    setFotoCanhoto(undefined);
    setFotoAvaria(undefined);
  }

  // Reset encadeado (mapa -> cliente -> nota -> produto...)
  useEffect(() => {
    setCodCliente("");
    setNota("");
    setCodProduto("");
    setUnidade("");
    setQuantidade(null);
    setMotivo("");
    setFotoCanhoto(undefined);
    setFotoAvaria(undefined);
  }, [codMapa]);

  useEffect(() => {
    setNota("");
    setCodProduto("");
    setUnidade("");
    setQuantidade(null);
    setMotivo("");
    setFotoCanhoto(undefined);
    setFotoAvaria(undefined);
  }, [codCliente]);

  useEffect(() => {
    setCodProduto("");
    setUnidade("");
    setQuantidade(null);
    setMotivo("");
    setFotoCanhoto(undefined);
    setFotoAvaria(undefined);
  }, [nota]);

  useEffect(() => {
    setUnidade("");
    setQuantidade(null);
    setMotivo("");
    setFotoCanhoto(undefined);
    setFotoAvaria(undefined);
  }, [codProduto]);

  useEffect(() => {
    setQuantidade(null);
  }, [unidade]);

  function pickPhoto(kind: "canhoto" | "avaria") {
    // depois entra ImagePicker aqui.
    Alert.alert("Foto (mock)", `Selecionar foto de: ${kind}`);
    if (kind === "canhoto") setFotoCanhoto("mock://canhoto");
    if (kind === "avaria") setFotoAvaria("mock://avaria");
  }

  function validarLinha(): string | null {
    if (!codMapa) return "Selecione o mapa.";
    if (!codCliente) return "Selecione o cliente.";
    if (!nota) return "Selecione a nota.";
    if (!codProduto) return "Selecione o produto.";
    if (!unidade) return "Selecione a unidade.";
    if (!quantidade) return "Selecione a quantidade.";
    if (!motivo) return "Selecione o motivo.";

    if (maxQtdDaUnidade > 0 && quantidade > maxQtdDaUnidade) {
      return `Quantidade excede o máximo (${maxQtdDaUnidade} ${unidade}).`;
    }

    if (motivo === "FALTA") {
      if (!fotoCanhoto) return "Falta exige foto do canhoto.";
    }

    if (motivo === "AVARIA" || motivo === "QUALIDADE") {
      if (!fotoCanhoto) return "Avaria/Qualidade exige foto do canhoto.";
      if (!fotoAvaria) return "Avaria/Qualidade exige foto da avaria.";
    }

    return null;
  }

  function finalizarLinha() {
    const err = validarLinha();
    if (err) {
      Alert.alert("Validação", err);
      return;
    }

    const prod = produtoAtual!;
    const linha: Linha = {
      id: String(Date.now()),
      nota,
      codProduto: prod.codProduto,
      nomeProduto: prod.nomeProduto,
      quantidade: quantidade!,
      unidade,
      motivo: motivo as Motivo,
      fotoCanhoto,
      fotoAvaria,
    };

    setLinhas((prev) => [linha, ...prev]);

    // limpa campos de linha (mantém mapa/cliente travados)
    setNota("");
    setCodProduto("");
    setUnidade("");
    setQuantidade(null);
    setMotivo("");
    setFotoCanhoto(undefined);
    setFotoAvaria(undefined);
  }

  function editarLinha(l: Linha) {
    setLinhas((prev) => prev.filter((x) => x.id !== l.id));
    setNota(l.nota);
    setCodProduto(l.codProduto);
    setUnidade(l.unidade);
    setQuantidade(l.quantidade);
    setMotivo(l.motivo);
    setFotoCanhoto(l.fotoCanhoto);
    setFotoAvaria(l.fotoAvaria);
  }

  function cancelarReposicao() {
    Alert.alert("Cancelar reposição", "Deseja cancelar o processo?", [
      { text: "Não" },
      {
        text: "Sim, cancelar",
        style: "destructive",
        onPress: () => {
          resetForm();
        },
      },
    ]);
  }

  // ✅ AQUI está o que você queria
  function finalizarReposicao() {
    if (!hasLinhas) return;

    // futuro: POST /replenishment
    // agora: reseta e mostra popup próprio
    resetForm();
    setShowSuccessModal(true);
  }

  const mapaOptions: Option[] = motorista.mapas.map((m) => ({
    key: m.codMapa,
    label: `${m.codMapa} • ${m.mapaRota}`,
  }));

  const clienteOptions: Option[] = clientesAtual.map((c) => ({
    key: c.codCliente,
    label: `${c.codCliente} - ${c.nomeCliente}`,
  }));

  const notaOptions: Option[] = notasAtual.map((n) => ({
    key: n.numero,
    label: n.numero,
  }));

  const produtoOptions: Option[] = produtosAtual.map((p) => ({
    key: p.codProduto,
    label: `${p.codProduto} - ${p.nomeProduto}`,
  }));

  const unidadeOptions: Option[] = unidadesDisponiveis.map((u) => ({
    key: u.unidade,
    label: `${u.unidade} (máx ${u.max})`,
  }));

  const quantidadeOptions: Option[] = useMemo(() => {
    if (!unidade || !maxQtdDaUnidade) return [];
    const arr: Option[] = [];
    for (let i = 1; i <= maxQtdDaUnidade; i++) {
      arr.push({ key: String(i), label: String(i) });
    }
    return arr;
  }, [unidade, maxQtdDaUnidade]);

  const motivoOptions: Option[] = [
    { key: "FALTA", label: "FALTA" },
    { key: "AVARIA", label: "AVARIA" },
    { key: "QUALIDADE", label: "QUALIDADE" },
  ];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Voltar</Text>
        </Pressable>

        <Text style={styles.headerTitle}>NOVA REPOSIÇÃO</Text>
        <View style={{ width: 70 }} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Motorista (fixo) */}
        <SelectField
          label="CÓDIGO MOTORISTA"
          value={`${motorista.codMotorista} - ${motorista.nomeMotorista}`}
          placeholder="—"
          disabled
          options={[]}
          onSelect={() => {}}
          allowDoubleTapSearch={false}
        />

        {/* Mapa */}
        <SelectField
          label="CÓDIGO MAPA"
          value={mapaOptions.find((o) => o.key === codMapa)?.label}
          placeholder="SELECIONE O MAPA"
          disabled={lockMapaCliente}
          options={mapaOptions}
          onSelect={(opt) => setCodMapa(opt.key)}
          pageSize={10}
          rightAddon={lockMapaCliente ? <Text style={styles.lock}>🔒</Text> : null}
        />

        {/* Cliente + histórico */}
        <View style={styles.rowBetween}>
          <View style={{ flex: 1 }}>
            <SelectField
              label="CÓDIGO CLIENTE"
              value={clienteOptions.find((o) => o.key === codCliente)?.label}
              placeholder="SELECIONE O CLIENTE"
              disabled={lockMapaCliente || !codMapa}
              options={clienteOptions}
              onSelect={(opt) => setCodCliente(opt.key)}
              pageSize={10}
              rightAddon={lockMapaCliente ? <Text style={styles.lock}>🔒</Text> : null}
            />
          </View>

          <Pressable
            style={[styles.bookBtn, !codCliente && styles.bookBtnDisabled]}
            disabled={!codCliente}
            onPress={() =>
              router.push({
                pathname: "/client-history",
                params: { codCliente },
              })
            }
          >
            <Text style={styles.bookIcon}>📖</Text>
          </Pressable>
        </View>

        {/* Nota */}
        <SelectField
          label="NOTA"
          value={nota || ""}
          placeholder="SELECIONE A NOTA"
          disabled={!codCliente}
          options={notaOptions}
          onSelect={(opt) => setNota(opt.key)}
          pageSize={10}
        />

        {/* Produto */}
        <SelectField
          label="PRODUTO"
          value={produtoOptions.find((o) => o.key === codProduto)?.label || ""}
          placeholder="SELECIONE O PRODUTO"
          disabled={!nota}
          options={produtoOptions}
          onSelect={(opt) => setCodProduto(opt.key)}
          pageSize={10}
        />

        {/* Unidade */}
        <SelectField
          label="UNIDADE"
          value={unidade ? unidade : ""}
          placeholder="SELECIONE A UNIDADE"
          disabled={!codProduto}
          options={unidadeOptions}
          onSelect={(opt) => setUnidade(opt.key)}
          pageSize={10}
        />

        {/* Quantidade */}
        <SelectField
          label="QUANTIDADE"
          value={quantidade ? String(quantidade) : ""}
          placeholder="SELECIONE A QUANTIDADE"
          disabled={!unidade}
          options={quantidadeOptions}
          onSelect={(opt) => setQuantidade(parseInt(opt.key, 10))}
          pageSize={10}
        />

        {/* Motivo */}
        <SelectField
          label="MOTIVO"
          value={motivo || ""}
          placeholder="SELECIONE O MOTIVO"
          disabled={!quantidade}
          options={motivoOptions}
          onSelect={(opt) => setMotivo(opt.key as Motivo)}
          pageSize={10}
        />

        {/* Fotos condicionais */}
        {(motivo === "FALTA" || motivo === "AVARIA" || motivo === "QUALIDADE") && (
          <>
            <Text style={styles.sectionTitle}>FOTOS</Text>

            <Pressable style={styles.photoBox} onPress={() => pickPhoto("canhoto")}>
              <Text style={styles.photoLabel}>
                {fotoCanhoto ? "✅ Canhoto anexado" : "📷 Foto do canhoto"}
              </Text>
            </Pressable>

            {(motivo === "AVARIA" || motivo === "QUALIDADE") && (
              <Pressable style={styles.photoBox} onPress={() => pickPhoto("avaria")}>
                <Text style={styles.photoLabel}>
                  {fotoAvaria ? "✅ Avaria anexada" : "📷 Foto da avaria"}
                </Text>
              </Pressable>
            )}
          </>
        )}

        {/* Linhas */}
        <Text style={styles.linesTitle}>LINHAS REPOSIÇÃO</Text>

        {linhas.length === 0 ? (
          <Text style={styles.emptyLines}>Nenhuma linha adicionada ainda.</Text>
        ) : (
          linhas.map((l) => (
            <View key={l.id} style={styles.lineCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.lineTop}>Nota: {l.nota}</Text>
                <Text style={styles.lineMid}>
                  {l.codProduto} - {l.nomeProduto}
                </Text>
                <Text style={styles.lineMid}>
                  {l.quantidade} {l.unidade} • {l.motivo}
                </Text>
              </View>

              <Pressable style={styles.editBtn} onPress={() => editarLinha(l)}>
                <Text style={styles.editIcon}>✏️</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>

      {/* Action Footer */}
      <View style={styles.actionFooter}>
        {hasLinhas && (
          <TouchableOpacity style={styles.cancelBtn} onPress={cancelarReposicao}>
            <Text style={styles.cancelText}>CANCELAR</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.lineBtn} onPress={finalizarLinha}>
          <Text style={styles.lineBtnText}>FINALIZAR LINHA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.finishBtn, !hasLinhas && styles.finishBtnDisabled]}
          disabled={!hasLinhas}
          onPress={finalizarReposicao}
        >
          <Text
            style={[
              styles.finishBtnText,
              !hasLinhas && styles.finishBtnTextDisabled,
            ]}
          >
            FINALIZAR REPOSIÇÃO
          </Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Popup de sucesso */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successHeader}>
              <Text style={styles.successTitle}>Reposição lançada</Text>

              <Pressable onPress={() => setShowSuccessModal(false)}>
                <Text style={styles.successClose}>✕</Text>
              </Pressable>
            </View>

            <Text style={styles.successText}>
              A reposição foi registrada com sucesso.
            </Text>

            <TouchableOpacity style={styles.ticketBtn}>
              <Text style={styles.ticketBtnText}>MOSTRAR TICKET</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/**
 * =========================
 * Styles
 * =========================
 */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },

  header: {
    paddingTop: 54,
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2b2b2b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backBtn: {
    width: 70,
  },
  backText: {
    color: "#f4a100",
    fontSize: 14,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  fieldLabel: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 6,
    marginTop: 10,
  },

  selectBox: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectBoxDisabled: {
    opacity: 0.6,
  },

  selectText: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
    paddingRight: 8,
  },

  selectPlaceholder: {
    color: "#777",
  },

  selectRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  chev: {
    color: "#999",
    fontSize: 12,
  },

  lock: {
    color: "#999",
    fontSize: 12,
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },

  bookBtn: {
    width: 46,
    height: 46,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 26,
  },

  bookBtnDisabled: {
    opacity: 0.35,
  },

  bookIcon: {
    fontSize: 18,
  },

  sectionTitle: {
    color: "#f4a100",
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 8,
  },

  photoBox: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#262626",
  },

  photoLabel: {
    color: "#ccc",
  },

  linesTitle: {
    marginTop: 18,
    marginBottom: 10,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  emptyLines: {
    color: "#777",
    marginBottom: 10,
  },

  lineCard: {
    backgroundColor: "#262626",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  lineTop: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },

  lineMid: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 2,
  },

  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },

  editIcon: {
    fontSize: 16,
  },

  actionFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#2b2b2b",
    backgroundColor: "#1c1c1c",
    flexDirection: "row",
    gap: 10,
  },

  cancelBtn: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f4a100",
    flex: 0.9,
  },
  cancelText: {
    color: "#f4a100",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },

  lineBtn: {
    backgroundColor: "#333",
    paddingVertical: 14,
    borderRadius: 6,
    flex: 1.2,
    borderWidth: 1,
    borderColor: "#444",
  },
  lineBtnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },

  finishBtn: {
    backgroundColor: "#f4a100",
    paddingVertical: 14,
    borderRadius: 6,
    flex: 1.35,
  },
  finishBtnDisabled: {
    backgroundColor: "#2f2f2f",
  },
  finishBtnText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  finishBtnTextDisabled: {
    color: "#777",
  },

  // Modal do Select
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    padding: 14,
  },
  modalTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSearch: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    padding: 12,
    color: "#fff",
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2b2b2b",
  },
  modalItemText: {
    color: "#ddd",
  },
  modalEmpty: {
    color: "#777",
    paddingVertical: 16,
    textAlign: "center",
  },
  modalFooter: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  modalHint: {
    color: "#777",
    fontSize: 11,
    flex: 1,
  },
  modalClose: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#444",
  },
  modalCloseText: {
    color: "#ccc",
    fontWeight: "bold",
  },

  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successCard: {
    width: "100%",
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    padding: 16,
  },
  successHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  successTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  successClose: {
    color: "#777",
    fontSize: 18,
  },
  successText: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 20,
  },
  ticketBtn: {
    backgroundColor: "#f4a100",
    paddingVertical: 14,
    borderRadius: 6,
  },
  ticketBtnText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});

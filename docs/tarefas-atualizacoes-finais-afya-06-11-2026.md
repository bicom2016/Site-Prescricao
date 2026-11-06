# Tarefas das alterações finais do site Prescrição Afya

Lista para o agente responsável pelos ajustes solicitados no PDF **Atualizações finais - Site Prescrição Afya**, acompanhada dos textos propostos e dos pontos do projeto onde atuar. As referências de página correspondem às quatro páginas do PDF, incluindo suas capturas longas e os post-its.

**Arquivo-fonte local:** `C:/Users/Pedro/Downloads/Atualizações finais - Site Prescrição Afya.pdf`.

**Regra de execução:** inclusões e substituições de imagens estão **bloqueadas até o recebimento dos arquivos do time de Prescrição, que estão sendo reunidos pelo Lucão**. Não gerar imagens alternativas, extrair as imagens pequenas do PDF para publicar ou antecipar essas substituições. As tarefas de imagens estão reunidas no fim da lista, inclusive a inclusão do logo solicitada em um post-it vermelho.

No PDF, post-its vermelhos indicam ajustes de layout ou correções; fundo rosa indica a redação proposta; post-its amarelos indicam substituições de imagens. O fundo rosa e os post-its são marcações de revisão, não elementos para reproduzir no site.

## Situação após a implementação

Em 06/11/2026, foram concluídas **20 tarefas**. A interface do **G3** está implementada nas 20 páginas, com validação de e-mail e espaçamento padronizado, mas a captação real continua aguardando o endpoint ou a integração. **R3** permanece pendente de conciliação dos textos. As tarefas de imagens **I1 a I7** continuam aguardando os arquivos, inclusive notebook e logo; nenhum arquivo ou endereço de imagem foi substituído.

**Validação:** 56 testes E2E aprovados no Chrome headless com Playwright, incluindo as 20 páginas em desktop de 1440 px e celular de 390 px. Foram exercitados navegação, submenus, retorno ao topo de Para quem, âncoras, teclado, questionário, abas de Recursos, busca e sugestões de Dúvidas, filtros do Blog e validação do formulário. Não foram detectados erros de JavaScript, console ou carregamento de arquivos locais.

A conferência visual utilizou capturas antes e depois e 28 capturas finais de componentes em desktop e celular. Após uniformizar os três aparelhos da Home, as verificações adicionais de menu, cabeçalho, largura da página e enquadramento dos aparelhos passaram em **320, 390, 768, 1024, 1101, 1280 e 1440 px**. Uma primeira asserção do teste adicional foi corrigida para aguardar a animação de abertura do menu. As evidências e os scripts temporários estão em `C:/tmp/prescricao-qa/`, fora do repositório.

Os testes rodaram em `http://127.0.0.1:8765`. Não incluíram envio real de leads, fluxos internos dos produtos Whitebook/iClinic ou outros motores de navegador. A entrada na página externa dos novos CTAs foi conferida pelo endereço dos links, sem executar conversões nessas páginas.

## Navegação e componentes de todas as páginas

- [x] **G1 — Transformar Recursos e RDC em itens diretos do menu.** Referência: página 2, duas notas no topo. Desagrupar o menu atual de Recursos e disponibilizar os links para `/recursos/` e `/recursos/receita-controlada-digital/` diretamente na navegação principal. Remover a entrada redundante “Como funciona” desse menu. As duas notas se complementam: o resultado é ter Recursos e RDC como itens independentes. Aplicar nos cabeçalhos de todas as páginas e conferir a navegação móvel. A nota não solicita excluir a seção “Como funciona” da Home nem apagar seu conteúdo.

- [x] **G2 — Fazer o texto Para quem abrir o topo da página.** Referência: página 3, nota no topo. Clicar em “Para quem” deve levar a `/para-quem/`, no início da página, inclusive quando o usuário já estiver em uma seção dessa página. Manter os destinos dos subitens: Médicos, Clínicas e consultórios, Pacientes e Farmácias. Orientação de implementação: separar o link do texto do controle que abre o submenu, para permitir os dois comportamentos em desktop, teclado e celular.

- [ ] **G3 — Exibir o Lead Collector no final de todas as páginas.** Referência: página 1, imediatamente antes do rodapé. Reutilizar o bloco “Mantenha-se atualizado”, com a descrição “Receba as novidades da prescrição e da regulamentação em primeira mão.”, campo “Seu e-mail”, botão “Quero receber” e aviso de privacidade/cancelamento. Torná-lo parte recorrente da região do rodapé, incluindo Home, Recursos, Para quem e Dúvidas, além das páginas que já o possuem. **Interpretação para execução:** “fixo no rodapé” significa presença permanente no final de cada página, conforme a posição desenhada no PDF; não há indicação visual de barra sobreposta à tela durante a rolagem.

  **Dependência técnica identificada no projeto:** os formulários existentes usam `data-endpoint=""`, e `script.js` informa que o envio ainda não está ativo. A inclusão visual pode ser feita; para concluir a captação real será necessário identificar/receber o endpoint ou a integração do Lead Collector. Não considerar o formulário operacional só porque está visível.

- [x] **G4 — Corrigir o espaçamento do Lead Collector em relação ao bloco anterior e ao rodapé.** Referências: página 2, final da RDC; página 4, recorte do Blog. O coletor aparece encostado na transição de fundo. Dar respiro acima e abaixo e padronizar sua inserção entre as páginas. Conferir a regra `.lead { padding-top: 0; }` em `styles.css`, pois é um ponto provável de intervenção. O PDF não determina uma medida em pixels; validar visualmente em desktop e celular.

## Home

Arquivo principal: `index.html`. Referência: página 1 do PDF.

- [x] **H1 — Remover as etiquetas sobre as duas fotos da seção de benefícios.** Na seção “Menos etapas para você. Mais segurança para o paciente.”, retirar “Receita enviada pelo WhatsApp” e “Sem interações detectadas”. No HTML atual, são os dois `figcaption.why-chip` dessa seção. Remover as etiquetas preservando as fotos existentes enquanto os novos arquivos não chegam. A nota aponta para as fotos, não para as mensagens das interfaces simuladas.

- [x] **H2 — Alterar o título do card do Whitebook.** Na seção “Onde você prescreve”, substituir “Quando preciso resolver rápido” por **“De qualquer lugar, sempre que precisar”**. Preservar a descrição e os benefícios do card, que não estão marcados para alteração nessa anotação.

- [x] **H3 — Complementar a descrição do primeiro passo.** Em “Da busca ao paciente em poucos cliques”, no item “Busque e monte”, usar: **“Encontre medicamentos, exames e vacinas e ajuste a posologia sugerida. Pelo computador ou celular.”** O complemento “Pelo computador ou celular.” aparece em negrito no PDF.

- [x] **H4 — Exibir as três simulações de celular inteiras.** Na mesma seção, corrigir as telas dos passos “Busque e monte”, “Assine” e “Envie” para que não fiquem cortadas na base. O post-it diz “Colocar simulação com telas inteiras, sem corte”. No projeto atual, essas simulações são construídas em HTML/CSS (`.step-screen` e `.wb-phone`), de modo que o ajuste de altura, enquadramento e moldura pode ser feito sem incluir ou substituir imagens. Verificar altura fixa, `overflow` e a moldura inferior em todos os três cards. Se a solução passar a depender de novos arquivos de imagem, essa parte deverá aguardar os arquivos.

As substituições da foto principal e do banner desta página estão nas tarefas de imagens I1 e I2.

## Página da RDC

Arquivo principal: `recursos/receita-controlada-digital/index.html`. Referência: coluna direita da página 2 do PDF.

- [x] **R1 — Adicionar dois CTAs após os seis passos.** Abaixo de “Da autorização à receita emitida, em 6 passos” e antes de “O que é com você e o que é com a Afya”, incluir os botões com os destinos escritos nos post-its:

  | Botão | Destino indicado no PDF |
  | --- | --- |
  | Saiba mais | https://lps.iclinic.com.br/notificacao-receita/ |
  | Baixar materiais | https://content.iclinic.com.br/prescricao-digital |

  “Baixar materiais” leva à landing page indicada, e não a um arquivo de download direto. Os botões desenhados no PDF indicam a inclusão e a posição; aplicar o padrão visual do site.

- [x] **R2 — Tornar a divisão de responsabilidades mais visual.** Reformular “O que é com você e o que é com a Afya” para reduzir a aparência de tabela. Preservar todas as responsabilidades e a distinção entre ações do médico e da Prescrição Afya. Cards ou blocos com ícones e pares de responsabilidades são opções de implementação; o PDF solicita o resultado visual, sem determinar o componente. **Não aplicar aqui a exclusão da coluna esquerda solicitada na página Para quem:** nesta seção a nota pede apenas uma apresentação mais visual.

- [ ] **R3 — Ajustar os textos dos dois cards de assinatura, com validação da redação sobre retenção.** Na seção “Qual assinatura vale para cada receita”, o PDF propõe os textos abaixo:

  | Card | Texto resultante da anotação |
  | --- | --- |
  | Padrão ICP-Brasil | Obrigatório para notificações de receita (azul, amarela e brancas), receitas de controle especial e de retenção. Na Afya: BirdID, VaultID, VIDaaS, A1 ou A3. |
  | Assinatura avançada | Aceita apenas para receitas de retenção, como antimicrobianos e análogos de GLP-1, que também podem ser assinadas com certificados ICP-Brasil. |

  **Ponto a resolver antes de publicar esta redação:** o primeiro card passa a dizer que ICP-Brasil é obrigatório também para retenção, enquanto o segundo aceita assinatura avançada para retenção. Registrar essa aparente contradição e validar a redação com o responsável pelo conteúdo, sem escolher silenciosamente uma das versões. “Brancas” foi transcrito como aparece na marcação. Esta tarefa registra o pedido do PDF, sem validar juridicamente a regra.

- [x] **R4 — Atualizar a data do fim da transição para 03/03/2027.** Na linha do tempo “Prazos e vigência”, substituir o marco final atual, `30/10/2026`, por **03/03/2027**, inclusive o atributo `datetime`, que deve ficar `2027-03-03`. Conferir a coerência com o trecho anterior “Começou a transição, de 30 dias.”, que permanece na captura, para não publicar uma duração incompatível com o novo prazo. A nova data é a solicitada no post-it; essa extração não é uma verificação independente da legislação.

O espaçamento do coletor desta página está consolidado em G4.

## Página Para quem

Arquivo principal: `para-quem/index.html`. Referência: página 3 do PDF.

- [x] **P1 — Reorganizar a hierarquia das quatro seções de público.** Aplicar aos blocos Médicos, Clínicas e consultórios, Pacientes e Farmácias a orientação do post-it laranja: ajustar layout/hierarquia considerando os novos textos e a remoção de uma coluna. Em cada bloco “O que muda…”, remover a coluna **De**, os textos antigos dessa coluna e os cabeçalhos **De/Para**. Manter o título da seção e os quatro benefícios da antiga coluna direita, com as redações das tarefas P3, P6, P8 e P9. Apresentar esses benefícios como itens visuais com ícones, seguindo a referência de hierarquia do PDF. A referência é um exemplo de composição, não uma solicitação de inserir aquela captura como imagem. Preservar os demais cards de recursos e as âncoras `#medicos`, `#clinicas`, `#pacientes` e `#farmacias`.

- [x] **P2 — Remover as etiquetas sobre todas as fotos desta página.** A nota “Remover essa tag de todas as imagens dessa página” aponta para “Sem interações detectadas”. Aplicar também às etiquetas equivalentes das demais fotos: **“Receita com a cara da clínica”**, **“Recebimento digital”** e **“Receita conferida”**. São elementos sobrepostos às fotos (`figcaption.why-chip`); sua remoção pode ser feita agora, preservando os arquivos das fotos. Não confundir com os pequenos benefícios em formato de pílula ao lado dos textos de paciente e farmácia.

- [x] **P3 — Atualizar os quatro benefícios de Médicos.** Manter o título **“O que muda na sua rotina”** e usar os itens abaixo na apresentação definida em P1:

  1. Modelos e renovação em 1 clique, sem retrabalho.
  2. Alertas automáticos de interação, sem precisar memorizar.
  3. Numeração do SNCR aplicada automaticamente, sem preenchimento manual.
  4. Assinatura digital, sem necessidade de carimbo ou assinatura no papel.

- [x] **P4 — Ajustar os cards de recursos de Médicos marcados em rosa.** Atualizar os quatro pontos abaixo, mantendo os demais cards e textos dessa grade:

  | Local | Redação solicitada |
  | --- | --- |
  | Título do card Modelos | Modelos de Prescrição |
  | Descrição de Alertas de interação | Alertas em tempo real, durante a prescrição. |
  | Descrição de Controlados em dia | Receitas azuis, amarelas, de controle especial e retenção, com numeração do SNCR. |
  | Título do card de envio | Envio rápido |

- [x] **P5 — Corrigir o espaçamento do fundo do questionário de Médicos.** Ajustar o início da faixa de fundo e o respiro do bloco **“Qual caminho combina com a sua rotina?”**, logo após os cards de recursos. A seta do post-it aponta para a transição entre a área branca e a área com fundo claro; conferir o espaçamento superior do questionário e a transição para o público seguinte.

- [x] **P6 — Atualizar os quatro benefícios de Clínicas e consultórios.** Manter o título **“O que muda na operação da clínica”** e usar:

  1. O mesmo padrão de receita para toda a equipe.
  2. Receitas e histórico de prescrições organizados por paciente.
  3. Envio digital ao paciente. Menos retrabalho e chances de reimpressão na recepção.
  4. Agenda, prontuário e prescrição no mesmo sistema, sem perda de contexto.

- [x] **P7 — Corrigir o espaçamento da faixa do iClinic.** Na seção **“A prescrição é uma parte. A gestão da clínica é o todo.”**, corrigir o respiro superior e inferior, incluindo o afastamento em relação à grade anterior. A substituição do nome escrito por logo e a troca do wireframe são tarefas separadas e bloqueadas, I6 e I7; o ajuste de espaçamento pode avançar com os elementos atuais.

- [x] **P8 — Atualizar os quatro benefícios de Pacientes.** Manter o título **“O que muda para o paciente”** e usar:

  1. Receita salva no celular do paciente. Sem receita perdida ou molhada.
  2. Texto digitado e legível, sem surpresas na farmácia.
  3. Reenvio facilitado, sem precisar retornar ao consultório.
  4. Recebimento em Link ou PDF facilita o compartilhamento.

- [x] **P9 — Atualizar os quatro benefícios de Farmácias.** Manter o título **“O que muda para a farmácia”**. A redação anotada no PDF é:

  1. Assinatura digital, facilita a verificação da autenticidade da receita.
  2. Receita digitada e legível, elimina dúvidas no balcão.
  3. Prescrição de controlados emitidas conforme RDC 1000/25, com numeração conferida no SNCR.
  4. Emissão correta, de acordo com as regras para cada tipo de receituário.

  **Revisão de português:** o terceiro item contém a concordância “Prescrição… emitidas” na marcação original; os dois primeiros têm vírgula separando sujeito e verbo. Uma redação corrigida, preservando o sentido, seria “Prescrições de controlados emitidas conforme RDC 1000/25, com numeração conferida no SNCR.” e a retirada das duas vírgulas. Distinguir essa correção editorial da transcrição do pedido.

## Página Dúvidas

Arquivo principal: `duvidas/index.html`. Referência: página 4 do PDF.

- [x] **D1 — Remover o filtro por público e manter as sugestões.** Retirar o rótulo **“Mostrar perguntas para”** e os botões **Todos**, **Sou médico**, **Sou paciente** e **Tenho farmácia**. Manter o campo de busca, o grupo **Sugestões**, as categorias e as perguntas. Conferir a lógica em `script.js` para que a ausência dos botões não quebre a busca, as sugestões, os contadores ou a exibição das categorias. Não deixar um parâmetro de perfil ocultar perguntas sem que exista um filtro visível para desfazê-lo.

## Inclusões e trocas de imagens aguardando arquivos

**Não implementar nenhuma das tarefas I1 a I7 enquanto aguardamos as imagens.** Essa restrição também se aplica a arquivos de logo e às trocas indicadas por post-its de outras cores. As imagens pequenas já colocadas no PDF servem como referência, não como arquivos finais para publicação.

| Tarefa pendente | Referência | Substituição ou inclusão solicitada | Orientação para quando os arquivos chegarem |
| --- | --- | --- | --- |
| **I1 — Foto principal da Home** | Página 1, topo | Trocar a foto do hero. O time de Prescrição fornecerá a nova imagem. | Conferir enquadramento, contraste do texto e adaptação para celular com o arquivo aprovado. |
| **I2 — Banner da Home** | Página 1, depois dos três passos | Substituir a composição roxa “Uma nova forma de prescrever” pelo novo banner a ser fornecido. | Não recriar o banner nem presumir que a arte deva incluir os botões atuais; avaliar o material recebido e preservar os destinos necessários. |
| **I3 — Fotos da página Recursos** | Página 2, coluna esquerda | Trocar a foto horizontal do médico e as duas fotos dos cards Whitebook e iClinic em “Escolha pelo jeito que você atende”. A foto horizontal tem nota de fornecimento; os dois cards têm marcadores amarelos. | Tratar os três locais, mesmo quando o arquivo atual é reutilizado. Não estender a troca a outros locais sem indicação ou correspondência aprovada. |
| **I4 — Quatro fotos dos cards do topo de Para quem** | Página 3, abertura | Trocar as fotos de Médicos, Clínicas e consultórios, Pacientes e Farmácias. | Manter títulos, links e destinos das âncoras dos quatro cards. |
| **I5 — Quatro fotos das seções de Para quem** | Página 3, ao longo da página | Trocar as fotos de abertura dos quatro públicos, cada uma marcada com amarelo. | Considerar separadamente os quatro cards de I4 e estas quatro fotos maiores, mesmo que compartilhem arquivos atualmente. |
| **I6 — Imagem do notebook do iClinic** | Página 3, faixa do iClinic | Substituir o wireframe pela imagem de notebook mostrada como referência, **sem fundo**, que será enviada em alta pelo time de Prescrição. | Aguardar o arquivo final com transparência; não recortar a imagem da captura nem gerar uma aproximação. |
| **I7 — Logo Afya iClinic no lugar do nome escrito** | Página 3, mesma faixa | Substituir o rótulo escrito “AFYA ICLINIC” pelo logo Afya iClinic. Embora o post-it seja vermelho, esta tarefa inclui uma imagem. | Manter pendente por orientação do solicitante. O repositório já contém `assets/images/afya-iclinic-lockup.svg`, mas sua existência não libera antecipar a inclusão. |

## Orientações para a implementação e conferência

O projeto é composto por HTML estático, `styles.css` e `script.js`. Os cabeçalhos e rodapés estão repetidos nos arquivos HTML; as tarefas globais precisam alcançar as páginas internas, parceiros, especialidades e artigos do blog, além das páginas exibidas no PDF. Usar `rg` para localizar as cópias, evitando corrigir apenas a Home.

| Área | Pontos do projeto para localizar |
| --- | --- |
| Navegação | Cabeçalhos dos HTMLs; `[data-nav-group]` e `[data-nav-toggle]` em `script.js`; estilos de `.nav-dropdown` em `styles.css`. |
| Home | `index.html`: `#onde-prescrever`, `#como-funciona`, `.why-chip`, `.step-screen` e `.wb-phone`. |
| RDC | `recursos/receita-controlada-digital/index.html`: seis passos, tabela de responsabilidades, cards de assinatura, `#prazos` e formulário `.lead-box`. |
| Para quem | `para-quem/index.html`: quatro tabelas `.data-table.depara`, `.why-chip`, questionário e faixa do iClinic. |
| Dúvidas | `duvidas/index.html`: `[data-faq-perfil]`; lógica da busca e de sugestões em `script.js`. |
| Lead Collector | Blocos existentes em `recursos/receita-controlada-digital/index.html`, `blog/index.html` e artigos; `.lead`, `.lead-box`, `[data-form]` e `data-endpoint`. |

Conferir desktop e celular após os ajustes, com atenção aos menus, telas completas da Home, remoção das colunas em Para quem, funcionamento da busca em Dúvidas e espaçamento dos coletores. A reprodução dos textos regulatórios deve respeitar as pendências descritas em R3 e a coerência da linha do tempo em R4.

O PDF não define dimensões exatas para os espaçamentos, nem o componente que deve substituir a tabela de responsabilidades. Essas são decisões de implementação guiadas pelas referências visuais. Os textos acima preservam as solicitações, com pontuação de fim de frase uniformizada; a revisão editorial específica de Farmácias está explicitada em P9.

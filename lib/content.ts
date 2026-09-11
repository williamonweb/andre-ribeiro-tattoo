import { getSql } from "@/lib/db";

export const defaultHome = {
  eyebrow: "Realismo · Black & Grey",
  title: "Arte que fica.",
  accent: "Histórias na pele.",
  description: "Mais de 20 anos transformando ideias, memórias e fé em tatuagens únicas, criadas com técnica, cuidado e identidade.",
  strip: ["Retratos", "Animais", "Realismo religioso", "Projetos autorais"],
  exploreEyebrow: "Explore",
  exploreTitle: "Encontre o que você precisa.",
  exploreDescription: "O conteúdo está organizado em páginas para facilitar a navegação.",
  cards: [
    { title: "Especialidades e estilos", text: "Conheça as técnicas e veja exemplos de trabalhos." },
    { title: "Como funciona", text: "Da primeira conversa até o dia da sessão." },
    { title: "Cuidados", text: "Orientações importantes para a cicatrização." },
    { title: "Depoimentos", text: "Experiências de quem já tatuou com o André." },
    { title: "Perguntas frequentes", text: "Respostas antes de começar seu projeto." },
    { title: "Solicitar orçamento", text: "Conte sua ideia e receba o contato pelo WhatsApp." },
  ],
};

export const defaultAppearance = {
  logoInitials: "AR",
  logoImageUrl: "",
  brandSuffix: "Tattoo",
  goldColor: "#c8a45f",
  goldBrightColor: "#e1c27d",
  backgroundColor: "#080808",
  heroImageUrl: "",
  heroPosition: "center center",
  heroOverlay: "78",
  siteTitle: "André Ribeiro Tattoo | Realismo e Black & Grey",
  siteDescription: "Tatuagens autorais em realismo, Black & Grey e animais, em Cachoeirinha — RS.",
};

export const defaultSpecialties = {
  eyebrow: "Especialidades e estilos",
  title: "Cada ideia pede",
  accent: "um olhar único.",
  description: "Veja exemplos do que caracteriza cada estilo e entenda qual caminho combina melhor com o seu projeto.",
  items: [
    { title: "Realismo", text: "Retratos e composições com profundidade, textura e expressão.", example: "Retratos, rostos e composições detalhadas", position: "0% 100%", imageUrl: "" },
    { title: "Black & Grey", text: "Contrastes, sombras e detalhes construídos somente em preto e cinza.", example: "Sombras, contraste e acabamento em preto e cinza", position: "50% 100%", imageUrl: "" },
    { title: "Animais", text: "Homenagens cheias de identidade para eternizar companheiros especiais.", example: "Olhares, pelagem e características marcantes", position: "50% 100%", imageUrl: "" },
    { title: "Realismo religioso", text: "Símbolos de fé trabalhados com respeito, técnica e riqueza de detalhes.", example: "Imagens religiosas e símbolos de devoção", position: "100% 100%", imageUrl: "" },
  ],
};

export const defaultProcess = {
  eyebrow: "Como funciona o atendimento", title: "Da primeira conversa até a", accent: "tatuagem.",
  description: "Um processo claro, individual e pensado para transformar sua referência em um projeto com identidade.",
  items: [
    { title: "Conte sua ideia", text: "Envie referências, local do corpo, tamanho aproximado e o significado do projeto." },
    { title: "Conversa e criação", text: "André entende sua história, avalia as referências e orienta o melhor caminho." },
    { title: "Orçamento e agenda", text: "Com a proposta alinhada, você recebe a estimativa e combina a melhor data." },
    { title: "Dia da tatuagem", text: "A sessão acontece com atenção aos detalhes, segurança e orientações completas." },
  ],
};

export const defaultCare = {
  eyebrow: "Cuidados após a tatuagem", title: "A arte continua depois da", accent: "sessão.",
  description: "Os cuidados corretos ajudam a pele a cicatrizar bem e preservam os detalhes, as sombras e o contraste do trabalho.",
  note: "Estas são orientações gerais. Siga sempre as recomendações específicas dadas por André ao final da sessão. Procure atendimento de saúde se notar sinais importantes de reação ou infecção.",
  items: [
    { title: "Primeiras horas", text: "Mantenha a proteção pelo período orientado e evite tocar na região sem higienizar as mãos." },
    { title: "Higienização", text: "Lave delicadamente conforme a orientação recebida, sem esfregar e usando somente produtos indicados." },
    { title: "Cicatrização", text: "Não arranque casquinhas, não coce e deixe a pele seguir o processo natural de recuperação." },
    { title: "Sol e água", text: "Evite sol direto, piscina, praia e imersão enquanto a tatuagem estiver cicatrizando." },
    { title: "Produtos", text: "Não aplique receitas caseiras. Use apenas os produtos recomendados pelo profissional." },
    { title: "Acompanhamento", text: "Se tiver qualquer dúvida durante a cicatrização, envie uma foto e converse com o tatuador." },
  ],
};

export const defaultTestimonials = {
  eyebrow: "Depoimentos de clientes", title: "Confiança construída em cada", accent: "projeto.",
  description: "Histórias de quem confiou uma ideia ao André e levou uma obra única na pele.",
  items: [
    { quote: "Atendimento cuidadoso do começo ao fim. O resultado ficou ainda melhor do que eu imaginava.", name: "Cliente", style: "Realismo" },
    { quote: "Conseguiu transformar uma lembrança muito importante em uma arte cheia de detalhes.", name: "Cliente", style: "Homenagem" },
    { quote: "Explicou todo o processo, deixou tudo muito tranquilo e entregou um trabalho incrível.", name: "Cliente", style: "Black & Grey" },
  ],
};

export const defaultFaq = {
  eyebrow: "Perguntas frequentes", title: "Tudo o que você precisa", accent: "saber.",
  description: "Respostas rápidas para as principais dúvidas antes de começar uma tatuagem.",
  items: [
    { question: "Como recebo um orçamento?", answer: "Preencha o formulário com sua ideia, local do corpo e tamanho. O contato continua pelo WhatsApp para entender os detalhes e passar uma estimativa." },
    { question: "Posso levar uma referência?", answer: "Sim. As referências ajudam a comunicar a ideia, mas o projeto final é adaptado para ficar único e adequado ao seu corpo." },
    { question: "Vocês fazem cobertura?", answer: "Cada caso precisa ser avaliado individualmente. Envie uma foto clara da tatuagem atual e explique o resultado que deseja." },
    { question: "É necessário pagar sinal?", answer: "A confirmação da data e as condições do agendamento são explicadas diretamente durante o orçamento." },
    { question: "Como devo me preparar?", answer: "Durma bem, alimente-se antes do horário e evite álcool. Orientações específicas serão enviadas antes da sessão." },
    { question: "Posso levar acompanhante?", answer: "Converse antes com o tatuador, pois isso depende do espaço e da duração da sessão." },
  ],
};

export const defaultPortfolio = { eyebrow: "Trabalhos realizados", title: "Portfólio", description: "Realismo, Black & Grey, animais e projetos criados para contar histórias únicas." };
export const defaultQuote = { eyebrow: "Solicite seu orçamento", title: "Vamos dar forma à sua", accent: "ideia?", description: "Conte um pouco sobre o projeto. Quanto mais detalhes você enviar, melhor será a primeira avaliação.", responseTitle: "Como funciona a resposta?", responseText: "O pedido chega ao painel do André com os detalhes principais. Ele poderá chamar você diretamente pelo WhatsApp para continuar o atendimento." };

export async function getContent<T>(key: string, fallback: T): Promise<T> {
  try {
    const sql=await getSql(); const rows=await sql`SELECT content_json FROM site_content WHERE content_key=${key}`; const row=rows[0] as {content_json:string}|undefined;
    return row?.content_json ? { ...fallback, ...JSON.parse(row.content_json) } : fallback;
  } catch { return fallback; }
}

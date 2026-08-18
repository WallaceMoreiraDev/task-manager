# Detalhamento do projeto de gerenciamento de tarefas

## 📋 Visão Geral

Esse task manager é um projeto criado para aplicar meus conhecimentos prévios em React ao mesmo tempo em que aprendo novas coisas "Just-in-time" (apenas no tempo certo). É um sistema que possui login limitado ao front-end (sem JWT ou backend real criado do zero), página de criação de tarefas e página de visualização/edição de tarefas. 

## O que o projeto contém?

O projeto é composto por coisas que eu gostaria de aprender/praticar que são utilizadas no desenvolvimento real de sistemas. Não considero que aprendi tudo o que gostaria, pelo contrário: ainda tenho MUITO a aprender e principalmente praticar para que essas coisas venham ser automáticas com o tempo. Aqui está uma listagem das funcionalidade que desenvolvi:

### 1. Login sem backend real
Desenvolvi uma tela de login para que eu pudesse entender o processo de login na visão do FRONTEND (react), com isso aprendi/pratiquei coisas como:

- **Feedback e Navigate**: Pratiquei o uso de feedback e uso de `Navigate` após autenticação.
- **Verificações iniciais com zod e autenticação superficial**: Pratiquei o uso do schema do zod, e fiz uma autenticação superficial em React que me permitiu aprender mais sobre o processo de autenticação, a ordem de verificar se conta existe, verificar se as senhas batem em relação àquele email.
- **Simulação de token no localStorage**: Me permitiu praticar o parse do JSON e também a transformação de um objeto pra JSON, além de me fazer compreender como funciona (mais ou menos, já que o jeito correto é através de cookies) a questão do sistema "lembrar" do usuário e permitir acesso a rotas protegidas sem precisar de login repetidas vezes.

### 2. Criar conta
Essa página de criação de conta trouxeram os mesmos aprendizados e ajudaram da mesma forma que a página de Login colocada acima! Por esse motivo, não irei colocar aqui uma lista, já que são coisas mais básicas.

### 3. Criar Tarefa
A página de criação de tarefa me ajudou a colocar em prática muitas coisas de React também, como por exemplo as coisas que foram principais:

- **Schema com Zod**: Novamente nessa página pude colocar em prática meus aprendizados com zod e validação no `Hook`.
- **SPR (Single Principle Responsibility)**: Pude também praticar em que momento colocar a validação do zod (no `Hook`, logo no início), e em que momento tratar erros (no `Hook` também, seguindo o Exception Propagation).
- **Isolamento de dados (Multi-tenancy)**: Fiz com que no processo de criação de task, o `Hook` **pegasse através do `localStorage` o id do usuário que criou a task** e colocasse no objeto que seria enviado pela função `createTask` do service e armazenado pelo db.json.

### 4. Visualizar tarefas
**Nessa parte do sistema ficou maior parte da dificuldade**, por um desafio arquitetural diferente que tive de enfrentar e me fez repensar a forma de uso dos **Custom Hooks**. Gostaria de listar as sub-funcionalidades dentro do visualizar tarefas:

- **Excluir tarefa**
- **Alterar status**
- **Editar Tarefa (através de um modal de edição)**

A maior dificuldade foi na sub-funcionalidade **"Editar Tarefa"**, na qual precisava que o feedback visual ficasse na página de visualização de tarefas, e não no modal. Porém a ideia que vinha na cabeça até então era instanciar o novo estado `feedback` do **Custom Hook** no PRÓPRIO componente que o utilizaria (nesse caso: `EditTaskForm.jsx`). Mas com isso comecei a pensar nas consequências limitadas óbvias que eu sabia até então (e confesso que a princípio escrevendo aqui parece algo óbvio, mas te garanto que não foi naquele momento) "Se eu instancio esse estado de feedback aqui, então não vou ter como passar pro componente `Tarefas.jsx` para que ele exiba esse status, mas como eu faço então? Tem como alterar daqui do `EditTaskForm.jsx` o estado de lá do `Tarefas.jsx`? E outro ponto: preciso que valores de estado do formulário sejam instanciados só aqui nesse componente, e agora?", e com pesquisa e quebrando a cabeça consegui a resposta óbvia: o melhor a se fazer é passar um "fio" lá de cima até aqui embaixo, ou seja: pegar o estado **`setFeedback`** de lá de cima no componente `Tarefas.jsx`, passar por prop pro componente do `EditTaskForm.jsx`, e passar por parâmetro pra função `editTask` do Custom Hook `useTask.jsx`.

## ✨ Desafios Arquiteturais e Aprendizados

Durante o desenvolvimento deste sistema, priorizei a criação de uma base sólida e escalável, tomando decisões arquiteturais conscientes para contornar gargalos comuns no React:

### 1. Separação de Responsabilidades (SRP) na Camada de Serviços
Um dos maiores debates do projeto foi decidir entre o tratamento de erros (`try/catch`) na camada de `Service` ou a propagação de exceções (*Exception Propagation*) para a camada de `Hooks`.
- **A Decisão:** Optei por retirar as mensagens de erro hard-coded do Service e delegar a responsabilidade da mensagem visual para os **Custom Hooks**. 
- **O Resultado:** Isso impediu que o Service engessasse a aplicação, permitindo que a mesma chamada de API pudesse ter tratamentos diferentes dependendo de qual tela a invoca, respeitando o Princípio da Responsabilidade Única (SRP).

### 2. Gerenciamento de Instâncias e Lifting State Up
Houve um desafio crítico na Experiência do Usuário (UX) envolvendo a morte de instâncias do React durante a edição de tarefas via `<Modal />`.
- **O Problema:** Se o componente do Formulário (dentro do Modal) instanciar o `useTask` localmente, o feedback de sucesso é destruído assim que o modal se fecha, criando "universos paralelos" de estado.
- **A Solução:** Para garantir a persistência do componente de Feedback, apliquei o padrão de **Lifting State Up**. O hook `useTask` foi instanciado apenas uma vez no componente Pai (`Tarefas.jsx`), e a função de edição foi injetada no Modal via *Props*. Isso garantiu que a instância do Pai reagisse à submissão do Filho perfeitamente.

### 3. Autenticação Simulada (Stateless)
Para fins de portfólio e demonstração sem um backend real de JWT, implementei um fluxo de Autenticação simulado.
- Proteção de rotas através de um componente `<ProtectedRoute />` que intercepta usuários não autenticados.
- Gerenciamento de sessão persistente no `localStorage` atuando como um "Token Falso" (Substituindo o papel dos cookies HTTP-Only neste laboratório).
- Multi-tenancy que isola os dados de cada usuário, simulando como seria em uma aplicação séria (ao menos a parte do frontend com React). 

### 4. Componentização Limpa (Custom Hooks)
- A regra de negócio para extração de Hooks foi rigorosa: Qualquer tela que apresentasse repetição de lógica de estado (`useState`) ou funções específicas de domínio, teve sua complexidade abstraída para **Hooks Customizados**, deixando os componentes JSX responsáveis apenas pela renderização visual (View).
- O sistema de Feedbacks foi centralizado em um componente padrão `<Feedback />`, controlado por um estado global do hook (Evitando a complexidade desnecessária de filas/arrays de múltiplos alertas simultâneos. Em futuros projetos haverá uso de hot toast para feedbacks).
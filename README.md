## 📋 Visão Geral

Esse task manager é um projeto criado para aplicar meus conhecimentos prévios em React ao mesmo tempo em que aprendo novas coisas "Just-in-time" (apenas no tempo certo). É um sistema que possui login limitado ao front-end (sem JWT ou backend real criado do zero), página de criação de tarefas e página de visualização/edição de tarefas. 

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

### 4. Componentização Limpa (Custom Hooks)
- A regra de negócio para extração de Hooks foi rigorosa: Qualquer tela que apresentasse repetição de lógica de estado (`useState`) ou funções específicas de domínio, teve sua complexidade abstraída para **Hooks Customizados**, deixando os componentes JSX responsáveis apenas pela renderização visual (View).
- O sistema de Feedbacks foi centralizado em um componente padrão `<Feedback />`, controlado por um estado global do hook (Evitando a complexidade desnecessária de filas/arrays de múltiplos alertas simultâneos).
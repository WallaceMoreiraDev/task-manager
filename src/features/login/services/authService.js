
//Esse arquivo serve pra substituir o context que está fazendo tudo (sendo inteligente). A ideia é que o context seja burro apenas guardando informação

export async function getAccounts() {

    //Aqui deve pegar a função par retornar pro hook no formato que ele pede 
    // return {success: false | true, message: ''}

    try {
        const res = await fetch('http://localhost:3001/accounts');

        if (!res.ok) { throw new Error() };


        const accounts = await res.json();


        return { success: true, message: 'Contas pegas com sucesso!', accounts: accounts };
    } catch (error) {
        return { success: false, message: 'Sinto muito! Problemas com o servidor' };
    }



}

export async function createAccount(newAccount) {

    //Executa a ação de criar a conta e devolve uma resposta para o hook useLogin para lidar com feedback

    //? Contrato: {success: false | true, message: '', accounts: {}} 

    const accounts = await getAccounts();

    const alreadyExists = accounts.find((account) => account.email === newAccount.email);

    if (alreadyExists) {
        return { success: false, message: 'Já existe uma conta com esse e-mail! Tente outro' };
    }

    try {
        const res = await fetch('http://localhost:3001/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount),
        });

        const account = await res.json();

        return { success: true, message: 'Conta criada com sucesso!', account: account };
    } catch (error) {
        return { success: false, message: 'Servidor indisponível no momento!' };
    }

    //Atualizamos la no navegador! SALVO!



}

export async function login(data) {

    //Verificar se a conta existe
    const res = await getAccounts();

    if (!res.success) {
        return { success: false, message: res.message };
    }

    const accountExists = res.accounts.find(acc => acc.email === data.email);

    if (!accountExists) {
        return { success: false, message: 'Esta conta não existe! Tente criar uma nova conta!' };
    }

    if (accountExists.password !== data.password) {
        return { success: false, message: 'Senha incorreta! Tente outra senha' };
    }

    localStorage.setItem("@ProjetoTeste:currentUser", JSON.stringify(accountExists));

    return { success: true, message: "Login feito com sucesso!", account: accountExists };


}

export function getCurrentUser() {

    const currentUser = localStorage.getItem("@ProjetoTeste:currentUser") || null;

    return currentUser;

}



type LoginResponse = {
  token: string;
  motorista: {
    id: number;
    nome: string;
    matricula: string;
  };
};

export async function login(
  matricula: string,
  senha: string
): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (matricula === '123' && senha === '123') {
        resolve({
          token: 'fake-token-abc',
          motorista: {
            id: 1,
            nome: 'Motorista Teste',
            matricula: '123',
          },
        });
      } else {
        reject(new Error('Matrícula ou senha inválidas'));
      }
    }, 800);
  });
}
    
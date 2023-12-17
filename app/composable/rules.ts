export const required = (value: any) => {
  return value ? true : "O campo é obrigatório";
}

export const email = (value: string) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'O campo deve ser um email válido';
  }
  return true;
}

export const password = (value: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  /*if (!regex.test(value)) {
    return 'A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.';
  }*/
  
  return true;
}

export const passwordMatch = (value: string, otherPassword: string) => {
  if (value !== otherPassword) {
    return 'As senhas não coincidem';
  }

  return true;
}

export const number = (value: string) => {
  let input = value;
  const number = parseFloat(input);
  if (isNaN(number) && number.toString() !== input) {
    return 'O campo deve ser um número válido';
  }

  return true;
}
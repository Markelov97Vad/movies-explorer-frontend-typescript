export type validationConfigKeyProps = 'name' | 'email' | 'password'
export type validationConfigDataProps = {
  pattern: RegExp;
  validationError: string;
  emptyError: string;
}
export const validationConfig: Record<validationConfigKeyProps, validationConfigDataProps> = {
  'name': {
      pattern: /^([a-zA-Zа-яА-ЯёЁ-]{2,30})+[a-zA-Zа-яА-ЯёЁ -]*$/,
      validationError: 'Имя должно быть от 2 до 30 символов, может содержать пробел или дефис',
      emptyError: 'Заполните это поле.',
  },
  'email': {
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      validationError: 'Email введен некорректно',
      emptyError: 'Заполните это поле.',
  },
  'password': {
      pattern: /^(?=.*?[a-z])(?=.*?[0-9]).{2,}$/,
      validationError: 'Пароль должен содержать хотя бы одну цифру и минимум 2 символа',
      emptyError: 'Заполните это поле.',
  }
}

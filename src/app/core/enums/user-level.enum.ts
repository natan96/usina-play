export enum UserLevel {
  AZUL = 'azul',
  ROXO = 'roxo',
  VERMELHO = 'vermelho',
}

export const UserLevelLabel: { [key in UserLevel]: string } = {
  [UserLevel.AZUL]: 'Azul',
  [UserLevel.ROXO]: 'Roxo',
  [UserLevel.VERMELHO]: 'Vermelho',
};

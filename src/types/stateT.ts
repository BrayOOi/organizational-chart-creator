type stateT <T, U> = {
  state: T;
  payload: U;
  validation?: Partial<{ [key in keyof T]: string }>
};

export default stateT;

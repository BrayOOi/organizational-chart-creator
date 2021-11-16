type stateT <T> = {
  payload: T;
  validation?: Partial<{ [key in keyof T]: string }>
};

export default stateT;

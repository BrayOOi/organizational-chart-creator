type stateT <T> = {
  state?: any;
  payload: T;
  validation?: Partial<{ [key in keyof T]: string }>
};

export default stateT;

// localDispatch decorator
// takes an action creator and dispatches the generated action object
// the decorator needs to be passed in the localDispatch in the main component
function localDispatchDecorator<T>(localDispatch: (arg0: T) => void) {
  return function(targetFunction: (...args: any[]) => T) {
    return function(this: (...args: any[]) => T) {
      localDispatch(targetFunction.apply(this, Array.from(arguments)));
    }
  }
}

export default localDispatchDecorator;

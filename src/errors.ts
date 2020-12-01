// Error handling

// LogMagic Error type
export interface ErrorType {
  msg: string | any;
  context: any;
}

export class ErrorHandler {
  new(msg: string | any, context: any): Error {
    const err: ErrorType = {
      msg: msg,
      context: context,
    }
    return new Error(JSON.stringify(err));
  }
}

// map of error strings
// add new element in the map for new error string
//
// format:
// ['key', "value"]
export const errors = new Map([
  ['NoContainerFit', "unable to fullfil order: product does not fit any container"],
]);
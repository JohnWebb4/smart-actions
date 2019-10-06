// tslint:disable no-console
class Logger {
  public debug(...rest: any[]) {
    console.log("Debug", ...rest);
  }

  public error(...rest: any[]) {
    console.error("Error", ...rest);
  }
}

const logger = new Logger();

export { logger };

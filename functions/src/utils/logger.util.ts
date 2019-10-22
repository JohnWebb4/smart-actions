class Logger {
  debug(...rest: any[]) {
    console.log("Debug:", ...rest);
  }

  error(...rest: any[]) {
    console.log("Error:", ...rest);
  }

  info(...rest: any[]) {
    console.log("Info:", ...rest);
  }
}

const logger = new Logger();

export { logger };

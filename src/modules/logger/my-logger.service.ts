import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLogger extends ConsoleLogger {
  //   log(message: unknown, context?: unknown, ...rest: unknown[]): void {
  //     super.log.apply(this, message);
  //   }
  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    super.error.apply(this, message);
  }
}

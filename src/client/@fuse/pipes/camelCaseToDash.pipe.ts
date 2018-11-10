import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'camelCaseToDash' })
export class CamelCaseToDashPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param value input
   * @param args args, ignored here
   * @returns the camel case dashed string
   */
  transform(value: string, args: any[] = []): string {
    return value
      ? String(value).replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
      : '';
  }
}

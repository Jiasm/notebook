import { Router, Get, Query, Parse } from "../decorators"

@Router('')
export default class {
  @Get('/')
  index (@Parse('number') @Query('id') id: number) {
    return {
      code: 200,
      id,
      type: typeof id
    }
  }

  @Get('/about')
  about (@Parse('string') @Query('id') id: string) {
    return {
      code: 200,
      id,
      type: typeof id
    }
  }
}

import { Router, Post, Query, Parse, Body } from "../decorators"

@Router('/detail')
export default class {
  @Post('/')
  index (
    @Parse('number') @Query('id') id: number, 
    @Parse('number') @Body('age') age: number
  ) {
    return {
      code: 200,
      age: age + 1
    }
  }
}
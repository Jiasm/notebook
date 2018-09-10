import { Table, Column } from 'sequelize-typescript'
import Animal from './animal'

@Table({
  tableName: 'bird'
})
export default class Bird extends Animal {
  @Column
  wing: number

  @Column
  claw: number
}